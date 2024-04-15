const slug = localStorage.getItem('slug');
const newsContainer = document.querySelector('.news .container');
const websiteLang = localStorage.getItem('lang');

var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://blog.ammarelgendy.online/api/new/${slug}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    const data = result.data

    // Change Title of the page to the news title
    document.title = data.title[websiteLang];

    newsContainer.innerHTML = `
      <p class="news__date">${formatDate(data.date)}</p>
      <h1 class="news__title">${data.title[websiteLang]}</h1>
      
      <div class="news__publisher-text">
        <p class="news__by-word">${websiteLang === 'en' ? 'By' : 'بواسطة'}</p>
        <p class="news__publisher">${data.publisher}</p>
      </div>

      <img src="${data.image_url}" alt="image" class="news__image" onerror="this.src='assets/images/placeholder.jpg'">

      <p class="news__body">${data.content[websiteLang]}</p>
    `;

    // Hide Loader from Page
    document.querySelector('.loader-container').style.display = 'none';
  })
  .catch(error => console.log('error', error));