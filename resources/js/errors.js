export function noResultsFound(container, customMessage) {    
    if (!container) return;

    if (!customMessage) customMessage = 'No results found.';

    let errorHtml = `
    <div id="error404Wrapper">
        <div class="header"><i class='bx bx-question-mark'></i></div>
        <div class="message">${customMessage}</div>
    </div>
    `
    container.innerHTML = errorHtml;
}