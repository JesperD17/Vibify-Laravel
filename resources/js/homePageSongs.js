import { formJsonHtml, mouseDownHandler } from "./global";

document.addEventListener("DOMContentLoaded", function () {
    fetchData()
});

export async function fetchData() {
    let response = await fetch(`http://localhost:3000/standard`);
    var data = await response.json();
    console.log(data);

    const listWithSong = data.sections.find(section =>
        section.contents?.some(item => item.item_type === "song")
    );

    const listWithAlbum = data.sections.find(section =>
        section.contents?.some(item => item.item_type === "album")
    );
    
    var songList = document.querySelector('#populairSongs .songList');
    var albumList = document.querySelector('#populairAlbums .albumList');

    if (!songList || !albumList) return;

    formJsonHtml(listWithSong.contents, songList);
    formJsonHtml(listWithAlbum.contents, albumList);

    songList.style.cursor = 'grab';
    songList.addEventListener('mousedown', e => {
        mouseDownHandler(e, songList)
    });
}