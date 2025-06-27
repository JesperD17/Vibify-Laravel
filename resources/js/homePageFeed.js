import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { createHtmlSections, showApiErrorOnPage } from "./global";

var container = document.getElementById('homeFeed');
var textRecent = document.getElementById('RecentPlaylists');

document.addEventListener("DOMContentLoaded", function () {
    if (!container) return;
    functionObserver()
});

async function functionObserver() {
    if (!textRecent) return;
    textRecent.style.display = "none"
    loadingBeforeSubmit();

    try {
        let data = await fetchData();
        textRecent.style.display = null;
        createHtmlSections(container, data);
        submittedFormLoading();
    } catch (error) {
        console.error(error);
        submittedFormLoading();
        showApiErrorOnPage(container);
        container.style.paddingBottom = 0;
    }
}

async function fetchData() {
    let response = await fetch(`http://localhost:3000/standard?type=home`);
    let data = await response.json();

    return data;
}