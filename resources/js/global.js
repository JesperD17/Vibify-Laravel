// let metaDataParam = await getAfterSubstring(url, '&sp=');
export async function getAfterSubstring(str, substring) {
    if (typeof str !== 'string' || typeof substring !== 'string') return '';
    const index = str.indexOf(substring);
  
    if (index === -1) return '';
    return str.slice(index + substring.length);
}


// waitUntilVisible(loadIcon, () => { console.log('User scrolled to #myDiv!'); });
export function waitUntilVisible(target, callback) {
    if (!target) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.disconnect();
            }
        });
    });
    observer.observe(target);
}