export function lightboxVideos() {
  const lightboxEl = document.querySelector('.lightbox')
  const lightboxVideoEl = document.querySelector('.lightbox__video');
  const lightboxTitleEl = document.querySelector('.lightbox__title');
  
  document.querySelectorAll('.video-thumbnail').forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', (e) => {
      const videoDataset = document.querySelectorAll('.video-thumbnail')[index].dataset;
      showVideo(videoDataset.videoUrl, videoDataset.videoTitle);
    });
  });
  
  document.querySelectorAll('.sidebar-card__title').forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const videoDataset = document.querySelectorAll('.video-thumbnail')[index].dataset;
      showVideo(videoDataset.videoUrl, videoDataset.videoTitle);
    });
  });
  
  function showVideo(videoSrc, videoTitle) {
    lightboxVideoEl.src = videoSrc;
    lightboxTitleEl.innerHTML = videoTitle;
    lightboxEl.classList.add('lightbox--active');
  }
  
  document.querySelector('.lightbox__close-btn').addEventListener('click', hideLightbox);
  document.querySelector('.lightbox__overlay').addEventListener('click', () => {
    hideLightbox();
  })
  
  
  function hideLightbox() {
    lightboxVideoEl.pause()
    lightboxEl.classList.remove('lightbox--active');
  }
}