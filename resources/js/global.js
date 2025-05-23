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

export function seeDOMChanges(area, callback, options = {}) {    
    const observer = new MutationObserver((entries) => {                        
        entries.forEach(entry => {
            if (entry) {              
                callback(entry.target);
            }
        });
    });
    observer.observe(area, { childList: true, subtree: false, ...options });
}

// creating songs, playlists, albums and artist elements.
export async function formJsonHtml(data, list) {
    if (!data) return;

    let itemList = "";
    let mostItemType = Object.entries(
        data.reduce((acc, { item_type }) => {
            acc[item_type] = (acc[item_type] || 0) + 1;
            return acc;
        }, {})
    ).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

    if (mostItemType === "undefined") {
        createCustomHtmlItems(data, list);
        return;
    }
    console.log(mostItemType);
    
    if (mostItemType === "song" || mostItemType === "video") {
        for (let i = 0; i < data.length; i++) {
            let thumbnail = data[i]?.thumbnail?.contents?.[0]?.url || '';
            let duration = data[i]?.duration?.text || 'N/A';
            let title = data[i]?.title?.text || data[i]?.title || '';
            let author = data[i]?.artists?.[0]?.name || data[i]?.authors?.[0]?.name || data[i]?.author?.name || '';

            itemList += `
            <div class="song item">
                <div class="playSong">
                    <i class='bx bx-play'></i>
                    <img class="skeletons" src="${thumbnail}">
                </div>
                <div class="textWrapper">
                    <div class="songTitle">${title}</div>
                    <div class="songAuthor">${author}</div>
                </div>
                <div class="lengthSong">${duration}</div>
            </div>
            `
        }
    } else if (mostItemType === "album" || mostItemType === "playlist") {
        for (let i = 0; i < data.length; i++) {
            let thumbnail = data[i]?.thumbnail?.contents?.[0]?.url || data[i]?.thumbnail?.[0]?.url || '';
            let title = data[i]?.title?.text || data[i]?.title || '';
            let author = data[i]?.author?.name || data[i]?.authors?.[0]?.name || data[i]?.name || '';

            itemList += `
            <div class="playlist item">
                <a href="">
                    <img class="skeletons" src="${thumbnail}">
                    <div class="playlistAuthor">
                        <div class="authorName">
                            ${author}
                        </div>`
            if (!author === '' || !title === '') {
                itemList +=
                    `| `
            }
            itemList +=
                `${title}
                    </div>
                </a>
            </div>
            `
        }
    } else if (mostItemType === "artist") {
        for (let i = 0; i < data.length; i++) {
            let thumbnail = data[i]?.thumbnail?.contents[0]?.url || '';
            let author = data[i]?.name || '';

            itemList += `
            <div class="artist item">
                <a href="">
                    <img class="skeletons" src="${thumbnail}">
                    <div class="artistAuthor">${author}</div>
                </a>
            </div>
            `
        }
    }

    if (!list) return;
    list.innerHTML = itemList;
}

// custom html
function createCustomHtmlItems(data, list) {
    if(!data || !list) return;

    let mostBtnText = hasMajorityButtonText(data, item.button_text)
    if (mostBtnText) {
        list.innerHTML === itemList;
        return
    }

}

function hasMajorityButtonText(items, type) {
  let threshold = 0.5;
  let total = items.length;
  let withButtonText = items.filter(
    item => typeof type === 'string' && type.trim() !== ""
  ).length;

  return (withButtonText / total) > threshold;
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

// autloaded feed items
export async function createHtmlSections(container, data) {
    if (!container || !data) {
        noResultsFound(container, 'Unable to fetch Api data')
        return;
    }
    console.log(data);
    

    let items = '';
    let lists = [];
    let index = 0;
    data.sections.forEach(section => {
        index++;

        let title = section?.header?.title?.text || 'Random';
        let typeOfList = section?.contents?.[0]?.item_type + 'List index' + index;
        let typeOfListQuerySelector = `.${section.contents[0].item_type}List.index${index}`;
        lists.push({ title: typeOfListQuerySelector, item: section });

        items += `
        <div class="mainTitle">
        ${title}
        </div>
        
        <div class="${typeOfList}">
        </div>
        `
    });

    container.innerHTML = items;

    importHtmlSections(container, lists);
}

async function importHtmlSections(container, lists) {
    lists.forEach(list => {
        let htmlItem = container.querySelector(list.title)
        formJsonHtml(list.item.contents, htmlItem);

        let mostItemType = Object.entries(
            list.item.contents.reduce((acc, { item_type }) => {
                acc[item_type] = (acc[item_type] || 0) + 1;
                return acc;
            }, {})
        ).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

        if (mostItemType === "song") {
            htmlItem.style.cursor = 'grab';
            htmlItem.addEventListener('mousedown', e => {
                mouseDownHandler(e, htmlItem)
            });
        }
    })
}