import { loadingBeforeSubmit, submittedFormLoading } from "./forms";

var songsMainContainer = document.getElementById('recentSearched');
var songList = songsMainContainer.querySelector('.songList');
var title = songsMainContainer.querySelector('.mainTitle');
var filtersContainer = document.getElementById('filters');

export async function searchSongs() {
    loadingBeforeSubmit();

    skeletonSongs();

    await fetchSearchResult();

    submittedFormLoading();
}

function getSearchParams() {
    var param = document.getElementById('searchBar').value;
    if (!param) return;
    return param;
}

async function fetchSearchResult() {
    var param = getSearchParams();
    setSearchTitle(param)


    var response = await fetch(`http://localhost:3000/search?q=${param}`);
    var data = await response.json();

    console.log('received', data);

    formJsonHtml(data.results);
    amountOfSearched(data);
    addFilterButtons(data);
}

function setSearchTitle(param) {
    if (!title) return;
    title.innerText = 'Searched for: ' + param;
}

function skeletonSongs() {
    var amountOfSkeletonSongs = 24;
    var skeletonSongs = "";
    for (let i = 0; i < amountOfSkeletonSongs; i++) {
        skeletonSongs += `
        <div class="song noClick">
            <div class="playSong">
                <i class='bx bx-play'></i>
                <img class="skeletons">
            </div>
            <div class="textWrapper">
                <div class="songTitle skeletons">random song title</div>
                <div class="songAuthor skeletons">random song author</div>
            </div>
        </div>
        `
    }

    if (!songList) return;
    songList.innerHTML = skeletonSongs;
}

async function formJsonHtml(results) {
    if (!results) return;

    console.log(results);

    const videos = results.filter(item => item.type === 'Video');

    var songs = "";
    for (let i = 0; i < videos.length; i++) {
        songs += `
        <div class="song">
            <div class="playSong">
                <i class='bx bx-play'></i>
                <img class="skeletons" src="${videos[i].thumbnails[0].url}">
                <div class="lengthSong">${videos[i].length_text.text}</div>
            </div>
            <div class="textWrapper">
                <div class="songTitle">${videos[i].title.text}</div>
                <div class="songAuthor">${videos[i].author.name}</div>
            </div>
        </div>
        `
    }
    if (!songList) return;
    songList.innerHTML = songs;
}

async function amountOfSearched(data) {
    var amountDivWrapper = document.querySelector('.searchHeader .searchAmount');
    var amountDiv = document.getElementById('amountFound');
    if (!amountDivWrapper || !amountDiv) return;

    var apiEstimated = data.estimated_results.toString();

    amountDivWrapper.style.display = "flex";
    amountDiv.innerText = apiEstimated;
}

// search filters
async function addFilterButtons(data) {
    if (!filtersContainer || filtersContainer.innerHTML !== '') return;

    var groups = data.header.search_filter_button.endpoint.open_popup.popup.groups;

    var filters = "";
    for (let i = 0; i < groups.length; i++) {
        filters += `
        <div class="filterWrapper">
            <div class="filterMainName">
                ${groups[i].title.text}
                <i class='bx bx-chevron-right'></i>
            </div>
            
            <div class="hiddenDropDown ${i + 1}">`
        for (let a = 0; a < groups[i].filters.length; a++) {
            filters +=
                `<button>${groups[i].filters[a].label.text}</button>`
        }
        filters +=
            `</div>
        </div>
        `
    }
    addSubmitButtonFilters(filters);
    showFilterItems();
}

function addSubmitButtonFilters(filters) {
    filters += `
    <div class="filterWrapper">
        <button>Submit Filters</button>
    </div>
    `

    filtersContainer.innerHTML = filters;
}

function showFilterItems() {
    var filterHeaders = document.querySelectorAll('#filters .filterMainName');
    if (!filterHeaders) return;

    outSieFilterClose(filterHeaders);

    filterHeaders.forEach(filterHeader => {
        filterHeader.addEventListener('click', function (e) {
            if (!e.currentTarget) return;

            closeFilterRules(filterHeaders, e.currentTarget)

            e.currentTarget.classList.toggle('open');
        })
    })
}

function outSieFilterClose(filters) {
    window.addEventListener('click', function (e) {
        filters.forEach(filter => {
            if (filter.contains(e.target)) return;
        })
        if (filtersContainer.contains(e.target)) return;

        closeAllFilters(filters);
    })
}

function closeFilterRules(filters, clickedFilter) {
    filters.forEach(filter => {
        if (filter.classList.contains('open') && clickedFilter !== filter) {
            filter.classList.remove('open');
        }
    })
}

function closeAllFilters(filters) {
    filters.forEach(filter => {
        if (filter.classList.contains('open')) {
            filter.classList.remove('open');
        }
    })
}