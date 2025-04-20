document.addEventListener("DOMContentLoaded", function () {
    const textsObj = [
        { text: 'Are you sure you want to logout?' },
        { text: 'Are you sure you want to delete your account?' },
        { text: 'aaaa' }
    ]
    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
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

            var messageLength = Number(form.querySelector('button').getAttribute('id'));
            var message = confirmPopup.querySelector('.popupMessage');
                        
            message.innerText = textsObj[messageLength - 1].text;

            buttonYes.addEventListener("click", function () {
                form.submit();
                loadingBeforeSubmit()
            })

            buttonNo.addEventListener("click", function () {
                confirmPopup.style.display = "none";
            })
        });
    })
});