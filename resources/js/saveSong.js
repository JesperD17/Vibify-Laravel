import { seeDOMChanges } from "./global";

document.addEventListener("DOMContentLoaded", function () {
    readNewItems();
});

function readNewItems() {
    seeDOMChanges(() => {
        console.log('test');
        
    })
}