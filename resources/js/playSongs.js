import { seeDOMChanges } from "./global";

var homeFeed = document.getElementById('homeFeed');
var searchFeed = document.getElementById('recentSearched');
var autoloadedItems = document.getElementById('pageLoadedItems');

document.addEventListener("DOMContentLoaded", function () {
    if (homeFeed) {
        readNewItems(homeFeed, { subtree: false });
    } else if (searchFeed) {
        readNewItems(searchFeed, { subtree: true });
        readNewItems(autoloadedItems, { subtree: false });
    }
});

createPlaySongHtml();

function readNewItems(area, options = {}) {
    seeDOMChanges(area, (entry) => {
        let items = entry.querySelectorAll('.playable');
        if (items.length === 0) return;
        clickableItems(items);
    }, options);
}

function clickableItems(items) {
    console.log(items);
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('songAuthor')) return;
            let icon = item.querySelector('.playSong i');
            
            removePlaySongRules(items, e.currentTarget, icon);
            if (!item.classList.contains('playingSong')) {
                item.classList.toggle('playingSong');
                icon.classList.remove('bx-play');
                icon.classList.add('bx-pause');

                document.cookie = "playing=" + item.querySelector('.videoId').innerText;
                createPlaySongHtml(item, item.querySelector('.videoId').innerText);
            }
        })
    });
}

function removePlaySongRules(songs, clickedSong) {
    songs.forEach(song => { 
        if (song.classList.contains('playingSong') && clickedSong !== song) {
            let icon = song.querySelector('.playSong i');
            song.classList.remove('playingSong');
            icon.classList.remove('bx-pause');
            icon.classList.add('bx-play');
        }
    })
}

function createPlaySongHtml(div, id) {
    if (!div || !id) {
        div = document.querySelector('.playingSong');
        if (!div) return;
        id = div.querySelector('.videoId').innerText;
    }
    if (!div || !id) return;
    console.log('creating', div, id);
}

// function rememberPlayingVideo(value) {
//     document.cookie = "playing=" + value;
// }