import { lightboxVideos } from "../../lightboxVideos.js";

export function sidebarVideosHTML(result, websiteLang) {
  const videos = result.data.videos;
  let videosHTML = '';

  videos.forEach((video) => {
    videosHTML += `
      <div class="sidebar__card">
        <div class="video-thumbnail" data-video-url="${video.video_url}" data-video-title="${video.title[websiteLang] || video.title.en}">
          <img src="assets/videos/thumbnails/Larry Nance Jr Recreate his dad's Iconic dunk.png" alt="image" class="video-thumbnail__image">
          <i class="fa-regular fa-circle-play video-thumbnail__play-icon"></i>
        </div>

        <div class="sidebar-card__details">
          <h3 class="sidebar-card__title card__title">${video.title[websiteLang] || video.title.en}</h3>
          <p class="sidebar-card__date">${formatDate(video.date)}</p>
        </div>
      </div> <!-- ./sidebar-card -->
    `;
  });

  document.querySelector('.sidebar__cards').innerHTML = videosHTML;

  // Implement lightbox Functionality after appending element in HTML
  lightboxVideos();
}


export function adsHTML(result, websiteLang) {
  // Start Ads
  // Hero Ad
  const heroAd = result.data.ads[0];

  document.querySelector('.hero-ad-contaienr').innerHTML = `
    <h4 class="announcement__title" data-translate-name="google_announcement">${heroAd.title[websiteLang] || heroAd.title.en}</h4>
    <a href="${heroAd.link || '#'}">
      <img src="${heroAd.image_url}" alt="img" class="announcement__image hero-announcement__image">
    </a>
  `;


  // Sidebar Ad
  const sidebarAd = result.data.ads[1]
  document.querySelector('.sidebar-announcement').innerHTML = `
    <h4 class="announcement__title" data-translate-name="google_announcement">${sidebarAd.title[websiteLang] || sidebarAd.title.en}</h4>
    <a href="${sidebarAd.link || '#'}">
      <img src="${sidebarAd.image_url}" alt="img" class="announcement__image sidebar-announcement__image">
    </a>
  `;

}