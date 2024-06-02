import { sidebarVideosHTML } from "./utils/appendingHTML.js";

const pageCategory = document.querySelector('html').dataset.pageCategory;
const websiteLang = localStorage.getItem('lang') || 'en';

const specialNewsContainer = document.querySelector('.special-section__container');

var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://blog.ammarelgendy.online/api/category/${pageCategory}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)



    // ####################
    // Start Featured Image
    // ####################
    const featuredResult = result.data.featured;
    
    document.querySelector('.featured__section').innerHTML += `
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
    // ####################
    // End Featured Image
    // ####################


    // ####################
    // Start Featured Video
    // ####################



    // ####################
    // End Featured Video
    // ####################



    
    // #################
    // Start Normal News
    // #################

    let normalResult = result.data.normal;
    let normalNewsHTML = '';

    for (let i = 0; i < 3; i++) {
      const normalNews = normalResult[i];

      normalNewsHTML += `
      <div class="content__card">
        <a aria-label="label" href="news.html" class="news-image-container" onclick="localStorage.setItem('slug', '${normalNews.slug}')">
          <img src="${normalNews.image_url}" alt="image" class="card__image news-image" onerror="this.src='assets/images/placeholder.jpg'">
        </a>
        <a aria-label="label" href="news.html" class="news-image-container" onclick="localStorage.setItem('slug', '${normalNews.slug}')">
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

    document.querySelector('.content__news').innerHTML = normalNewsHTML;

    // #################
    // End Normal News
    // #################


    // ##################
    // Start Special News
    // ##################

    let specialResut = result.data.normal;
    let specialNewsHTML = '';

    let specialCounter = 0;
    for (let i = 3; i < specialResut.length; i++) {
      const specialNews = specialResut[i];
      specialCounter++;
      
      specialNewsHTML += `
        <a href="news.html" class="special__card" onclick="localStorage.setItem('slug', '${specialNews.slug}')">
          <img src="${specialNews.image_url}" alt="image" class="special-card__image" onerror="this.src='assets/images/placeholder.jpg'">
          <div class="special-card__text">
            <p class="special-card__date">${formatDate(specialNews.date)}</p>
            <p class="special-card__publisher">${specialNews.publisher}</p>
            <h3 class="special-card__headline">${specialNews.title[websiteLang]}</h3>
            <p class="special-card__description">${specialNews.content[websiteLang]}</p>
          </div>
        </a>
      `;
    }

    specialNewsContainer.innerHTML = specialNewsHTML;
    // Make first News Large
    document.querySelector('.special__card').classList.add('special-card-top');

    // ##################
    // End Special News
    // ##################


    // ##################
    // Start Sidebar Videos
    // ##################
    sidebarVideosHTML(result);


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
      let loadedNewsHTML = '';

      loadedNews.forEach((loadedNewsContent) => {

        loadedNewsHTML += `
          <a href="news.html" class="special__card" onclick="localStorage.setItem('slug', '${loadedNewsContent.slug}')">
            <img src="${loadedNewsContent.image_url}" alt="image" class="special-card__image" onerror="this.src='assets/images/placeholder.jpg'">
            <div class="special-card__text">
              <p class="special-card__date">${formatDate(loadedNewsContent.date)}</p>
              <p class="special-card__publisher">${loadedNewsContent.publisher}</p>
              <h3 class="special-card__headline">${loadedNewsContent.title[websiteLang]}</h3>
              <p class="special-card__description">${loadedNewsContent.content[websiteLang]}</p>
            </div>
          </a>
        `
      });

      specialNewsContainer.innerHTML += loadedNewsHTML;

      // Delete Loader on [Load More] Button when fetching new data
      e.target.innerHTML = `Load More`;
    })
    .catch(error => console.log('error', error));
});