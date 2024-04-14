
const pageCategory = document.querySelector('html').dataset.pageCategory;
const websiteLang = localStorage.getItem('lang') || 'en';

const featuredSectionEl = document.querySelector('.featured__section');
const latestCardsContainer = document.querySelector('.latest__cards');
const normalNewsContainer = document.querySelector('.section-news__container');


// Fetching Function
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

let normalNewsPageNum = 2;

fetch(`https://blog.ammarelgendy.online/api/category/${pageCategory}?page=2`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);


    // ##############
    // Start Featured
    // ##############

    const featuredResult = result.data.featured;
    
    featuredSectionEl.innerHTML = `
      <a aria-label="label" href="#">
        <img src="${featuredResult.image_url}" alt="image" class="featured-card__image">
      </a>
      <a aria-label="label" href="#">
        <h3 class="featured-card__title card__title">${featuredResult.title[websiteLang]}</h3>
      </a>
      <div class="featured-card__details">
        <p class="featured-card__author">${featuredResult.publisher}</p>
        <p class="featured-card__date">${formatDate(featuredResult.date)}</p>
      </div>
      <p class="featured-card__description">${featuredResult.content[websiteLang]}</p>
    
    `

    // ##############
    // End Featured
    // ##############



    // ############
    // Start Latest
    // ############
    const latestResult = result.data.latest;
    let latestHTML = '';

    for (let i = 0; i < 3; i++) {
      const latestNews = latestResult[i];

      latestHTML += `
        <div class="latest__card">
          <a aria-label="label" href="#" class="latest__image-link">
            <img src="${latestNews.image_url}" alt="image" class="latest__image">
          </a>
          
          <div class="latest-card__text">
            <a aria-label="label" href="#">
              <h3 class="latest__title card__title">${latestNews.title[websiteLang]}</h3>
            </a>
            <div class="latest__details">
              <p class="latest__author">${latestNews.publisher}</p>
              <p class="latest__date">${formatDate(latestNews.date)}</p>
            </div>
            <p class="latest__description">${latestNews.content[websiteLang]}</p>
          </div>
        </div>
      `;
    }

    latestCardsContainer.innerHTML = latestHTML;
    // ############
    // End Latest
    // ############


    // #########
    // Start content Cards
    // #########
    const normalResult = result.data.normal.data;
    let normalHTML = '';

    for (let i = 0; i < normalResult.length; i++) {
      const normalNews = normalResult[i];

      normalHTML += `
      <div class="content__card">
        <a aria-label="label" href="#">
          <img src="${normalNews.image_url}" alt="image" class="card__image" onerror="this.src='assets/images/placeholder.webp'">
        </a>
        <a aria-label="label" href="#">
          <h3 class="card__title">${normalNews.title[websiteLang]}</h3>
        </a>
        <div class="card__info">
          <p class="card__author">${normalNews.publisher}</p>
          <p class="card__date">${formatDate(normalNews.date)}</p>
        </div>
        <p class="card__description">${normalNews.content[websiteLang]}</p>
      </div>
      `;
    }

    normalNewsContainer.innerHTML = normalHTML;
    // #########
    // End content Cards
    // #########


    // Hide Loader from Page
    document.querySelector('.loader-container').style.display = 'none';
  })
  .catch(error => console.log('error', error));



