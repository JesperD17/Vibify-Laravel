import { seeDOMChanges } from "./global";

var container = document.querySelector('playingSong');
var homeFeed = document.getElementById('homeFeed');
var searchFeed = document.getElementById('recentSearched');
var autoloadedItems = document.getElementById('pageLoadedItems');
let player = null;

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
    playSong(id)
}

async function playSong(id) {
    console.log(document.cookie.match(/(?:^|;\s*)playingID=([^;]*)/));

    if (!id) {
        id = document.cookie.match(/(?:^|;\s*)playingID=([^;]*)/);
        if (!id) return;
        id = id[1];
    }

    try {
        startAudioPlayer(`http://localhost:3000/player?id=${id}&type=audio`);
        insertSongInfo(await fetchAudioStrings(id))
        container.style.display = "flex";
    } catch (e) {
        console.error("Failed to load song data:", e);
    }
}

async function fetchAudioStrings(id) {
    let response = await fetch(`http://localhost:3000/streamingData?songData=${id}`)
    let data = await response.json();
    console.log(data)
    return data;
}

function startAudioPlayer(url) {
    const wrapper = container.querySelector('.centerPlayingWrapper');
    const audio = wrapper.querySelector('audio');
    const playPauseBtn = document.getElementById("play-pause");
    if (!wrapper || !audio || !playPauseBtn) return;

    if (player !== null) {
        player.destroy();
        player = null;
    }

    if (url.includes('.mpd')) {
        player = dashjs.MediaPlayer().create();
        player.initialize(audio, url, true);
    } else {
        // progressive stream (mp3/ogg/etc.) or proxyed stream
        audio.src = url;
        audio.load();
    }

    player = dashjs.MediaPlayer().create();
    player.initialize(audio, url, true);
    audio.play();
    actionMenuEvents(audio, wrapper, playPauseBtn);
}

function actionMenuEvents(audio, wrapper, playPauseBtn) {
    const seekBar = wrapper.querySelector(".seek-bar");
    const currentTimeEl = wrapper.querySelector(".current-time");
    const durationEl = wrapper.querySelector(".duration");
    var isInternalChange = false;

    playPauseBtn.addEventListener("click", () => {
        isInternalChange = true;
        playPauseIf(audio, playPauseBtn);
        isInternalChange = false;
    });

    audio.addEventListener("play", (event) => {
        console.log(event)
    });

    seekBar.addEventListener("input", () => {
        audio.currentTime = seekBar.value;
    });

    audio.addEventListener("timeupdate", () => {
        seekBar.value = audio.currentTime;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", () => {
        seekBar.max = audio.duration;
        durationEl.textContent = formatTime(audio.duration);
    });
}

function playPauseIf(audio, button) {
    if (audio.paused) { 
        audio.play();
        console.log('play');

        button.classList.replace("bx-play", "bx-pause");
    } else {
        audio.pause();

        console.log('pause');

        button.classList.replace("bx-pause", "bx-play");
    }
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`; 
}

function insertSongInfo(strings) {
    const dataHtml = container.querySelector('.songInfo');
    if (!dataHtml) return
    dataHtml.querySelector('img').src = strings.basic_info.thumbnail[0].url;
    dataHtml.querySelector('.songTitle').innerText = strings.basic_info.title;
    dataHtml.querySelector('.songAuthor').innerText = strings.basic_info.author;
}