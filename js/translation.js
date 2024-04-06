const translations = {
  ar: {
    contact: "تواصل معنا",
    contact_us: "تواصل معنا",
    english: "english",
    arabic: "العربية",
    home: "الصفحة الرئيسية",
    politics: "السياسة",
    sports: "الرياضة",
    economy: "الاقتصاد",
    technology: "التكنولوجيا",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    google_ads: "إعلانات جوجل",
    view_more: "مشاهدة المزيد",
    videos: "الفيديوهات",
    categories: "الأقسام",
    find_us_in_social_media: "تابعنا على صفحات التواصل الاجتماعي",
    community: "المجتمع",
    ad: "إعلان",
    featured_news: "خبر مميز",
    latest_news: "آخر الأخبار",
    load_more: "تحميل المزيد"
  },
  en: {
    contact: "Contact",
    contact_us: "Contact Us",
    english: "English",
    arabic: "Arabic",
    home: "Home",
    politics: "Politics",
    sports: "Sports",
    economy: "Economy",
    technology: "Technology",
    login: "Login",
    logout: "Logout",
    google_ads: "Google Ads",
    view_more: "View More",
    videos: "Videos",
    categories: "Categories",
    find_us_in_social_media: "Find Us In Social Media",
    community: "Community",
    ad: "ad",
    featured_news: "Featured News",
    latest_news: "Latest News",
    load_more: "Load More"
  }
}

// window.addEventListener('load', () => {
  
  if (localStorage.getItem('lang')) {
    const defaultLang = localStorage.getItem('lang');
    changeLanguage(defaultLang);

    document.querySelector(`option[value=${defaultLang}]`).selected = true;

    if (defaultLang === 'ar') {
      document.dir = 'rtl';
    } else if (defaultLang === 'en') {
      document.dir = 'ltr';
    }
  }

// });


const langSwitcher = document.querySelector('#language-selector');

langSwitcher.addEventListener('change', () => {
  const selectedLang = langSwitcher.value;

  // Change Text Language Depending on user selected language
  changeLanguage(selectedLang);

  if (selectedLang === 'ar') {
    document.dir = 'rtl';
  } else if (selectedLang === 'en') {
    document.dir = 'ltr';
  }

  // Save Selected Language In LocalStorage
  localStorage.setItem('lang', selectedLang);
});


function changeLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate-name]');

  elements.forEach(el => {
    el.innerHTML = translations[lang][el.dataset.translateName];
  });

  // for (const property in translations[lang]) {
  //   const elements = document.querySelectorAll(`[data-translate-name="${property}"]`)
    
  //   if (elements.length) {
  //     elements.forEach(el => {
  //       el.innerHTML = translations[lang][property]
  //     });
  //   }
  // }
}
