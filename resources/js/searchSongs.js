import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { skeletonSongs } from './skeletonItems';
import { noResultsFound } from "./errors";
import { formJsonHtml } from "./global";

var songsMainContainer = document.getElementById('recentSearched');
var title = songsMainContainer.querySelector('.mainTitle');
var filtersContainer = document.getElementById('filters');

var allLists = [
    songsMainContainer.querySelector('.songList'),
    songsMainContainer.querySelector('.videoList'),
    songsMainContainer.querySelector('.albumList'),
    songsMainContainer.querySelector('.playlistList'),
    songsMainContainer.querySelector('.artistList')
]

window.myApp.searchSongs = searchSongs;

async function searchSongs() {
    // let cookieMatch = document.cookie.match(/guestLimit=(\d+)/);
    // let oldValue = 0;
    // if (cookieMatch) {
    //     oldValue = parseInt(cookieMatch[1], 10); 
    // }
    
    // if (oldValue < 5) {
        addFilterButtons();
    
        await fetchSearchResult();
    
        clickedValues();
    // } else {
        // allLists.forEach(list => {
        //     if (!list.classList.contains('visibleList')) return;
        //     noResultsFound(list, 
        //     `You have reached your daily limit of 5 searches. Please <a href="/auth/log in">login</a> or return tomorrow to continue.`, 
        //     `<i class='bx bx-message-rounded-error'></i>`)
        // })
        
    // }
    // guestSearchLimit();
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

async function fetchSearchResult(selectedLength, filters) {
    let newSelectedLength = getAmountOfValues();
    
    for (let i = 0; i < allLists.length; i++) {
        const list = allLists[i];

        if (!list.classList.contains('visibleList')) continue;        

        // Count actual items inside the list
        const currentItems = list.querySelectorAll('.item')?.length || 0;

        // Only fetch if the list is empty or the amount has changed
        if (currentItems > 0 && currentItems === selectedLength) continue;

        loadingBeforeSubmit();
        skeletonSongs(list);
        
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
            submitFIlters(filter);
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
function submitFIlters(header) {
    if (!header.classList.contains('selected')) return;
    let param = header.getAttribute('params');
    let search_length = Number(getAmountOfValues());

    fetchSearchResult(search_length, param)
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

// function guestSearchLimit() {
//     let loggedInDiv = document.getElementById('loggedIn');
//     if (loggedInDiv) {
//         document.cookie = "guestLimit=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
//         return
//     }

//     let cookieMatch = document.cookie.match(/guestLimit=(\d+)/);
//     var tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     let expires = "expires=" + tomorrow.toUTCString();
    
//     if (!cookieMatch) {
//         document.cookie = "guestLimit=1; " + expires + ";";
//     } else {
//         let oldValue = parseInt(cookieMatch[1], 10);
//         if (oldValue === 5) {
//             return
//         }
//         let newValue = oldValue + 1;
//         document.cookie = "guestLimit=" + newValue + "; " + expires + ";";
//     }
//     console.log(document.cookie);
    
// }