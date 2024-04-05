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
    document.querySelector(`.${inputField.name}-error-msg`).classList.remove('error-msg--visible')
  });

});


function formValidation() {
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value);
  const validPassword = userPassword.value.length >= 6;

  if (!validEmail) {
    document.querySelector(`.email-error-msg`).innerHTML = 'Enter a valid Email.';
    document.querySelector(`.email-error-msg`).classList.add('error-msg--visible')
  }
  if (!validPassword) {
    document.querySelector(`.password-error-msg`).innerHTML = 'Must be at least 6 characters.';
    document.querySelector(`.password-error-msg`).classList.add('error-msg--visible')
  }

  return validEmail && validPassword;
}

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (formValidation()) {
    const userEmail = document.querySelector('#email-el').value;
    const userPassword = document.querySelector('#password-el').value;
  
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    
    var formdata = new FormData();
    formdata.append("email", userEmail);
    formdata.append("password", userPassword);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://blog.ammarelgendy.online/api/login", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

});