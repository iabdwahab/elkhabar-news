const websiteLang = localStorage.getItem('lang') || 'en';

const mainContentContainer = document.querySelector('.main-content .container');
const contentSectionsContainer = document.querySelector('.content__sections');
const websiteSections = ['economy', 'latest', 'main', 'politics', 'sports', 'technology'];


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


    // #################
    // Start MainContent
    // #################
    const resultMain = result.data.main;
    let mainContentHTML = ``;

    resultMain.forEach((mainNews, index) => {
      mainContentHTML += `
        <a aria-label="label" href="#" class="hero-news hero-news-${index}">
          <img src="${mainNews.image_url}" alt="image" class="hero-news__image">
          <p class="hero-news__type">${mainNews.category.name}</p>
          <p class="hero-news__date">${formatDate(mainNews.date)}</p>
          <p class="hero-news__author">${mainNews.publisher}</p>
          <h3 class="hero-news__title">${mainNews.title[websiteLang]}</h3>
          <p class="hero-news__description">
            ${mainNews.content.en}
          </p>
        </a>
      `;

      mainContentContainer.innerHTML = mainContentHTML
    });
    // ###############
    // End MainContent
    // ###############



    // ##############
    // Start Sections
    // ##############
    const resultContent = result.data.content; // Type: Object;
    
    for (const section in resultContent) {
      let conentCardsHTML = '';

      resultContent[section].forEach(sectionNews => {
        conentCardsHTML += `
        <div class="content__card">
          <a aria-label="label" href="#">
            <img src="${sectionNews.image_url}" alt="image" class="card__image">
          </a>
          <a aria-label="label" href="#">
            <h3 class="card__title">${sectionNews.title[websiteLang]}</h3>
          </a>
          <div class="card__info">
            <p class="card__author">${sectionNews.publisher}</p>
            <p class="card__date">${formatDate(sectionNews.date)}</p>
          </div>
          <p class="card__description">${sectionNews.content[websiteLang]}</p>
        </div>
        `;
      });


      document.querySelector(`.${section}__content-cards`).innerHTML = conentCardsHTML;
    }



    // ##############
    // End Sections
    // ##############


    // Hide Loader from Page
    document.querySelector('.loader-container').style.display = 'none';
  })
  .catch(error => console.log('error', error));
