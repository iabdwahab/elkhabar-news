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
    load_more: "تحميل المزيد",
    password_6_characters: "كلمة السر يجب أن تتكون من 6 أحرف على الأقل.",
    email: "البريد الإلكتروني",
    password: "كلمة السر",
    forgot_password: "نسيت كلمة السر؟",
    enter_your_password: "أدخل كلمة السر",
    enter_your_email: "أدخل البريد الإلكتروني",
    new_user: "مستخدم جديد؟",
    signup: "سجل حسابك",
    login_to_your_account: "تسجيل الدخول إلى حسابك",
    enter_your_first_name: "أدخل اسمك الأول",
    enter_your_last_name: "أدخل اسمك الأخير",
    re_enter_your_password: "أعد كتابة كلمة السر",
    first_name: "الاسم الأول",
    last_name: "الاسم الأخير",
    signup_to_create_your_account: "سجل لإنشاء حسابك",
    already_member: "مستخدم حالي؟",
    confirm_password: "تأكيد كلمة السر"
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
    ad: "Ad",
    featured_news: "Featured News",
    latest_news: "Latest News",
    load_more: "Load More",
    password_6_characters: "The password field must be at least 6 characters.",
    email: "Email",
    password: "Password",
    forgot_password: "Forgot Password?",
    enter_your_password: "Enter your Password",
    enter_your_email: "Enter your Email",
    new_user: "New User?",
    signup: "Signup",
    login_to_your_account: "Login To Your Account",
    enter_your_first_name: "Enter your first name",
    enter_your_last_name: "Enter your last name",
    re_enter_your_password: "Re-Enter your password",
    first_name: "First Name",
    last_name: "Last Name",
    signup_to_create_your_account: "Singup To Create Your Account",
    already_member: "Already A Memebr?",
    confirm_password: "Confirm Password"

  }
}

window.addEventListener('load', () => {
  const defaultLang = localStorage.getItem('lang') || 'en';
  
    changeLanguage(defaultLang);

    document.querySelector(`option[value=${defaultLang}]`).selected = true;

    if (defaultLang === 'ar') {
      document.dir = 'rtl';
    } else if (defaultLang === 'en') {
      document.dir = 'ltr';
    }

});


const langSwitcher = document.querySelector('#language-selector');

langSwitcher.addEventListener('change', () => {
  const selectedLang = langSwitcher.value;

  // Save Selected Language In LocalStorage
  localStorage.setItem('lang', selectedLang);

  // Reload after changing language
  location.reload();
});


function changeLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate-name]');

  elements.forEach(el => {

    if (el.nodeName === 'INPUT') {

      if (el.type === 'submit') {
        el.value = translations[lang][el.dataset.translateName];
      } else {
        el.placeholder = translations[lang][el.dataset.translateName];
      }

    } else {
      el.innerHTML = translations[lang][el.dataset.translateName];
    }

  });


}
