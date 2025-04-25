document.addEventListener("DOMContentLoaded", function () {
    const textsObj = [
        { text: 'Are you sure you want to logout?' },
        { text: 'Are you sure you want to delete your account?' }
    ]

    const forms = document.querySelectorAll("form");
    if (!forms) return;

    forms.forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            closePopup();

            // buttons
            var buttonYes = document.querySelector('.yes-button');
            var buttonNo = document.querySelector('.no-button');

            var messageLength = Number(form.querySelector('button').getAttribute('id'));

            if (!buttonYes || !buttonNo) {                
                form.submit();
                return;
            }
            if (messageLength === 3) {
                loadingBeforeSubmit();
                form.submit();
                return;
            }

            document.querySelector('.popupBtns').style.display = null;

            var formWrapper = document.getElementById('avatarForm');
            if (!formWrapper) return;
            formWrapper.style.display = null;

            var confirmPopup = document.querySelector('.popupBackground');
            if (!confirmPopup) return;
            confirmPopup.style.display = "flex";

            var message = confirmPopup.querySelector('.popupMessage');
                        
            message.innerText = textsObj[messageLength - 1].text;

            buttonYes.addEventListener("click", function () {
                loadingBeforeSubmit()
                form.submit();
            })

            buttonNo.addEventListener("click", function () {
                confirmPopup.style.display = null;
            })
        });
    })
});