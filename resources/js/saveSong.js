import { seeDOMChanges } from "./global";

let homeFeed = document.getElementById('homeFeed');
let recentSearched = document.getElementById('recentSearched');

document.addEventListener("DOMContentLoaded", function () {
    if (homeFeed) {
        readNewItems(homeFeed)
    } else if (recentSearched) {
        readNewItems(recentSearched, { subtree: true });
    } else {
        return;
    }
});

function readNewItems(area, options = {}) {
    seeDOMChanges(area, (entry) => {
        let items = entry.querySelectorAll('.item');
        if (!items || !items instanceof NodeList || items.length < 1) return;
        insertSaveButton(items);
    }, options)
}

function insertSaveButton(items) {
    if(!items) return;
    let saveBtn = saveButton();    
    items.forEach(item => {
        if (item.classList.contains('artist')) return;        
        item.innerHTML += saveBtn;
    });
    toggleSaveBtn(items);
}

function saveButton() {
    let button = `
    <div class="saveBtnWrapper">
        <i class='bx bx-heart'></i> 
    </div>
    `
    return button;
}

function toggleSaveBtn(items) {
    if (!items) return;
    items.forEach(item => {
        let heartIconWrapper = item.querySelector('.saveBtnWrapper');
        let heartIcon = heartIconWrapper.querySelector('i');
        if (!heartIconWrapper || !heartIcon) return;

        heartIconWrapper.addEventListener('click', () => {
            heartIcon.classList.toggle('bxs-heart');
        });
    })
}