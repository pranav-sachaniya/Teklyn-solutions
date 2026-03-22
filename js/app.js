document.addEventListener('ComponentsLoaded', () => {

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== Mobile menu toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// ===== GSAP Smooth Animations =====
// ===== Scroll animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== Brands carousel pause on hover =====
const brandsTrack = document.getElementById('brandsTrack');
brandsTrack.addEventListener('mouseenter', () => {
    brandsTrack.style.animationPlayState = 'paused';
});
brandsTrack.addEventListener('mouseleave', () => {
    brandsTrack.style.animationPlayState = 'running';
});


// =============================================================================
// ===== CONSULTATION MODAL ====================================================
// =============================================================================

// ──── Configuration ────
// Replace these with your actual credentials after setting up EmailJS and Google Apps Script
const CONFIG = {
    emailjs: {
        publicKey:   'YOUR_EMAILJS_PUBLIC_KEY',    // Get from EmailJS → Account → API Keys
        serviceId:   'YOUR_EMAILJS_SERVICE_ID',    // Get from EmailJS → Email Services
        templateId:  'YOUR_EMAILJS_TEMPLATE_ID',   // Get from EmailJS → Email Templates
    },
    googleSheetsUrl: 'YOUR_GOOGLE_APPS_SCRIPT_URL', // Deploy your Apps Script and paste the URL
    countryApiUrl:   'https://ipapi.co/json/',
};

// ──── DOM References ────
const modal          = document.getElementById('consultModal');
const openBtn        = document.getElementById('openConsultModal');
const closeBtn       = document.getElementById('closeConsultModal');
const form           = document.getElementById('consultForm');
const submitBtn      = document.getElementById('submitConsult');
const submitText     = submitBtn.querySelector('.btn-submit-text');
const submitLoader   = submitBtn.querySelector('.btn-submit-loader');
const successPanel   = document.getElementById('consultSuccess');
const errorPanel     = document.getElementById('consultError');
const closeSuccessBtn= document.getElementById('closeSuccessModal');
const retryBtn       = document.getElementById('retryConsult');

const emailInput     = document.getElementById('consultEmail');
const descInput      = document.getElementById('consultDesc');
const emailError     = document.getElementById('emailError');
const servicesError  = document.getElementById('servicesError');
const descError      = document.getElementById('descError');
const checkboxGrid   = form.querySelector('.checkbox-grid');

// ──── Initialize EmailJS ────
(function initEmailJS() {
    if (typeof emailjs !== 'undefined' && CONFIG.emailjs.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
        emailjs.init(CONFIG.emailjs.publicKey);
    }
})();

// ──── Country Detection ────
let detectedCountry = 'Unknown';
(async function detectCountry() {
    try {
        const resp = await fetch(CONFIG.countryApiUrl);
        if (resp.ok) {
            const data = await resp.json();
            detectedCountry = data.country_name || 'Unknown';
        }
    } catch (_) { /* silently fallback to 'Unknown' */ }
})();


// ──── Modal Open / Close ────
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function resetModal() {
    form.reset();
    clearErrors();
    form.style.display = '';
    successPanel.style.display = 'none';
    errorPanel.style.display = 'none';
    submitBtn.disabled = false;
    submitText.style.display = '';
    submitLoader.style.display = 'none';
}

openBtn.addEventListener('click', () => {
    resetModal();
    openModal();
});

closeBtn.addEventListener('click', closeModal);
closeSuccessBtn.addEventListener('click', closeModal);

retryBtn.addEventListener('click', () => {
    errorPanel.style.display = 'none';
    form.style.display = '';
});

// Close on overlay click (not on the container)
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});


// ──── Validation Helpers ────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clearErrors() {
    emailError.textContent = '';
    servicesError.textContent = '';
    descError.textContent = '';
    emailInput.classList.remove('error');
    descInput.classList.remove('error');
    checkboxGrid.classList.remove('error');
}

function validate() {
    clearErrors();
    let valid = true;
    const email = emailInput.value.trim();
    const desc  = descInput.value.trim();
    const services = getSelectedServices();

    if (!email) {
        emailError.textContent = 'Email address is required.';
        emailInput.classList.add('error');
        valid = false;
    } else if (!EMAIL_REGEX.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('error');
        valid = false;
    }

    if (services.length === 0) {
        servicesError.textContent = 'Please select at least one service.';
        checkboxGrid.classList.add('error');
        valid = false;
    }

    if (!desc) {
        descError.textContent = 'Please describe your requirements.';
        descInput.classList.add('error');
        valid = false;
    }

    return valid;
}

function getSelectedServices() {
    return Array.from(form.querySelectorAll('input[name="services"]:checked'))
        .map(cb => cb.value);
}


// ──── Form Submission ────
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Disable button and show loader
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitLoader.style.display = '';

    const email    = emailInput.value.trim();
    const services = getSelectedServices();
    const desc     = descInput.value.trim();
    const timestamp = new Date().toISOString();

    const payload = {
        email,
        services: services.join(', '),
        description: desc,
        timestamp,
        country: detectedCountry,
    };

    try {
        // Run both submissions in parallel, but don't fail if one errors
        const results = await Promise.allSettled([
            sendEmail(payload),
            sendToGoogleSheets(payload),
        ]);

        // Check if at least one succeeded
        const anySuccess = results.some(r => r.status === 'fulfilled');

        if (anySuccess) {
            form.style.display = 'none';
            successPanel.style.display = '';
        } else {
            form.style.display = 'none';
            errorPanel.style.display = '';
        }
    } catch (_) {
        form.style.display = 'none';
        errorPanel.style.display = '';
    } finally {
        submitBtn.disabled = false;
        submitText.style.display = '';
        submitLoader.style.display = 'none';
    }
});


// ──── EmailJS Integration ────
async function sendEmail(payload) {
    if (typeof emailjs === 'undefined' || CONFIG.emailjs.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
        console.warn('[Teklyn] EmailJS not configured — skipping email send.');
        // Return resolved so submissions don't fail during development
        return Promise.resolve();
    }

    return emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, {
        from_email:  payload.email,
        services:    payload.services,
        description: payload.description,
        timestamp:   payload.timestamp,
        country:     payload.country,
    });
}


// ──── Google Sheets Integration (via Apps Script) ────
async function sendToGoogleSheets(payload) {
    if (CONFIG.googleSheetsUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        console.warn('[Teklyn] Google Sheets URL not configured — skipping sheet write.');
        return Promise.resolve();
    }

    const resp = await fetch(CONFIG.googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors', // Apps Script deployed as web app
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    return resp;
}

}); // End ComponentsLoaded event listener
