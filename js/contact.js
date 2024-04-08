const userFirstName = document.querySelector('#first-name-el');
const userLastName = document.querySelector('#last-name-el');
const userEmail = document.querySelector('#email-el');
const userPhoneNumber = document.querySelector('#phone-el');
const userMessage = document.querySelector('#message-el');
const inputFields = document.querySelectorAll('input');


// Remove Errors When Typing [input]
inputFields.forEach(inputField => {
  inputField.addEventListener('input', () => {
    document.querySelector(`.${inputField.name}-error-msg`).classList.remove('error-msg--visible');
    inputField.classList.remove('input-field--error');
  });
  
});
// Remove Errors When Typing [textarea]
userMessage.addEventListener('input', () => {
  document.querySelector(`.message-error-msg`).classList.remove('error-msg--visible');
  userMessage.classList.remove('input-field--error');
});

function formValidation() {
  const websiteLanguage = localStorage.getItem('lang') || 'en';

  const errorsTranslations = {
    ar: {
      enter_valid_email: "أدخل بريدًا إلكترونيًا صحيحًا.",
      characters_3: "على الأقل 3 أحرف.",
      characters_11: "على الأقل 11 رقم",
      characters_40: "على الأقل 40 حرفًا."
    },
    en: {
      enter_valid_email: "Enter a valid Email.",
      characters_3: "Must be at least 3 characters.",
      characters_11: "Must be at least 11 number.",
      characters_40: "Must be at least 40 characters."
    }
  }

  const validFirstName = userFirstName.value.length >= 3;
  const validLastName = userFirstName.value.length >= 3;
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value);
  const validPhoneNumber = userPhoneNumber.value.length >= 11;
  const validMessage = userMessage.value.length >= 40;

  if (!validFirstName) {
    document.querySelector(`.first_name-error-msg`).innerHTML = errorsTranslations[websiteLanguage].characters_3;
    document.querySelector(`.first_name-error-msg`).classList.add('error-msg--visible');
    userFirstName.classList.add('input-field--error');
  }
  if (!validLastName) {
    document.querySelector(`.last_name-error-msg`).innerHTML = errorsTranslations[websiteLanguage].characters_3;
    document.querySelector(`.last_name-error-msg`).classList.add('error-msg--visible')
    userLastName.classList.add('input-field--error');
  }
  if (!validEmail) {
    document.querySelector(`.email-error-msg`).innerHTML = errorsTranslations[websiteLanguage].enter_valid_email;
    document.querySelector(`.email-error-msg`).classList.add('error-msg--visible')
    userEmail.classList.add('input-field--error');
  }
  if (!validPhoneNumber) {
    document.querySelector(`.tel-error-msg`).innerHTML = errorsTranslations[websiteLanguage].characters_11;
    document.querySelector(`.tel-error-msg`).classList.add('error-msg--visible');
    userPhoneNumber.classList.add('input-field--error');
  }
  if (!validMessage) {
    document.querySelector(`.message-error-msg`).innerHTML = errorsTranslations[websiteLanguage].characters_40;
    document.querySelector(`.message-error-msg`).classList.add('error-msg--visible')
    userMessage.classList.add('input-field--error');
  }


  return validFirstName && validLastName && validEmail;
}

const sendBtn = document.querySelector('#submit-btn');


sendBtn.addEventListener('click', e => {
  e.preventDefault();

  formValidation();
})