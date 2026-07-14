const fs = require('fs');

let css = fs.readFileSync('css/styles.css', 'utf8');

const subtextSelectors = [
    '.services-header p',
    '.projects-header p',
    '.mission-header p',
    '.blog-header p',
    '.industries-subtitle',
    '.cs-subtitle',
    '.process-subtitle' // Might be deleted
];

for (const sel of subtextSelectors) {
    const regex = new RegExp(`(${sel.replace(/\./g, '\\.')}\\s*\\{[^}]*?)font-size:\\s*(16|18|24)px;`, 'g');
    if (css.match(regex)) {
        css = css.replace(regex, `$1font-size: 20px;`);
    } else {
        // If it doesn't match an exact size but the block exists, or if the block doesn't exist.
        // It's probably easier to just replace all 24px we know of.
    }
}

fs.writeFileSync('css/styles.css', css);
console.log("Updated styles.css subtext sizes");
