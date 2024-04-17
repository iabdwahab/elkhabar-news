if (localStorage.getItem('userInfo')) {
  window.location.href = './index.html';
}

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


const userEmail = document.querySelector('#email-el');
const userPassword = document.querySelector('#password-el');
const inputFields = document.querySelectorAll('input');
const loginBtn = document.querySelector('.log-btn');

inputFields.forEach(inputField => {

  inputField.addEventListener('input', () => {
    document.querySelector(`.${inputField.name}-error-msg`).classList.remove('error-msg--visible');
    inputField.classList.remove('input-field--error');
    document.querySelector('.log-error').classList.remove('log-error--visible');
  });

});


function formValidation() {
  const websiteLanguage = localStorage.getItem('lang') || 'en';

  const errorsTranslations = {
    ar: {
      enter_valid_email: "أدخل بريدًا إلكترونيًا صحيحًا.",
      password_6_chars: "يجب أن تتكون كلمة السر من 6 أحرف على الأقل.",
    },
    en: {
      enter_valid_email: "Enter a valid Email.",
      password_6_chars: "Password must be at least 6 characters.",
    }
  }

  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value);
  const validPassword = userPassword.value.length >= 6;

  if (!validEmail) {
    document.querySelector(`.email-error-msg`).innerHTML = errorsTranslations[websiteLanguage].enter_valid_email;
    document.querySelector(`.email-error-msg`).classList.add('error-msg--visible');
    userEmail.classList.add('input-field--error');
  }
  if (!validPassword) {
    document.querySelector(`.password-error-msg`).innerHTML = errorsTranslations[websiteLanguage].password_6_chars;
    document.querySelector(`.password-error-msg`).classList.add('error-msg--visible');
    userPassword.classList.add('input-field--error');
  }

  return validEmail && validPassword;
}

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();

    if (formValidation()) {
    const userEmailEl = document.querySelector('#email-el');
    const userPasswordEl = document.querySelector('#password-el');
  
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    
    var formdata = new FormData();
    formdata.append("email", userEmailEl.value);
    formdata.append("password", userPasswordEl.valuw);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://blog.ammarelgendy.online/api/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        if (result.success) {
          localStorage.setItem('userInfo', JSON.stringify(result.data));

          const userFirstName = result.data.first_name;
          const userLastName = result.data.last_name;

          document.querySelector('.sub-header__username').innerHTML = `${userFirstName} ${userLastName}`;

          document.querySelector('.sub-header__user-elements').classList.add('logged-in');

          // When signin success; browser will be in index.html
          window.location.href = ('./index.html');

        } else {

          document.querySelector('.log-error').classList.add('log-error--visible');
          userEmailEl.classList.add('input-field--error');
          userPasswordEl.classList.add('input-field--error');

        }
        
      })
      .catch(error => console.log('error', error));
    }
    
  });
