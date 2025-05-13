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
    console.log(area);
    
    seeDOMChanges(area, (entry) => {
        console.log(entry, 'test');
        
        let items = entry.querySelectorAll('.item');
        if (!items) return;

        console.log(items);

    })
}