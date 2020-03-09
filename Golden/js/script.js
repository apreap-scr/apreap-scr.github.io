//---------------< menu nav >------------------------------//

$(document).ready(function () {
    var menuButton = document.getElementById('menuButton');
    menuButton.addEventListener('click', function (e) {
        menuButton.classList.toggle('is-active');
        $("#header_menu").toggleClass('header-menu-active');
        e.preventDefault();
    });
});






