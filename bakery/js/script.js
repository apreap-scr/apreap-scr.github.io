

(function () {
    var menuButton = document.getElementById('menuButton');
    var nav_menu = document.getElementById('nav_menu');
    menuButton.addEventListener('click', function (e) {
        menuButton.classList.toggle('is-active');
        nav_menu.classList.toggle('nav_menu-active');
        e.preventDefault();
    });
}());


