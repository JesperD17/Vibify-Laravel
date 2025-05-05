import { loadingBeforeSubmit, submittedFormLoading } from "./forms";
import { skeletonSongs } from './skeletonItems';
import { noResultsFound } from "./errors";

var songsMainContainer = document.getElementById('recentSearched');
var songList = songsMainContainer.querySelector('.songList');
var title = songsMainContainer.querySelector('.mainTitle');
// var filtersContainer = document.getElementById('filters');

export async function searchSongs() {
    loadingBeforeSubmit();
    skeletonSongs(songList);

    await fetchSearchResult();
}

function getSearchParams() {
    let param = document.getElementById('searchBar').value;
    if (!param) return;
    return param;
}

async function fetchSearchResult(newParams) {
    loadingBeforeSubmit();

    if (!newParams) {
        skeletonSongs(songList);
    }

    let param = getSearchParams();
    setSearchTitle(param);

    if (newParams) {
        console.log(newParams);
        // var response = await fetch(`http://localhost:3000/results?search_query=${param}&sp=${payloadParam}`);
        var response = await fetch(`${newParams}`)
        var data = await response.json();
    } else {
        var response = await fetch(`http://localhost:3000/results?search_query=${param}`);
        var data = await response.json();

        var loadIcon = document.getElementById('loadingScrollSongs');
        if (loadIcon) {
            waitUntilVisible(loadIcon, () => {
                console.log('User scrolled to #myDiv!');
                console.log(musicShelf.continuation);
                continuationUrlFetch(musicShelf.continuation);
            });
        }
    }

    submittedFormLoading();

    console.log('received', data);

    const musicShelf = data.contents.find(obj => obj.type === "MusicShelf");
    if (!musicShelf) {
        console.log('no songs found');
        noResultsFound(songList);
        return;
    }

    formJsonHtml(musicShelf.contents, newParams);
    amountOfSearched(musicShelf.contents);
    // addFilterButtons(data);
}

function setSearchTitle(param) {
    if (!title) return;
    title.innerText = 'Searched for: ' + param;
}

