const burgerIcon = document.querySelector('.sub-header__menu-bar');
const closeMenuIcon = document.querySelector('.sub-header-menu__close');
const burgerMenu = document.querySelector('.sub-header__menu');

burgerIcon.addEventListener('click', () => {
  showNavMenu()
});

closeMenuIcon.addEventListener('click', () => {
  hideNavMenu()
});

function showNavMenu() {
  burgerMenu.classList.add('show');
}

function hideNavMenu() {
  burgerMenu.classList.remove('show');
}