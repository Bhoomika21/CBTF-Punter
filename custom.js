document.addEventListener('DOMContentLoaded', function() {
  // const loginButton = document.querySelector('.login');
  // const popupContainer = document.getElementById('popup-container');
  // const popupClose = document.querySelector('.popup-close');

  // if (loginButton) {
  //   loginButton.addEventListener('click', () => {
  //     popupContainer.style.display = 'flex';
  //   });
  // }

  // if (popupClose) {
  //   popupClose.addEventListener('click', () => {
  //     popupContainer.style.display = 'none';
  //   });
  // }

  // window.addEventListener('click', (event) => {
  //   if (event.target === popupContainer) {
  //     popupContainer.style.display = 'none';
  //   }
  // });

  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
  });

  document.getElementById("showRegisterForm").addEventListener("click", function () {
    // Hide the login form
    const loginForm = document.getElementById("passwordLoginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm && registerForm) {
        loginForm.style.display = "none";      // Hide login
        registerForm.style.display = "block";  // Show register
    }
  });

});

