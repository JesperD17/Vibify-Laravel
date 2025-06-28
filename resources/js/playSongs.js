import { seeDOMChanges } from "./global";

var container = document.querySelector('playingsong');
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
    playSong()
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

                document.cookie = "playingID=" + item.querySelector('.videoId').innerText;
                document.cookie = "play=True";
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
    console.log('creating', div, id);

    playSong(id)
}

async function playSong(id) {
    if (!id) {
        id = document.cookie.match(/(?:^|;\s*)playingID=([^;]*)/)[1];
        // id = id[1];
    }

    let data = await fetchAudioData(id);
    let strings = await fetchAudioStrings(id);
    changeHtmlData(data, strings);
    container.style.display = "flex";
    console.log(data, 'br', strings);

}

async function fetchAudioData(id) {
    let response = await fetch(`http://localhost:3000/streamingData?id=${id}&type=audio`)
    let data = await response.json();
    return data;
}

async function fetchAudioStrings(id) {
    let response = await fetch(`http://localhost:3000/streamingData?songData=${id}`)
    let data = await response.json();
    return data;
}

function changeHtmlData(data, strings) {
    let audio = container.querySelector('audio');
    audio.querySelector('source').src = data.url;
    audio.load();

    let dataHtml = container.querySelector('.songInfo');
    dataHtml.querySelector('img').src = strings.basic_info.thumbnail[0].url;
    dataHtml.querySelector('.songTitle').innerHTML = strings.basic_info.title;
    dataHtml.querySelector('.songAuthor').innerHTML = strings.basic_info.author;
}