async function formJsonHtml(musicShelf, newParams) {
    console.log(musicShelf);
    if (!musicShelf) return;

    console.log(musicShelf, 'aaaa');

    let songs = "";
    for (let i = 0; i < musicShelf.length; i++) {
        let thumbnail = musicShelf[i].thumbnail.contents[0].url;
        let duration = musicShelf[i].duration.text;
        let title = musicShelf[i].title;
        let author = musicShelf[i].artists[0].name;

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
    if (!songList) return;

    if (!newParams) {
        songList.innerHTML = songs;
    } else {
        songList.innerHTML += songs;
    }
}

async function amountOfSearched(musicShelf) {
    let amountDivWrapper = document.querySelector('.searchHeader .searchAmount');
    let amountDiv = document.getElementById('amountFound');
    if (!amountDivWrapper || !amountDiv) return;

    let apiEstimated = musicShelf.length;

    amountDivWrapper.style.display = "flex";
    amountDiv.innerText = apiEstimated;
}

// search filters
// async function addFilterButtons(data) {
//     if (!filtersContainer || filtersContainer.innerHTML !== '') return;

//     let groups = data.header.search_filter_button.endpoint.open_popup.popup.groups;

//     let filters = "";
//     for (let i = 0; i < groups.length; i++) {
//         filters += `
//         <div class="filterWrapper">
//             <div class="filterMainName">
//                 ${groups[i].title.text}
//                 <i class='bx bx-chevron-right'></i>
//             </div>

//             <div class="hiddenDropDown ${i + 1}">`
//         for (let a = 0; a < groups[i].filters.length; a++) {
//             let url = groups[i].filters[a].endpoint.metadata.url;
//             let metaDataParam = await getAfterSubstring(url, '&sp=');
//             filters +=
//                 `<button params='${metaDataParam}'>${groups[i].filters[a].label.text}</button>`
//         }
//         filters +=
//             `</div>
//         </div>
//         `
//     }
//     addSubmitButtonFilters(filters);
//     showFilterItems();
//     selectedFilterButtons();

//     submitFIlterBtn();
// }

// async function getAfterSubstring(str, substring) {
//   if (typeof str !== 'string' || typeof substring !== 'string') return '';
//   const index = str.indexOf(substring);

//   if (index === -1) return '';
//   return str.slice(index + substring.length);
// }

// function addSubmitButtonFilters(filters) {
//     filters += `
//     <div class="filterWrapper">
//         <button id="submitFilters">Submit Filters</button>
//     </div>
//     `

//     filtersContainer.innerHTML = filters;
// }

// function showFilterItems() {
//     var filterHeaders = document.querySelectorAll('#filters .filterMainName');
//     if (!filterHeaders) return;

//     outSideFilterClose(filterHeaders);

//     filterHeaders.forEach(filterHeader => {
//         filterHeader.addEventListener('click', function (e) {
//             if (!e.currentTarget) return;

//             closeFilterRules(filterHeaders, e.currentTarget)

//             e.currentTarget.classList.toggle('open');
//         })
//     })
// }

// function outSideFilterClose(filters) {
//     window.addEventListener('click', function (e) {
//         filters.forEach(filter => {
//             if (filter.contains(e.target)) return;
//         })
//         if (filtersContainer.contains(e.target)) return;

//         closeAllFilters(filters);
//     })
// }

// function closeFilterRules(filters, clickedFilter) {
//     filters.forEach(filter => {
//         if (filter.classList.contains('open') && clickedFilter !== filter) {
//             filter.classList.remove('open');
//         }
//     })
// }

// function closeAllFilters(filters) {
//     filters.forEach(filter => {
//         if (filter.classList.contains('open')) {
//             filter.classList.remove('open');
//         }
//     })
// }

// function selectedFilterButtons() {
//     var filterDropdowns = document.querySelectorAll('#filters .hiddenDropDown');
//     if (!filterDropdowns) return;

//     filterDropdowns.forEach(dropdown => {
//         let buttons = dropdown.querySelectorAll('button');
//         if (!buttons) return;


//         buttons.forEach(button => {
//             button.addEventListener('click', function (e) {
//                 removeSelectedBtns(buttons, e.currentTarget);

//                 e.currentTarget.classList.toggle('selected');
//             })
//         })
//     })
// }

// function removeSelectedBtns(buttons, clickedButton) {
//     buttons.forEach(button => {
//         if (button.classList.contains('selected') && clickedButton !== button) {
//             button.classList.remove('selected');
//         }
//     })
// }

// // param based search url
// function submitFIlterBtn() {
//     let button = document.getElementById('submitFilters');
//     if (!button) return;

//     button.addEventListener('click', function () {
//         var params = [];
//         var filters = document.querySelectorAll('#filters .filterWrapper');
//         var filterHeaders = document.querySelectorAll('#filters .filterMainName');
//         if (!filters || !filterHeaders) return;

//         closeAllFilters(filterHeaders);

//         filters.forEach(filter => {
//             var filterBtns = filter.querySelectorAll('.hiddenDropDown button');

//             filterBtns.forEach(button => {
//                 if (!button.classList.contains('selected')) return;
//                 var encodedParam = button.getAttribute('params');
//                 var onceDecoded = decodeURIComponent(encodedParam);

//                 params.push(onceDecoded);
//             })
//         })
//         filteredQuery(params);
//     })
// }

// function filteredQuery(params) {
//     if (!params) return;

//     let payloadParam = params.join('');
// console.log(params);

//     fetchSearchResult(payloadParam);
// }

function waitUntilVisible(target, callback) {
    if (!target) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.disconnect();
            }
        });
    });
    observer.observe(target);
}

function continuationUrlFetch(continuation) {
    // setSearchTitle(param);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;

    let newUrl = `http://localhost:3000/results?continuation=${continuation}`;

    fetchSearchResult(newUrl);
}