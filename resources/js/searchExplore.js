import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { createHtmlSections, showApiErrorOnPage } from "./global";

var container = document.getElementById('pageLoadedItems');

document.addEventListener("DOMContentLoaded", function () {
    if (!container) return;
    functionObserver()
});

async function functionObserver() {
    loadingBeforeSubmit();

    try {
        let data = await fetchData();
        createHtmlSections(container, data);
        submittedFormLoading();
    } catch (error) {
        console.error(error);
        submittedFormLoading();
        showApiErrorOnPage(container);
    }
}

async function fetchData() {
    let response = await fetch(`http://localhost:3000/standard?type=explore`);
    let data = await response.json();
    return data;
}