import { lightboxVideos } from "../../lightboxVideos.js";

export function sidebarVideosHTML(result) {
  const videos = result.data.videos;
  let videosHTML = '';

  videos.forEach((video) => {
    videosHTML += `
      <div class="sidebar__card">
        <div class="video-thumbnail" data-video-url="${video.video_url}" data-video-title="${video.title.en}">
          <img src="assets/videos/thumbnails/Larry Nance Jr Recreate his dad's Iconic dunk.png" alt="image" class="video-thumbnail__image">
          <i class="fa-regular fa-circle-play video-thumbnail__play-icon"></i>
        </div>

        <div class="sidebar-card__details">
          <h3 class="sidebar-card__title card__title">${video.title.en}</h3>
          <p class="sidebar-card__date">${formatDate(video.date)}</p>
        </div>
      </div> <!-- ./sidebar-card -->
    `;
  });

  document.querySelector('.sidebar__cards').innerHTML = videosHTML;

  // Implement lightbox Functionality after appending element in HTML
  lightboxVideos();
}