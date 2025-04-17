document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        closePopup()
        
        // buttons
        var buttonYes = document.querySelector('.yes-button');
        var buttonNo = document.querySelector('.no-button');
        
        if (!buttonYes || !buttonNo) {
            form.submit();
            return;
        }        

        var confirmPopup = document.querySelector('.popupBackground');
        if (!confirmPopup) return;

        confirmPopup.style.display = "flex";

        buttonYes.addEventListener("click", function () {
            form.submit();
            loadingBeforeSubmit()
        })

        buttonNo.addEventListener("click", function () {
            confirmPopup.style.display = "none";
        })
    });
});
