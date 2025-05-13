import { seeDOMChanges } from "./global";

var standardWrapper = document.getElementById('contentAndFooter');
let homeFeed = document.getElementById('homeFeed');
let recentSearched = document.getElementById('recentSearched');

document.addEventListener("DOMContentLoaded", function () {
    if (homeFeed) {
        standardWrapper = homeFeed;
    } else if (recentSearched) {
        standardWrapper = recentSearched;
    } else {
        return;
    }
    readNewItems(standardWrapper);
});

function readNewItems(area) {
    seeDOMChanges(area, (entry) => {        
        let items = entry.querySelectorAll('.item');
        if (!items || !items instanceof NodeList || items.length < 1) return;
        console.log(items);
        
    })
}