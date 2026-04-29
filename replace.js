const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const oldFunc = `        function gtag_report_conversion(url) {
            var callback = function () {
                if (typeof (url) != 'undefined') {
                    window.location = url;
                }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-17780502582/Z5sSCOOlp-0bELbgs55C',
                'event_callback': callback
            });
            return false;
        }`;

const newFunc = `        function gtag_report_conversion(url) {
            var called = false;
            var isWaMe = url && url.indexOf('wa.me') !== -1;
            
            var callback = function () {
                if (!called) {
                    called = true;
                    if (typeof(url) !== 'undefined') {
                        if (isWaMe) {
                            window.open(url, '_blank');
                        } else {
                            window.location = url;
                        }
                    }
                }
            };
            
            setTimeout(callback, 300);

            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-17780502582/Z5sSCOOlp-0bELbgs55C',
                    'event_callback': callback
                });
            } else {
                callback();
            }
            return false;
        }`;

if (content.includes(oldFunc)) {
    content = content.replace(oldFunc, newFunc);
    console.log('Replaced function.');
} else {
    console.log('Function not found (maybe already replaced).');
}

let count = 0;
content = content.replace(/onclick="return gtag_report_conversion\('(.*?)'\);"/g, (match, p1) => {
    count++;
    return `onclick="if(typeof gtag_report_conversion === 'function'){ gtag_report_conversion('${p1}'); return false; }"`;
});
console.log(`Updated ${count} onclick attributes.`);

fs.writeFileSync('index.html', content);
