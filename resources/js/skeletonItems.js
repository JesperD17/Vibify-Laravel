export function skeletonSongs(list) {
    var amountOfSkeletonSongs = 24;
    var skeletonSongs = "";
    for (let i = 0; i < amountOfSkeletonSongs; i++) {
        skeletonSongs += `
        <div class="song noClick">
            <div class="playSong">
                <i class='bx bx-play'></i>
                <img class="skeletons">
            </div>
            <div class="textWrapper">
                <div class="songTitle skeletons">random song title</div>
                <div class="songAuthor skeletons">random song author</div>
            </div>
        </div>
        `
    }

    if (!list) return;
    list.innerHTML = skeletonSongs;
}