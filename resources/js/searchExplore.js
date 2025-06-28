import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { createHtmlSections, showApiErrorOnPage } from "./global";
import { skeletonSongs } from "./skeletonItems";

var container = document.getElementById('pageLoadedItems');

document.addEventListener("DOMContentLoaded", function () {
    if (!container) return;
    functionObserver()
});

async function functionObserver() {
    loadingBeforeSubmit();
    skeletonSongs(container.querySelector('.albumList'), "Album", 24);
    skeletonSongs(container.querySelector('.customBtnsList'), "Button", 35);
    container.querySelectorAll('.songList').forEach(list => {
        skeletonSongs(list, "Song");
    })

    container.querySelectorAll('.mainTitle').forEach(title => {
        title.classList.add('skeletons');
        title.classList.add('fitContent');
        title.innerHTML = "these are skeleton titles.";
    })

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