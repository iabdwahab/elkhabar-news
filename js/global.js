// Login Check
if (localStorage.getItem('userInfo')) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userFullName = `${userInfo.first_name} ${userInfo.last_name}`;
  document.querySelector('.sub-header__username').innerHTML = userFullName;

  document.querySelector('.sub-header__user-elements').classList.add('logged-in');
}

// Logout Function
document.querySelector('.sub-header__logout-btn').addEventListener('click', () => {
  localStorage.clear('userInfo');
  document.querySelector('.sub-header__user-elements').classList.remove('logged-in');
})



// Mobile BurgerMenu Function
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

