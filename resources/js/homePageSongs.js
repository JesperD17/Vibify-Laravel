import { formJsonHtml, mouseDownHandler } from "./global";

var container = document.getElementById('homeFeed');

document.addEventListener("DOMContentLoaded", function () {
    functionObserver()
});

async function functionObserver() {
    let data = await fetchData();

    createHtmlSections(data)
}

export async function fetchData() {
    let response = await fetch(`http://localhost:3000/standard`);
    let data = await response.json();
    return data;
}

async function createHtmlSections(data) {
    if (!container || !data) return;

    let items;
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

    importHtmlSections(lists);
}

async function importHtmlSections(lists) {
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