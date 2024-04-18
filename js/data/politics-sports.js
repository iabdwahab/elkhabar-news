
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

fetch(`https://blog.ammarelgendy.online/api/category/${pageCategory}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    // ############
    // Start Slider
    // ############
    const latestResult = result.data.latest;

    for (let i = 0; i < 3; i++) {
      const latestNews = latestResult[i];

      document.querySelector(`.slideshow__news-${i}`).innerHTML = `
        <img src="${latestNews.image_url}" alt="image" class="slideshow__image">
        <div class="slideshow__text">
          <p class="slideshow__date">${formatDate(latestNews.date)}</p>
          <p class="slideshow__publisher">${latestNews.publisher}</p>
          <h3 class="slideshow__title">${latestNews.title[websiteLang]}</h3>
          <p class="slideshow__description">${latestNews.content[websiteLang]}</p>
        </div>
      `;
    }
    // ############
    // End Slider
    // ############

    // ##############
    // Start Featured
    // ##############

    const featuredResult = result.data.featured;
    
    featuredSectionEl.innerHTML += `
      <a aria-label="label" href="news.html" class="news-image-container" onclick="localStorage.setItem('slug', '${featuredResult.slug}')">
        <img src="${featuredResult.image_url}" alt="image" class="featured__image news-image" onerror="this.src='assets/images/placeholder.jpg'">
      </a>
      <a aria-label="label" href="news.html" onclick="localStorage.setItem('slug', '${featuredResult.slug}')">
        <h3 class="featured__title card__title">${featuredResult.title[websiteLang]}</h3>
      </a>
      <p class="featured__publisher">${featuredResult.publisher}</p>
      <p class="featured__description">${featuredResult.content[websiteLang]}</p>
      <p class="featured__date">${formatDate(featuredResult.date)}</p>
    
    `

    // ##############
    // End Featured
    // ##############


    // #########
    // Start content Cards
    // #########
    const normalResult = result.data.normal;
    let normalNewsHTML = '';

    for (let i = 0; i < normalResult.length; i++) {
      const normalNews = normalResult[i];

      normalNewsHTML += `
      <div class="content__card">
        <a aria-label="label" href="news.html" class="news-image-container" onclick="localStorage.setItem('slug', '${normalNews.slug}')">
          <img src="${normalNews.image_url}" alt="image" class="card__image news-image" onerror="this.src='assets/images/placeholder.jpg'">
        </a>
        <a aria-label="label" href="news.html" onclick="localStorage.setItem('slug', '${normalNews.slug}')">
          <h3 class="card__title">${normalNews.title[websiteLang]}</h3>
        </a>
        <div class="card__info">
          <p class="card__publisher">${normalNews.publisher}</p>
          <p class="card__date">${formatDate(normalNews.date)}</p>
        </div>
        <p class="card__description">${normalNews.content[websiteLang]}</p>
      </div>
      `;
    }

    normalNewsContainer.innerHTML = normalNewsHTML;
    // #########
    // End content Cards
    // #########


    // Hide Loader from Page
    document.querySelector('.loader-container').style.display = 'none';
  })
  .catch(error => console.log('error', error));




const loadMoreBtn = document.querySelector('.load-more-btn');
let loadMorePageNumber = 1;

loadMoreBtn.addEventListener('click', (e) => {
  // Add Loader on [Load More] Button when fetching new data
  e.target.innerHTML = `<div class="load-more-btn__loader"></div>`

  loadMorePageNumber++;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://blog.ammarelgendy.online/api/blogs/${pageCategory}?page=${loadMorePageNumber}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      console.log(result);
      // Remove LoadMoreBtn when no data found
      if (loadMorePageNumber >= result.data.last_page) {
        loadMoreBtn.remove();
      }

      const loadedNews = result.data.data;

      let newsHTML = '';

      loadedNews.forEach((loadedNewsContent) => {

        newsHTML += `
        <div class="content__card">
          <a aria-label="label" href="news.html" class="news-image-container" onclick="localStorage.setItem('slug', '${loadedNewsContent.slug}')">
            <img src="${loadedNewsContent.image_url}" alt="image" class="card__image news-image" onerror="this.src='assets/images/placeholder.jpg'">
          </a>
          <a aria-label="label" href="news.html" class="news-image-container" onclick="localStorage.setItem('slug', '${loadedNewsContent.slug}')">
            <h3 class="card__title">${loadedNewsContent.title[websiteLang]}</h3>
          </a>
          <div class="card__info">
            <p class="card__publisher">${loadedNewsContent.publisher}</p>
            <p class="card__date">${formatDate(loadedNewsContent.date)}</p>
          </div>
          <p class="card__description">${loadedNewsContent.content[websiteLang]}</p>
        </div>
        `
        
      });

      console.log(news)

      normalNewsContainer.innerHTML += newsHTML;

      // Delete Loader on [Load More] Button when fetching new data
      e.target.innerHTML = `Load More`;
    })
    .catch(error => console.log('error', error));
})