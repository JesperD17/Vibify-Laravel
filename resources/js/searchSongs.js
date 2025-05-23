import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { skeletonSongs } from './skeletonItems';
import { noResultsFound } from "./errors";
import { formJsonHtml } from "./global";

var songsMainContainer = document.getElementById('recentSearched');
var title = songsMainContainer.querySelector('.mainTitle');
var filtersContainer = document.getElementById('filters');
var searchBar = document.getElementById('searchBar');
var suggestionList = document.querySelector('#suggestSearchItems .itemsWrapper');

var allLists = [
    songsMainContainer.querySelector('.songList'),
    songsMainContainer.querySelector('.videoList'),
    songsMainContainer.querySelector('.albumList'),
    songsMainContainer.querySelector('.playlistList'),
    songsMainContainer.querySelector('.artistList')
]

foremSuggestionsList();
searchBar.addEventListener("input", foremSuggestionsList);
searchBar.addEventListener("keydown", showHideSuggestions);
document.addEventListener("click", showHideSuggestions);

window.myApp.searchSongs = searchSongs;

async function searchSongs() {
    addFilterButtons();
    await fetchSearchResult();
    clickedValues();
}

function getSearchParams() {
    let param = document.getElementById('searchBar').value;
    if (!param) return;
    return param;
}

function getAmountOfValues() {
    var select = document.getElementById('amountSongSelector');
    if (!select) return;

    return Number(select.value);
}

function clickedValues() {
    var select = document.getElementById('amountSongSelector');
    if (!select) return;

    const newSelect = select.cloneNode(true);
    select.parentNode.replaceChild(newSelect, select);

    newSelect.addEventListener("change", (e) => {
        fetchSearchResult(Number(e.target.value))
    })
}

async function fetchSearchResult(selectedLength, filters, type) {
    let newSelectedLength = getAmountOfValues();

    for (let i = 0; i < allLists.length; i++) {
        const list = allLists[i];
        if (!list.classList.contains('visibleList')) continue;

        const currentItems = list.querySelectorAll('.item')?.length || 0;
        if (currentItems > 0 && currentItems === selectedLength) continue;

        loadingBeforeSubmit();
        skeletonSongs(list, type);

        let limitMessage = await guestSearchLimit();
        if (limitMessage && limitMessage === 'too many requests!') {
            allLists.forEach(list => {
                if (!list.classList.contains('visibleList')) return;
                noResultsFound(list, 'Your daily limit of search request has been reached!', `<i class='bx bx-time-five'></i>`);
            })
            amountOfSearched();
            submittedFormLoading();
            return;
        }

        let param = getSearchParams();
        if (!selectedLength) selectedLength = newSelectedLength;
        if (!filters) filters = getSelectedFilter();

        let data = await fetchData(param, selectedLength, filters);
        setSearchTitle(param);
        submittedFormLoading();

        if (!data.length || data.length < 2) {
            allLists.forEach(list => {
                if (!list.classList.contains('visibleList')) return;
                noResultsFound(list);
            })
            amountOfSearched();
            return;
        }

        insertIntoElms(data, list);
        amountOfSearched();
        saveToAutoCookie();
    }
}

function setSearchTitle(param) {
    if (!title) return;
    title.innerText = 'Searched for: ' + param;
}

async function fetchData(param, selectedLength, filters) {
    let response;
    let data;
    try {
        response = await fetch(`http://localhost:3000/search?search_query=${param}&search_length=${selectedLength}&type=${filters}`)
        data = await response.json();
    } catch (error) {
        console.error(error);
        allLists.forEach(list => {
            if (!list.classList.contains('visibleList')) return;
            noResultsFound(list, 'Cannot fetch api data.');
        })
        amountOfSearched();
        submittedFormLoading();
        return;
    }
    return data;
}

async function insertIntoElms(data, list) {
    if (!data) return;
    if (!list.innerHTML === '') return;
    formJsonHtml(data, list);
}

