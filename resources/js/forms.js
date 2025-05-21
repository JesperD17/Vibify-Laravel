
// loading
export function loadingBeforeSubmit() {
    var loadingDiv = document.querySelector('.loaderWrapper');
    if (!loadingDiv) return;

    loadingDiv.style.display = 'flex';
}

export function submittedFormLoading() {
    var loadingDiv = document.querySelector('.loaderWrapper');
    if (!loadingDiv) return;

    loadingDiv.style.display = null; // Show loading
}

// popups
export function closePopup() {
    var popupbackground = document.querySelector('.popupBackground')
    if (!popupbackground) return;

    var popup = popupbackground.querySelector('.popupWrapper');
    if (!popup) return;

    popupbackground.addEventListener('click', function (e) {
        if (!popup.contains(e.target)) {
            popupbackground.style.display = null;
        }
    })
}

export function showChangeAvatarForm() {
    closePopup();

    var text = "Please select your new profile picture.";

    var formWrapper = document.getElementById('avatarForm');
    if (!formWrapper) return;
    formWrapper.style.display = "flex";

    var confirmPopup = document.querySelector('.popupBackground');
    if (!confirmPopup) return;
    confirmPopup.style.display = "flex";

    var btns = confirmPopup.querySelector('.popupBtns');
    btns.style.display = 'none';

    var message = confirmPopup.querySelector('.popupMessage');
    message.innerHTML = text;
}