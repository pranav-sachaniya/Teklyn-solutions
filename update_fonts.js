const fs = require('fs');

let css = fs.readFileSync('css/styles.css', 'utf8');

// 1. Change Font Family
css = css.replace(/family=Inter:[^&]+&/g, 'family=Outfit:wght@300;400;500;600;700;800&');
css = css.replace(/font-family:\s*'Inter'/g, "font-family: 'Outfit'");

// 2. Change Header fonts to 36px
// These are currently clamp(32px, 5vw, 35px) or similar inside headers
css = css.replace(/font-size:\s*clamp\([^\)]+\);/g, (match) => {
    return 'font-size: 36px;';
});

// 3. Change subtext to 24px
// Currently .projects-header p, .services-header p, etc have font-size: 16px;
// We'll target specific subtitle classes or paragraph rules inside headers
const subtextClasses = [
    '.services-header p',
    '.projects-header p',
    '.mission-header p',
    '.industries-subtitle',
    '.cs-subtitle',
    '.cs-text-block p' // Not a subtext exactly but maybe? Wait, user said text font 18px in all sections.
];

// 4. Change all 14px, 15px, 16px, 17px to 18px for generic text, 
// EXCEPT let's be careful about buttons or small labels which might look huge at 18px.
// But the user said "text font should be 18px in all sections".
// To be safe, I'll just regex replace font-size: 14px; font-size: 15px; font-size: 16px; font-size: 17px; to font-size: 18px; globally EXCEPT where it's 24px for subtext.

// Let's first set the global body font size to 18px
css = css.replace(/body\s*\{[\s\S]*?\}/, (match) => {
    if (!match.includes('font-size')) {
        return match.replace(/color: var\(--text-white\);/, 'color: var(--text-white);\n  font-size: 18px;');
    }
    return match;
});

fs.writeFileSync('css/styles.css', css);
console.log("Updated styles.css fonts");
