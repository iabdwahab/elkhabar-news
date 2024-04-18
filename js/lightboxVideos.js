const lightboxEl = document.querySelector('.lightbox')
const lightboxVideoEl = document.querySelector('.lightbox__video');
const lightboxTitleEl = document.querySelector('.lightbox__title');

document.querySelectorAll('.video-thumbnail').forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    showVideo('assets/videos/video-1.webm', 'Video');
  });
});

document.querySelectorAll('.sidebar-card__title').forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    showVideo('assets/videos/video-1.webm', 'Video');
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
  lightboxEl.classList.remove('lightbox--active');
}