import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { skeletonSongs } from './skeletonItems';
import { noResultsFound } from "./errors";

var songsMainContainer = document.getElementById('recentSearched');
var songList = songsMainContainer.querySelector('.songList');
var title = songsMainContainer.querySelector('.mainTitle');
var filtersContainer = document.getElementById('filters');

export async function searchSongs() {
    await fetchSearchResult();
}

function getSearchParams() {
    let param = document.getElementById('searchBar').value;
    if (!param) return;
    return param;
}

function getAmountOfValues() {
    let select = document.getElementById('amountSongSelector');
    if (!select) return;

    let selected;

    select.addEventListener("change", (e) => {
        selected = Number(e.target.value);
        fetchSearchResult(selected)
    }, { once:true })
}

async function fetchSearchResult(selectedLength) {
    loadingBeforeSubmit();
    skeletonSongs(songList);

    let param = getSearchParams();
    setSearchTitle(param);

    if (!selectedLength) length = 20;
    
    let response = await fetch(`http://localhost:3000/search?search_query=${param}&searchLength=${selectedLength}`);
    let data = await response.json();

    submittedFormLoading();

    console.log('received', data);
    // const musicShelf = data.find(obj => obj.type === "MusicShelf");
    if (data.length < 2) {
        console.log('no songs found', data.length);
        noResultsFound(songList);
        amountOfSearched();
        return;
    }

    formJsonHtml(data, songList);
    amountOfSearched();
    addFilterButtons();

    getAmountOfValues();
}

function setSearchTitle(param) {
    if (!title) return;
    title.innerText = 'Searched for: ' + param;
}

async function formJsonHtml(musicShelf, list) {
    console.log(musicShelf);
    if (!musicShelf) return;

    console.log(musicShelf, 'aaaa');

    let songs = "";
    for (let i = 0; i < musicShelf.length; i++) {
        let thumbnail = musicShelf[i].thumbnail.contents[0]?.url;
        let duration = musicShelf[i].duration?.text;
        let title = musicShelf[i]?.title;
        let author = musicShelf[i].artists[0]?.name;

        if (!thumbnail || !duration || !title || !author) continue;

        songs += `
        <div class="song">
            <div class="playSong">
                <i class='bx bx-play'></i>
                <img class="skeletons" src="${thumbnail}">
                <div class="lengthSong">${duration}</div>
            </div>
            <div class="textWrapper">
                <div class="songTitle">${title}</div>
                <div class="songAuthor">${author}</div>
            </div>
        </div>
        `
    }
    if (!list) return;

    list.innerHTML = songs;
}

async function amountOfSearched() {
    let amountDivWrapper = document.querySelector('.searchHeader .searchAmount');
    let amountDiv = document.getElementById('amountFound');
    let songs = songList.querySelectorAll('.song');
    if (!amountDivWrapper || !amountDiv) return;

    let apiEstimated = songs.length;
    console.log(apiEstimated);
    
    amountDivWrapper.style.display = "flex";
    amountDiv.innerText = apiEstimated;
}

// search filters
function filtersData() {
    let obj = {
        "groups": [
            { 
                "title": { "text":"upload_date" }, 
                "filters": [
                    { "label":{ "text":'all' } },
                    { "label":{ "text":'hour' } },
                    { "label":{ "text":'today' } },
                    { "label":{ "text":'week' } },
                    { "label":{ "text":'month' } },
                    { "label":{ "text":'year' } },
                ]
            },
            { 
                "title": { "text":"type" }, 
                "filters": [
                    { "label":{ "text":'song' } },
                    { "label":{ "text":'playlist' } }
                ]
            },
            { 
                "title": { "text":"duration" }, 
                "filters": [
                    { "label":{ "text":'all' } },
                    { "label":{ "text":'short' } },
                    { "label":{ "text":'medium' } },
                    { "label":{ "text":'long' } }
                ]
            },
            { 
                "title": { "text":"sort_by" }, 
                "filters": [
                    { "label":{ "text":'upload_date' } },
                    { "label":{ "text":'relevance' } },
                    { "label":{ "text":'rating' } },
                    { "label":{ "text":'view_count' } }
                ]
            }
        ]
    }
    return obj.groups;
}

async function addFilterButtons() {
    if (!filtersContainer) return;
// || filtersContainer.innerHTML !== ''

    let groups = filtersData();
    console.log(groups);
    
    let filters = "";
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
    console.log(filters, "after");
    

    addSubmitButtonFilters(filters);
    showFilterItems();
    selectedFilterButtons();

    submitFIlterBtn();
}



function addSubmitButtonFilters(filters) {
    filters += `
    <div class="filterWrapper">
        <button id="submitFilters">Submit Filters</button>
    </div>
    `

    filtersContainer.innerHTML = filters;
}

function showFilterItems() {
    var filterHeaders = document.querySelectorAll('#filters .filterMainName');
    if (!filterHeaders) return;

    outSideFilterClose(filterHeaders);

    filterHeaders.forEach(filterHeader => {
        filterHeader.addEventListener('click', function (e) {
            if (!e.currentTarget) return;

            closeFilterRules(filterHeaders, e.currentTarget)

            e.currentTarget.classList.toggle('open');
        })
    })
}

function outSideFilterClose(filters) {
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

function selectedFilterButtons() {
    var filterDropdowns = document.querySelectorAll('#filters .hiddenDropDown');
    if (!filterDropdowns) return;

    filterDropdowns.forEach(dropdown => {
        let buttons = dropdown.querySelectorAll('button');
        if (!buttons) return;

        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                removeSelectedBtns(buttons, e.currentTarget);

                e.currentTarget.classList.toggle('selected');
            })
        })
    })
}

function removeSelectedBtns(buttons, clickedButton) {
    buttons.forEach(button => {
        if (button.classList.contains('selected') && clickedButton !== button) {
            button.classList.remove('selected');
        }
    })
}

// param based search url
function submitFIlterBtn() {
    let button = document.getElementById('submitFilters');
    if (!button) return;

    button.addEventListener('click', function () {
        var params = [];
        var filters = document.querySelectorAll('#filters .filterWrapper');
        var filterHeaders = document.querySelectorAll('#filters .filterMainName');
        if (!filters || !filterHeaders) return;

        closeAllFilters(filterHeaders);

        filters.forEach(filter => {
            var filterBtns = filter.querySelectorAll('.hiddenDropDown button');

            filterBtns.forEach(button => {
                if (!button.classList.contains('selected')) return;
                var encodedParam = button.getAttribute('params');
                var onceDecoded = decodeURIComponent(encodedParam);

                params.push(onceDecoded);
            })
        })
        filteredQuery(params);
    })
}

function filteredQuery(params) {
    if (!params) return;

    let payloadParam = params.join('');
console.log(params);

    fetchSearchResult(payloadParam);
}