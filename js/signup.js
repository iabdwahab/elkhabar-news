changePasswordVisibility();

function changePasswordVisibility() {
  const passwordElements = document.querySelectorAll('input[type="password"]');
  const hidePasswordBtns = document.querySelectorAll('.hide-password-btn');

  hidePasswordBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (passwordElements[index].type === 'password') {
        passwordElements[index].type = 'text';
      } else {
        passwordElements[index].type = 'password';
      }
    });
  });
};

const userFirstName = document.querySelector('#first-name-el');
const userLastName = document.querySelector('#last-name-el');
const userEmail = document.querySelector('#email-el');
const userPassword = document.querySelector('#password-el');
const userConfirmPassword = document.querySelector('#confirm-password-el');
const inputFields = document.querySelectorAll('input');
const signupBtn = document.querySelector('.log-btn');

inputFields.forEach(inputField => {

    inputField.addEventListener('input', () => {
      document.querySelector(`.${inputField.name}-error-msg`).classList.remove('error-msg--visible');
      inputField.classList.remove('input-field--error');
    })

});


function formValidation() {
  const websiteLanguage = localStorage.getItem('lang') || 'en';

  const errorsTranslations = {
    ar: {
      enter_valid_email: "أدخل بريدًا إلكترونيًا صحيحًا.",
      password_6_chars: "يجب أن تتكون كلمة السر من 6 أحرف على الأقل.",
      characters_3: "على الأقل 3 أحرف.",
      same_passwords: "يجب تطابق كلمتي السر."
    },
    en: {
      enter_valid_email: "Enter a valid Email.",
      password_6_chars: "Password must be at least 6 characters.",
      characters_3: "Must be at least 3 characters.",
      same_passwords: "Passwords must be the same."
    }
  }

  const validFirstName = userFirstName.value.length >= 3;
  const validLastName = userFirstName.value.length >= 3;
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value);
  const validPassword = userPassword.value.length >= 6;
  const validPasswordConfirm = userConfirmPassword.value === userPassword.value;

  if (!validFirstName) {
    document.querySelector(`.first_name-error-msg`).innerHTML = errorsTranslations[websiteLanguage].characters_3;
    document.querySelector(`.first_name-error-msg`).classList.add('error-msg--visible')
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
  if (!validPassword) {
    document.querySelector(`.password-error-msg`).innerHTML = errorsTranslations[websiteLanguage].password_6_chars;
    document.querySelector(`.password-error-msg`).classList.add('error-msg--visible')
    userPassword.classList.add('input-field--error');
  }
  if (!validPasswordConfirm) {
    document.querySelector(`.confirm_password-error-msg`).innerHTML = errorsTranslations[websiteLanguage].same_passwords;
    document.querySelector(`.confirm_password-error-msg`).classList.add('error-msg--visible')
    userConfirmPassword.classList.add('input-field--error');
  }

  return validFirstName && validLastName && validEmail && validPassword && validPasswordConfirm;
}


signupBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (formValidation()) {
    const userFirstName = document.querySelector('#first-name-el').value;
    const userLastName = document.querySelector('#last-name-el').value;
    const userEmail = document.querySelector('#email-el').value;
    const userPassword = document.querySelector('#password-el').value;
  
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
  
    var formdata = new FormData();
    formdata.append("first_name", userFirstName);
    formdata.append("last_name", userLastName);
    formdata.append("email", userEmail);
    formdata.append("password", userPassword);
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
  
    fetch("https://blog.ammarelgendy.online/api/register", requestOptions)
      .then(response => response.json())
      .then(result => {
  
        // If signup faild
        if (!result.success) {
          console.log(result)
          Object.keys(result.errors).forEach(error => {
            const errorText = result.errors[error][0]
            const erorredEl = document.querySelector(`.${error}-error-msg`);

            document.getElementsByName(error)[0].classList.add('input-field--error');

            erorredEl.innerHTML = errorText;
            erorredEl.classList.add('error-msg--visible');
          })
  
        }
  
      });
  }
});
