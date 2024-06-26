const sliderBtns = document.querySelectorAll('.slider__btn');
const slideshowElements = document.querySelectorAll('.slideshow__news'); 

sliderBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {

    // Change active slider btn
    removeClassName(sliderBtns, 'slider__btn--active'); // Was decalred on [global.js] file => line 42.
    btn.classList.add('slider__btn--active');

    // Change active slider news
    removeClassName(slideshowElements, 'slideshow__news--displayed'); // Was decalred on [global.js] file => line 42.
    document.querySelector(`.slideshow__news-${index}`).classList.add('slideshow__news--displayed');
  });
});

let sliderNumber = 0;

setInterval(() => {
  if (sliderNumber >= 2) {
    sliderNumber = 0;
  } else {
    sliderNumber++;
  }
  
  removeClassName(slideshowElements, 'slideshow__news--displayed')
  document.querySelector(`.slideshow__news-${sliderNumber}`).classList.add('slideshow__news--displayed');

  removeClassName(sliderBtns, 'slider__btn--active');

  sliderBtns[sliderNumber].classList.add('slider__btn--active');

}, 2000);

function removeClassName(elements, className) {
  elements.forEach(el => {
    el.classList.remove(className);
  })
}