document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth > 500) {
        openCloseMenu()
    } else {
        var panel = document.querySelector('headerSidebar');
        
        panel.classList.toggle("closedMenu");
    }
});

export function openCloseMenu() {
    var icon = document.querySelector('#extendIcon i');
    if (!icon) return;

    icon.addEventListener('click', function () {
        var panel = document.querySelector('headerSidebar');
        
        panel.classList.toggle("closedMenu");
    })
}