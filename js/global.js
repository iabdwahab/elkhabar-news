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

// Formatting Date
function formatDate(date) {
  const websiteLang = localStorage.getItem('lang') || 'en';

  splittedDate = date.slice(0, 10).split('-');

  const year = splittedDate[0];
  const monthNumber = splittedDate[1];
  const day = splittedDate[2];

  let monthsName;

  if (websiteLang === 'ar') {
    monthsName = {
      "01": "يناير",
      "02": "فبراير",
      "03": "مارس",
      "04": "أبريل",
      "05": "مايو",
      "06": "يونية",
      "07": "يوليو",
      "08": "أغسطس",
      "09": "سبتمبر",
      "10": "أكتوبر",
      "11": "نوفمبر",
      "12": "ديسمبر"
    }

    return `${Number(day)} ${monthsName[monthNumber]} ${year}`;
  } 


  // If websiteLang === English:
  monthsName = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
  }

  // 1st || 2nd || 3rd || 4th || 5th ...
  let dayPostfix;

  if (+day === 1) {
    dayPostfix = 'st';

  } else if (+day === 2) {
    dayPostfix = 'nd';
  
  } else if (+day === 3) {
    dayPostfix = 'rd';
  
  } else {
    dayPostfix = 'th';
  }

  return `${Number(day)}${dayPostfix} ${monthsName[monthNumber]} ${year}`;
}