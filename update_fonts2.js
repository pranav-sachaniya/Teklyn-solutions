const fs = require('fs');

let css = fs.readFileSync('css/styles.css', 'utf8');

// The user requested:
// 1. Header fonts should be 36px
// 2. Sub text font should be 24px
// 3. text font should be 18px in all sections

// First, convert all body/paragraph/card text to 18px
// We can find any `font-size: 13px`, `14px`, `15px`, `16px`, `17px`, `18px` 
// and change them to 18px. Except for tiny labels which might be 11px or 12px, let's just leave those or change them to 18px too if "in all sections" implies everything. I'll change 13-17px to 18px.
css = css.replace(/font-size:\s*(13|14|15|16|17)px;/g, 'font-size: 18px;');

// Now, handle the sub text fonts: 24px
// These are typically paragraphs directly inside header containers, or elements with "subtitle" in their class.
const subtextSelectors = [
    '.services-header p',
    '.projects-header p',
    '.mission-header p',
    '.blog-header p',
    '.industries-subtitle',
    '.cs-subtitle',
    '.process-subtitle'
];

for (const sel of subtextSelectors) {
    // Find the selector block
    const regex = new RegExp(`(${sel.replace(/\./g, '\\.')}\\s*\\{[^}]*?)font-size:\\s*[^;]+;`, 'g');
    if (css.match(regex)) {
        css = css.replace(regex, `$1font-size: 24px;`);
    } else {
        // If font-size isn't explicitly set in that block, add it
        const blockRegex = new RegExp(`(${sel.replace(/\./g, '\\.')}\\s*\\{[^}]*?)}`);
        css = css.replace(blockRegex, `$1  font-size: 24px;\n}`);
    }
}

// Change any remaining clamp() or explicit large font-sizes in headers to 36px
// But wait, the previous script changed all clamp(...) to 36px.
// Are there any other header fonts?
// h1, h2, h3 that have font-size > 24px.
css = css.replace(/font-size:\s*(28|32|40|44|45|48|52|56|64)px;/g, 'font-size: 36px;');

fs.writeFileSync('css/styles.css', css);
console.log("Updated styles.css text sizes");
