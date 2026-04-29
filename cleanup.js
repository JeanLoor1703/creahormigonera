const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove all onclick handlers from index.html (except the miVideoSmart overlay, but we target gtag)
html = html.replace(/\s*onclick="if\(typeof gtag_report_conversion === 'function'\)\{ gtag_report_conversion\('.*?'\); return false; \}"/g, '');
html = html.replace(/\s*onclick="return gtag_report_conversion\('.*?'\);"/g, '');

// Update rel='noopener' on H-180 to H-280 buttons
html = html.replace(/<a href="https:\/\/wa\.me.*?(H-180|H-210|H-240|H-280).*?"[\s\S]*?class="btn-glossy btn-red" target="_blank"(.*?)>/g, (m, p1, p2) => {
    if (!m.includes('rel=')) {
        return m.replace('target="_blank"', 'target="_blank" rel="noopener noreferrer"');
    }
    return m;
});

// Update social media links in footer to ensure they have minimum 44x44 area
// and don't overlap. Actually, we'll do CSS for that. Just need to make sure the HTML is clean.

fs.writeFileSync('index.html', html);
console.log('Cleaned up index.html');
