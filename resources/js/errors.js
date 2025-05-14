export function noResultsFound(container, customMessage, customIcon) {    
    if (!container) return;

    if (!customMessage) customMessage = 'No results found.';
    if (!customIcon) customIcon = `<i class='bx bx-question-mark'></i>`;

    let errorHtml = `
    <div class="error404Wrapper">
        <div class="header">${customIcon}</div>
        <div class="message">${customMessage}</div>
    </div>
    `
    container.innerHTML = errorHtml;
}