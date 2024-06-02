import { sidebarVideosHTML, adsHTML } from "./utils/appendingHTML.js";

const websiteLang = localStorage.getItem('lang') || 'en';

var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://blog.ammarelgendy.online/api/home", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    // Start Main News [First 4 news on the top of the page]
    const mainNewsList = result.data.main;
    let mainNewsHTML = ``;

    mainNewsList.forEach((mainNews, index) => {
      mainNewsHTML += `
        <a aria-label="label" href="news.html" class="hero-news hero-news-${index}" onclick="localStorage.setItem('slug', '${mainNews.slug}')">
          <img src="${mainNews.image_url}" alt="image" class="hero-news__image" onerror="this.src='assets/images/placeholder.jpg'">          
          <p class="hero-news__type">${mainNews.category.name}</p>
          <p class="hero-news__date">${formatDate(mainNews.date)}</p>
          <p class="hero-news__publisher">${mainNews.publisher}</p>
          <h3 class="hero-news__title">${mainNews.title[websiteLang]}</h3>
          <p class="hero-news__description">
            ${mainNews.content[websiteLang]}
          </p>
        </a>
      `;

      document.querySelector('.main-content__container').innerHTML = mainNewsHTML;
    });
    // End Main News [First 4 news on the top of the page]


    // Start Ads
    adsHTML(result, websiteLang);

    
    // Start Sections
    const resultContent = result.data.content; // Type: Object;

    for (const section in resultContent) {
      let conentCardsHTML = '';

      resultContent[section].forEach(sectionNews => {
        conentCardsHTML += `
        <div class="content__card">

          <a aria-label="label" href="news.html" class="news-image-container" onclick="localStorage.setItem('slug', '${sectionNews.slug}')">
            <img src="${sectionNews.image_url}" alt="image" class="card__image news-image" onerror="this.src='assets/images/placeholder.jpg'">
          </a>

          <a aria-label="label" href="news.html" onclick="localStorage.setItem('slug', '${sectionNews.slug}')">
            <h3 class="card__title">${sectionNews.title[websiteLang]}</h3>
          </a>

          <div class="card__info">
            <p class="card__publisher">${sectionNews.publisher}</p>
            <p class="card__date">${formatDate(sectionNews.date)}</p>
          </div>

          <p class="card__description">${sectionNews.content[websiteLang]}</p>
        </div>
        `;
      });

      document.querySelector(`.${section}__content-cards`).innerHTML = conentCardsHTML;
    }
    // End Sections

    // Sidebar Videos
    sidebarVideosHTML(result, websiteLang);
    
    // Hide Loader from Page when completing loading
    document.querySelector('.loader-container').style.display = 'none';
  })
  .catch(error => console.log('error', error));
