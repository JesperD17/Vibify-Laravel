import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { skeletonSongs } from './skeletonItems';

var songsMainContainer = document.getElementById('recentSearched');
var songList = songsMainContainer.querySelector('.songList');
var title = songsMainContainer.querySelector('.mainTitle');
var filtersContainer = document.getElementById('filters');

export async function searchSongs() {
    loadingBeforeSubmit();
    skeletonSongs(songList);

    await fetchSearchResult();
}

function getSearchParams() {
    var param = document.getElementById('searchBar').value;
    if (!param) return;
    return param;
}

async function fetchSearchResult(payloadParam) {
    loadingBeforeSubmit();
    skeletonSongs(songList);

    var param = getSearchParams();
    setSearchTitle(param)

    if (payloadParam) {
        console.log(payloadParam);
        var response = await fetch(`http://localhost:3000/results?search_query=${param}&sp=${payloadParam}`);
        var data = await response.json();
    } else {
        var response = await fetch(`http://localhost:3000/results?search_query=${param}`);
        var data = await response.json();
    }

    submittedFormLoading();

    console.log('received', data);

    formJsonHtml(data.results);
    amountOfSearched(data);
    addFilterButtons(data);
}

function setSearchTitle(param) {
    if (!title) return;
    title.innerText = 'Searched for: ' + param;
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
            var url = groups[i].filters[a].endpoint.metadata.url;
            var metaDataParam = await getAfterSubstring(url, '&sp=');
            filters +=
                `<button params='${metaDataParam}'>${groups[i].filters[a].label.text}</button>`
        }
        filters +=
            `</div>
        </div>
        `
    }
    addSubmitButtonFilters(filters);
    showFilterItems();
    selectedFilterButtons();
    
    submitFIlterBtn();
}

async function getAfterSubstring(str, substring) {
  if (typeof str !== 'string' || typeof substring !== 'string') return '';
  const index = str.indexOf(substring);
  if (index === -1) return '';
  return str.slice(index + substring.length);
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
        var buttons = dropdown.querySelectorAll('button');
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
    var button = document.getElementById('submitFilters');
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
                var paramAttribute = button.getAttribute('params');
                params.push(paramAttribute);
            })
        })
        filteredQuery(params);
    })
}

function filteredQuery(params) {
    if (!params) return;

    var payloadParam = params.join('');
console.log(params);

    fetchSearchResult(payloadParam);
}