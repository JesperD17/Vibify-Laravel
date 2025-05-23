import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { createHtmlSections } from "./global";

var container = document.getElementById('pageLoadedItems');

document.addEventListener("DOMContentLoaded", function () {
    if (!container) return;
    functionObserver()
});

async function functionObserver() {
    loadingBeforeSubmit();
    
    let data = await fetchData();
    createHtmlSections(container, data)
    submittedFormLoading();
}

async function fetchData() {
    let response = await fetch(`http://localhost:3000/standard?type=explore`);
    let data = await response.json();
    return data;
}