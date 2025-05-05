export function noResultsFound(container) {    
    if (!container) return;

    let errorHtml = `
    <div id="error404Wrapper">
        <div class="header"><i class='bx bx-question-mark'></i></div>
        <div class="message">No results found.</div>
    </div>
    `
    container.innerHTML = errorHtml;
}