function amountOfSearched() {
    let amountDivWrapper = document.querySelector('.searchHeader .searchAmount');
    let amountDiv = document.getElementById('amountFound');
    let items;
    allLists.forEach(list => {
        if (!list.classList.contains('visibleList')) return;
        items = list.querySelectorAll('.item');
    })
    if (!amountDivWrapper || !amountDiv) return;
    let apiEstimated = items?.length;
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
    filters.forEach((filter, index) => {
        filter.addEventListener('click', function (e) {
            if (!e.currentTarget) return;

            closeFilterRules(filters, e.currentTarget);
            e.currentTarget.classList.toggle('selected');

            hideLists(index);
            submitFIlters(filter, e.currentTarget.innerText);
            amountOfSearched()
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

function hideLists(clickedIndex) {
    allLists.forEach((list, index) => {
        if (list.classList.contains('visibleList') && index !== clickedIndex) {
            list.classList.remove('visibleList');
        }

        if (index === clickedIndex) {
            list.classList.add('visibleList')
        }
    });
}

// param based search url
function submitFIlters(header, type) {
    if (!header.classList.contains('selected')) return;
    let param = header.getAttribute('params');
    let search_length = Number(getAmountOfValues());

    fetchSearchResult(search_length, param, type)
}

function getSelectedFilter() {
    let filters = document.querySelectorAll('#filters .filterMainName');
    let result;
    if (!filters) return;

    filters.forEach(filter => {
        if (!filter.classList.contains('selected')) return;
        result = filter.getAttribute('params');
    })
    return result;
}

async function guestSearchLimit() {
    let response = await fetch(`/guestLimit`)
    let data = await response.json();
    if (!data) return undefined;
    return data;
}

// autocomplete
function saveToAutoCookie() {
    let param = getSearchParams();
    let cookieMatch = document.cookie.match(/(?:^|;\s*)guestLimit=([^;]*)/);
    let cookieList = [];

    if (cookieMatch) {
        cookieMatch = cookieMatch[1];
        cookieList = cookieMatch.split(',');
    }
    if (!cookieList.includes(param)) {
        cookieList.push(param);
    }
    document.cookie = "guestLimit=" + cookieList.join(',') + "; path=/";
}

function foremSuggestionsList() {
    let list = document.cookie.match(/(?:^|;\s*)guestLimit=([^;]*)/);
    if (!list) return;
    console.log(list);

    list = list[1];
    const arrayObj = [];
    let start = 0;

    for (let i = 0; i < list.length; i++) {
        if (list[i] === ",") {
            arrayObj.push(list.slice(start, i));
            start = i + 1;
        }
    }
    arrayObj.push(list.slice(start));

    if (arrayObj.length > 5) {
        createSuggestionDivs(arrayObj.slice((arrayObj.length - 5), arrayObj.length))
    } else {
        createSuggestionDivs(arrayObj);
    }
}

function createSuggestionDivs(list) {
    let divs = "";
    for (let i = 0; i < list.length; i++) {
        divs += `
        <div class="suggestionItem">${list[i]}</div>
        `
    }
    suggestionList.innerHTML = divs;
    addSuggestionsToBar();
}

function showHideSuggestions(e) {
    const childDiv = suggestionList.querySelector('div');
    
    if (!e.key) {
        if (suggestionList.contains(e.target)) return;
        if (
            searchBar.contains(e.target) &&
            window.getComputedStyle(suggestionList, null).display === 'none' &&
            suggestionList.contains(childDiv)
        ) {            
            suggestionList.style.display = "flex";
            return;
        } else {
            suggestionList.style.display = null;
            return;
        }
    };

    if (e.key === 'Backspace' || e.key === 'Enter') {
        suggestionList.style.display = null;
    }
}

function addSuggestionsToBar() {
    let items = suggestionList.querySelectorAll('.suggestionItem');
    items.forEach(item => {
        item.addEventListener('click', () => {
            searchBar.value = item.innerText;
            suggestionList.style.display = null;
        })
    })
}