const burgerIcon = document.querySelector('.sub-header__menu-bar');
const closeMenuIcon = document.querySelector('.sub-header-menu__close');
const burgerMenu = document.querySelector('.sub-header__menu');

// Show burgerIcon when clicking
burgerIcon.addEventListener('click', () => {
  burgerMenu.classList.add('show');
});

// Hide burgerIcon when clicking
closeMenuIcon.addEventListener('click', () => {
  burgerMenu.classList.remove('show');
});

