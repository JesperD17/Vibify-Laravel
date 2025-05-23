export function skeletonSongs(list, type) {
    console.log(type);
    var amountOfSkeletonSongs = 24;
    var items = "";

    if (!type || type === "Song" || type === "Video") {
        for (let i = 0; i < amountOfSkeletonSongs; i++) {
            items += `
            <div class="song noClick">
                <div class="playSong">
                    <i class='bx bx-play'></i>
                    <img class="skeletons">
                </div>
                <div class="textWrapper">
                    <div class="songTitle skeletons">Random song title</div>
                    <div class="songAuthor skeletons">Random song author</div>
                </div>
            </div>
            `
        }
    } else if (type === "Album" || type === "Playlist") {
        for (let i = 0; i < amountOfSkeletonSongs; i++) {
            items += `
            <div class="playlist noClick skeletonGap">
                <a href="">
                    <img class="skeletons">
                    <div class="playlistAuthor">
                        <div class="authorName skeletons">Name</div>
                        <div class="itemName skeletons">Name</div>
                    </div>
                </a>
            </div>
            `
        }
    } else if (type === "Artist") {
        for (let i = 0; i < amountOfSkeletonSongs; i++) {
            items += `
            <div class="artist noClick">
                <a href="">
                    <img class="skeletons">
                    <div class="artistAuthor skeletons">Random author</div>
                </a>
            </div>
            `
        }
    }

    if (!list) return;
    list.innerHTML = items;
}