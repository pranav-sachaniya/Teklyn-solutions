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
    if (brandsTrack) {
        brandsTrack.addEventListener('mouseenter', () => {
            brandsTrack.style.animationPlayState = 'paused';
        });
        brandsTrack.addEventListener('mouseleave', () => {
            brandsTrack.style.animationPlayState = 'running';
        });
    }


    // =============================================================================
    // ===== CONSULTATION MODAL ====================================================
    // =============================================================================

    // ──── Configuration ────
    // Replace these with your actual credentials after setting up EmailJS and Google Apps Script
    const CONFIG = {
        emailjs: {
            publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',    // Get from EmailJS → Account → API Keys
            serviceId: 'YOUR_EMAILJS_SERVICE_ID',    // Get from EmailJS → Email Services
            templateId: 'YOUR_EMAILJS_TEMPLATE_ID',   // Get from EmailJS → Email Templates
        },
        googleSheetsUrl: 'YOUR_GOOGLE_APPS_SCRIPT_URL', // Deploy your Apps Script and paste the URL
        countryApiUrl: 'https://ipapi.co/json/',
    };

    // ──── DOM References ────
    const modal = document.getElementById('consultModal');
    const openBtn = document.getElementById('openConsultModal');
    const closeBtn = document.getElementById('closeConsultModal');
    const form = document.getElementById('consultForm');
    const submitBtn = document.getElementById('submitConsult');
    const submitText = submitBtn.querySelector('.btn-submit-text');
    const submitLoader = submitBtn.querySelector('.btn-submit-loader');
    const successPanel = document.getElementById('consultSuccess');
    const errorPanel = document.getElementById('consultError');
    const closeSuccessBtn = document.getElementById('closeSuccessModal');
    const retryBtn = document.getElementById('retryConsult');

    const emailInput = document.getElementById('consultEmail');
    const descInput = document.getElementById('consultDesc');
    const emailError = document.getElementById('emailError');
    const servicesError = document.getElementById('servicesError');
    const descError = document.getElementById('descError');
    const checkboxGrid = form.querySelector('.checkbox-grid');

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

    // Handle clicks on service cards to open modal and pre-select service
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            resetModal();
            const serviceName = card.getAttribute('data-service');
            
            // Uncheck all checkboxes first (resetModal handles form.reset() but just to be sure)
            const allCheckboxes = form.querySelectorAll('input[name="services"]');
            allCheckboxes.forEach(cb => cb.checked = false);

            if (serviceName) {
                // Find the checkbox with matching value
                const matchingCheckbox = form.querySelector(`input[name="services"][value="${serviceName}"]`);
                if (matchingCheckbox) {
                    matchingCheckbox.checked = true;
                }
            }
            
            openModal();
        });
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
        const desc = descInput.value.trim();
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

        const email = emailInput.value.trim();
        const services = getSelectedServices();
        const desc = descInput.value.trim();
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
            from_email: payload.email,
            services: payload.services,
            description: payload.description,
            timestamp: payload.timestamp,
            country: payload.country,
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

    // =============================================================================
    // ===== HERO ANIMATIONS & TRANSITIONS =========================================
    // =============================================================================

    // 1. Page Opening Transition
    const pageTransition = document.getElementById('page-transition');
    if (pageTransition) {
        setTimeout(() => {
            pageTransition.classList.add('loaded');
            setTimeout(() => pageTransition.remove(), 1200); // Cleanup DOM
        }, 100);
    }

    // 2. Typing Effect for Hero Heading
    async function typeHeroText() {
        const heading = document.getElementById('heroHeading');
        if (!heading) return;

        const fullText = [
            { text: "We Design, Build And ", isAccent: false },
            { text: "Scale", isAccent: true },
            { text: " Digital Tools", isAccent: false }
        ];

        let currentHTML = "";
        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        // Wait a bit before starting to type
        await delay(500);

        for (const segment of fullText) {
            if (segment.isAccent) {
                currentHTML += `<span class="accent-word">`;
            }
            for (let i = 0; i < segment.text.length; i++) {
                currentHTML += segment.text[i];
                heading.innerHTML = segment.isAccent ? currentHTML + `</span>` : currentHTML;
                await delay(Math.random() * 40 + 30); // 30-70ms delay
            }
            if (segment.isAccent) {
                currentHTML += `</span>`;
            }
        }

        heading.classList.add('done'); // hide blinking cursor

        // 3. Staggered Reveals
        setTimeout(() => {
            document.getElementById('heroSubtitle')?.classList.add('stagger-visible');
        }, 100);
        setTimeout(() => {
            document.getElementById('heroCta')?.classList.add('stagger-visible');
        }, 400);
        setTimeout(() => {
            document.getElementById('heroTechStack')?.classList.add('stagger-visible');
        }, 600);
    }
    typeHeroText();

    // 4. Interactive Canvas Background
    function initHeroCanvas() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width, height;
        let particles = [];
        let mouse = { x: -1000, y: -1000 };

        function resize() {
            width = canvas.width = window.innerWidth;
            const heroSection = document.querySelector('.hero');
            height = canvas.height = heroSection ? heroSection.offsetHeight : window.innerHeight;
            initParticles();
        }

        function initParticles() {
            particles = [];
            const spacing = 45; // density of the pattern
            for (let x = 0; x < width; x += spacing) {
                for (let y = 0; y < height; y += spacing) {
                    particles.push({
                        x: x + (Math.random() * 20 - 10),
                        y: y + (Math.random() * 20 - 10),
                        originX: x,
                        originY: y,
                        vx: 0,
                        vy: 0,
                        size: Math.random() * 1.5 + 1.0 // Slightly larger dots
                    });
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                // Mouse repulsion
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 250; // Increased radius of effect

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    p.vx -= (dx / dist) * force * 1.5; // Stronger push
                    p.vy -= (dy / dist) * force * 1.5;
                }

                // Spring back to origin (lower = smoother/looser return)
                p.vx += (p.originX - p.x) * 0.02;
                p.vy += (p.originY - p.y) * 0.02;

                // Friction (closer to 1 = more gliding)
                p.vx *= 0.92;
                p.vy *= 0.92;

                p.x += p.vx;
                p.y += p.vy;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Dynamic visibility: darker/more opaque when near the mouse
                if (dist < maxDist) {
                    const hoverIntensity = (maxDist - dist) / maxDist;
                    const alpha = 0.4 + (hoverIntensity * 0.5); // from 0.4 to 0.9
                    // Use a slightly darker gray when interacting
                    ctx.fillStyle = `rgba(140, 150, 165, ${alpha})`;
                } else {
                    // Default subtle faint gray
                    ctx.fillStyle = 'rgba(191, 194, 198, 0.6)';
                }

                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });

            heroSection.addEventListener('mouseleave', () => {
                mouse.x = -1000;
                mouse.y = -1000;
            });
        }

        resize();
        animate();
    }
    initHeroCanvas();

    // =============================================================================
    // ===== SERVICES HORIZONTAL SCROLL (GSAP) =====================================
    // =============================================================================
    function initServicesScroll() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn("[Teklyn] GSAP or ScrollTrigger not loaded.");
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const track = document.querySelector('.services-horizontal-track');
        const wrapper = document.querySelector('.services-pin-wrapper');
        
        if (!track || !wrapper) return;

        function getScrollAmount() {
            // The amount to move is the full width of the track minus the viewport width.
            // We add a little extra padding so the last card isn't flush with the right edge.
            const paddingRight = 40;
            let trackWidth = track.scrollWidth;
            return -(trackWidth - window.innerWidth + paddingRight);
        }

        let mm = gsap.matchMedia();
        
        // Desktop: Scroll-Jack (Horizontal scroll on vertical mouse wheel)
        mm.add("(min-width: 769px)", () => {
            const tween = gsap.to(track, {
                x: getScrollAmount,
                ease: "none"
            });

            ScrollTrigger.create({
                trigger: wrapper,
                start: "top top",
                // The scroll distance determines how long the pin lasts
                end: () => `+=${getScrollAmount() * -1}`,
                pin: true,
                animation: tween,
                scrub: 1, // Smooth scrubbing
                invalidateOnRefresh: true
            });
        });

        // Mobile: Native horizontal swipe (no ScrollTrigger pin)
        mm.add("(max-width: 768px)", () => {
            // GSAP cleans up the ScrollTrigger automatically.
            // We just ensure the wrapper allows native horizontal scroll.
            gsap.set(wrapper, { height: "auto" });
            gsap.set('.services-scroll-wrapper', { overflowX: "auto" });
        });
    }
    
    // Give DOM a small tick to render the included HTML before calculating widths
    setTimeout(initServicesScroll, 100);

    // =============================================================================
    // ===== PROJECTS GRID VIEW MORE ===============================================
    // =============================================================================
    const viewMoreProjectsBtn = document.getElementById('viewMoreProjectsBtn');
    if (viewMoreProjectsBtn) {
        viewMoreProjectsBtn.addEventListener('click', () => {
            const hiddenProjects = document.querySelectorAll('.project-card.hidden-project');
            hiddenProjects.forEach((card, index) => {
                // Remove the hidden class
                card.classList.remove('hidden-project');
                
                // Add fade-up and stagger so it animates in nicely
                card.classList.add('fade-up');
                if (index % 2 !== 0) {
                    card.classList.add('stagger-1');
                }
                
                // Force a reflow and add the visible class so it animates
                void card.offsetWidth;
                card.classList.add('visible');
            });

            // Hide the button container since all projects are now visible
            const actionContainer = viewMoreProjectsBtn.closest('.projects-action');
            if (actionContainer) {
                actionContainer.style.display = 'none';
            }
        });
    }

}); // End ComponentsLoaded event listener
