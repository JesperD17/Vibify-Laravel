
// loading
function loadingBeforeSubmit() {
    var loadingDiv = document.querySelector('.loaderWrapper');
    
    if (!loadingDiv) return;
    
    loadingDiv.style.display = 'flex'; // Show loading
}

// popups
function closePopup() {
    var popupbackground = document.querySelector('.popupBackground')
    if (!popupbackground) return;
    
    var popup = popupbackground.querySelector('.popupWrapper');
    if (!popup) return;
    
    popupbackground.addEventListener('click', function (e) {
        if(!popup.contains(e.target)) {          
            popupbackground.style.display = "none";
        }
    })
}