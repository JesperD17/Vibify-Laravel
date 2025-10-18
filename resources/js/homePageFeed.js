import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { createHtmlSections, showApiErrorOnPage } from "./global";
import { skeletonSongs } from "./skeletonItems";

var container = document.getElementById('homeFeed');

document.addEventListener("DOMContentLoaded", function () {
    if (!container) return;
    functionObserver()
});

async function functionObserver() {
    loadingBeforeSubmit();
    skeletonSongs(container.querySelector('.songList'), "Song");

    container.querySelectorAll('.albumList').forEach(list => {
        skeletonSongs(list, "Playlist", 10);
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
        console.error(error, 'aaaa');
        submittedFormLoading();
        showApiErrorOnPage(container);
    }
}

async function fetchData() {
    let response = await fetch(`http://localhost:3000/standard?type=home`);
    let data = await response.json();

    return data;
}