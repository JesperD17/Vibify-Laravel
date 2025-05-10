// let metaDataParam = await getAfterSubstring(url, '&sp=');
export async function getAfterSubstring(str, substring) {
    if (typeof str !== 'string' || typeof substring !== 'string') return '';
    const index = str.indexOf(substring);

    if (index === -1) return '';
    return str.slice(index + substring.length);
}


// waitUntilVisible(loadIcon, () => { console.log('User scrolled to #myDiv!'); });
export function waitUntilVisible(target, callback) {
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

// creating songs, playlists, albums and artist elements.
export async function formJsonHtml(data, list) {
    if (!data) return;

    let itemList = "";
    let firstItemType = data[0].item_type;

    let firstDuration = data[0]?.duration?.text;
    if (firstItemType === "song" && firstDuration || firstItemType === "video") {
        for (let i = 0; i < data.length; i++) {
            let thumbnail = data[i]?.thumbnail?.contents?.[0]?.url || 'FAILED TO LOAD';
            let duration = data[i]?.duration?.text || 'N/A';
            let title = data[i]?.title || 'Unknown title';
            let author = data[i]?.artists?.[0]?.name || data[i]?.authors?.[0]?.name || data[i]?.author?.name || 'Unknown author';

            itemList += `
            <div class="song item">
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
            let thumbnail = data[i]?.thumbnail?.contents?.[0]?.url || data[i]?.thumbnail?.[0]?.url || 'FAILED TO LOAD';
            let title = data[i]?.title || 'Unknown title';
            let author = data[i]?.artists?.[0]?.name || data[i]?.authors?.[0]?.name || data[i]?.author?.name || data[i]?.name || 'Unknown author';

            itemList += `
            <div class="playlist item">
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
            let thumbnail = data[i]?.thumbnail?.contents[0]?.url || 'FAILED TO LOAD';
            let author = data[i]?.artists?.[0]?.name || data[i]?.authors?.[0]?.name || data[i]?.author?.name || data[i]?.name || 'Unknown author';

            itemList += `
            <div class="artist item">
                <a href="">
                    <img src="${thumbnail}">
                    <div class="artistAuthor">${author}</div>
                </a>
            </div>
            `
        }
    } else if (firstItemType === "song" && !firstDuration) {
        for (let i = 0; i < data.length; i++) {
            let thumbnail = data[i]?.thumbnail?.contents?.[0]?.url || 'FAILED TO LOAD';
            let title = data[i]?.title || 'Unknown title';
            let author = data[i]?.artists?.[0]?.name || data[i]?.authors?.[0]?.name || data[i]?.author?.name || 'Unknown author';

            itemList += `
            <div class="song item">
                <div class="playSong">
                    <i class='bx bx-play'></i>
                    <img class="skeletons" src="${thumbnail}">
                    <div class="lengthSong"></div>
                </div>
                <div class="textWrapper">
                    <div class="songTitle">${title}</div>
                    <div class="songAuthor">${author}</div>
                </div>
            </div>
            `
        }
    }

    if (!list) return;
    list.innerHTML = itemList;
}

// draggable scroll
let moveHandler;
let upHandler;

export function mouseDownHandler(e, list) {
    list.style.cursor = 'grabbing';
    list.style.userSelect = 'none';

    const pos = {
        left: list.scrollLeft,
        x: e.clientX,
    };

    moveHandler = function (e) {
        mouseMoveHandler(e, list, pos);
    };

    upHandler = function () {
        mouseUpHandler(list);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
}

function mouseMoveHandler(e, list, pos) {
    const dx = e.clientX - pos.x;

    list.scrollLeft = pos.left - dx;
}

function mouseUpHandler(list) {
    list.style.cursor = 'grab';
    list.style.removeProperty('user-select');

    document.removeEventListener('mousemove', moveHandler);
    document.removeEventListener('mouseup', upHandler);
}