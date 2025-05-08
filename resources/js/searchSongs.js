import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { skeletonSongs } from './skeletonItems';
import { noResultsFound } from "./errors";

var songsMainContainer = document.getElementById('recentSearched');
var songList = songsMainContainer.querySelector('.songList');
var title = songsMainContainer.querySelector('.mainTitle');
var filtersContainer = document.getElementById('filters');

export async function searchSongs() {
    await fetchSearchResult();

    addFilterButtons();
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

    if (!selectedLength) selectedLength = 20;

    let response;
    let data;

    if (filters) {
        response = await fetch(`http://localhost:3000/search?search_query=${param}&search_length=${selectedLength}&type=${filters}`);
    } else {
        response = await fetch(`http://localhost:3000/search?search_query=${param}&search_length=${selectedLength}&type=song`);
    }
    data = await response.json();

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

    clickedValues();
}

function setSearchTitle(param) {
    if (!title) return;
    title.innerText = 'Searched for: ' + param;
}

export async function formJsonHtml(data, list) {
    if (!data) return;

    console.log(data, 'aaaa');

    let foundList = data.find(obj => obj.type === "MusicResponsiveListItem");

    let itemList = "";

    let firstItemType = data[0].item_type;
    if (firstItemType === "song" || firstItemType === "video") {
        for (let i = 0; i < data.length; i++) {
            let thumbnail = data[i]?.thumbnail?.contents[0]?.url;
            let duration = data[i]?.duration?.text || 'N/A';
            let title = data[i]?.title;
            let author = data[i]?.artists?.[0]?.name || data[i]?.authors?.[0]?.name || data[i]?.author?.name || 'Unknown author';

            // if (!thumbnail || !duration || !title || !author) continue;

            itemList += `
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
    } else if (firstItemType === "album" || firstItemType === "playlist") {
        for (let i = 0; i < data.length; i++) {
            let thumbnail = data[i]?.thumbnail?.contents[0]?.url;
            let title = data[i]?.title;
            let author = data[i]?.artists?.[0]?.name || data[i]?.authors?.[0]?.name || data[i]?.author?.name || data[i]?.name || 'Unknown author';

            // if (!thumbnail || !duration || !title || !author) continue;

            itemList += `
            <div class="playlist">
                <a href="">
                    <img src="${thumbnail}">
                    <div class="playlistAuthor">
                        <div class="authorName">
                            ${author}
                        </div> 
                        | ${title}
                    </div>
                </a>
            </div>
            `
        }
    } else if (firstItemType === "artist") {
        for (let i = 0; i < data.length; i++) {
            let thumbnail = data[i]?.thumbnail?.contents[0]?.url;
            let author = data[i]?.artists?.[0]?.name || data[i]?.authors?.[0]?.name || data[i]?.author?.name || data[i]?.name || 'Unknown author';

            // if (!thumbnail || !duration || !title || !author) continue;

            itemList += `
            <div class="artist">
                <a href="">
                    <img src="${thumbnail}">
                    <div class="artistAuthor">${author}</div>
                </a>
            </div>
            `
        }
    }

    if (!list) return;
    list.innerHTML = itemList;
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
    var filters = document.querySelectorAll('#filters .filterMainName');
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