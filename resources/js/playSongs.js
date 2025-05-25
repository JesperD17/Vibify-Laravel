import { seeDOMChanges } from "./global";

var homeFeed = document.getElementById('homeFeed');
var searchFeed = document.getElementById('recentSearched');
var autoloadedItems = document.getElementById('pageLoadedItems');

var searchPage = [ searchFeed, autoloadedItems ]

document.addEventListener("DOMContentLoaded", function () {
    if (homeFeed) {
        readNewItems(homeFeed, { subtree: false });
    } else if (searchFeed) {
        readNewItems(searchFeed, { subtree: true });
        readNewItems(autoloadedItems, { subtree: false });
    }
});

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
            console.log(item);
            item.classList.toggle('playingSong')
        })
    });
}