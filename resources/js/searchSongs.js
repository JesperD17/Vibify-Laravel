import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { skeletonSongs } from './skeletonItems';
import { noResultsFound } from "./errors";
import { formJsonHtml } from "./global";

var songsMainContainer = document.getElementById('recentSearched');
var songList = songsMainContainer.querySelector('.songList');
var title = songsMainContainer.querySelector('.mainTitle');
var filtersContainer = document.getElementById('filters');

export async function searchSongs() {
    addFilterButtons();

    await fetchSearchResult();
}

function getSearchParams() {
    let param = document.getElementById('searchBar').value;
    if (!param) return;
    return param;
}

function getAmountOfValues() {
    var select = document.getElementById('amountSongSelector');
    if (!select) return;

    return select.value;
}

function clickedValues() {
    var select = document.getElementById('amountSongSelector');
    if (!select) return;

    let selected;

    select.addEventListener("change", (e) => {
        selected = Number(e.target.value);
        fetchSearchResult(selected)
    }, { once: true })
}

async function fetchSearchResult(selectedLength, filters) {
    loadingBeforeSubmit();
    skeletonSongs(songList);

    let param = getSearchParams();
    setSearchTitle(param);

    if (!selectedLength) selectedLength = getAmountOfValues();
    if (!filters) filters = getSelectedFilter();

    let response;
    let data;

    try {
        response = await fetch(`http://localhost:3000/search?search_query=${param}&search_length=${selectedLength}&type=${filters}`)
        data = await response.json();
    } catch (error) {
        console.error(error);
        noResultsFound(songList, 'Cannot fetch api data.');
        amountOfSearched();
        submittedFormLoading();
        return;
    }

    console.log(data);
    

    submittedFormLoading();

    if (data.length < 2) {
        noResultsFound(songList);
        amountOfSearched();
        return;
    }
    formJsonHtml(data, songList);
    amountOfSearched();
    clickedValues();
}

function setSearchTitle(param) {
    if (!title) return;
    title.innerText = 'Searched for: ' + param;
}

async function amountOfSearched() {
    let amountDivWrapper = document.querySelector('.searchHeader .searchAmount');
    let amountDiv = document.getElementById('amountFound');
    let items = songList.querySelectorAll('.item');
    if (!amountDivWrapper || !amountDiv) return;

    let apiEstimated = items.length;
    amountDivWrapper.style.display = "flex";
    amountDiv.innerText = apiEstimated;
}

// search filters
function filtersData() {
    let obj = {
        "musicSearchTypes": [
            { 'text': 'song' },
            { 'text': 'video' },
            { 'text': 'album' },
            { 'text': 'playlist' },
            { 'text': 'artist' }
        ]
    }
    return obj.musicSearchTypes;
}

async function addFilterButtons() {
    if (!filtersContainer) return;

    let types = filtersData();
    let filters = "";
    for (let i = 0; i < types.length; i++) {
        filters += `
            <button class="filterMainName" params='${types[i].text}'>
                ${types[i].text}
            </button>
        `
    }
    filtersContainer.innerHTML = filters;

    clickedFIlterBtn();
}

function clickedFIlterBtn() {
    let filters = document.querySelectorAll('#filters .filterMainName');
    if (!filters) return;

    filters[0].classList.add('selected');

    filters.forEach(filter => {
        filter.addEventListener('click', function (e) {
            if (!e.currentTarget) return;

            closeFilterRules(filters, e.currentTarget);

            e.currentTarget.classList.toggle('selected');

            submitFIlters(filter);
        })
    })
}

function closeFilterRules(filters, clickedFilter) {
    filters.forEach(filter => {
        if (filter.classList.contains('selected') && clickedFilter !== filter) {
            filter.classList.remove('selected');
        }
    })
}

// param based search url
function submitFIlters(header) {
    if (!header.classList.contains('selected')) return;

    let param = header.getAttribute('params');
    let search_length = getAmountOfValues();

    fetchSearchResult(search_length, param)
}

function getSelectedFilter() {
    let filters = document.querySelectorAll('#filters .filterMainName');
    if (!filters) return;

    let result;

    filters.forEach(filter => {
        if (!filter.classList.contains('selected')) return;

        result = filter.getAttribute('params');
    })

    return result;
}