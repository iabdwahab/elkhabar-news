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
      // document.querySelector(`.${inputField.name}-error-msg`).innerHTML = 'Must be at least 3 characters.';
      document.querySelector(`.${inputField.name}-error-msg`).classList.remove('error-msg--visible')
    })

});


function formValidation() {
  const validFirstName = userFirstName.value.length >= 3;
  const validLastName = userFirstName.value.length >= 3;
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail.value);
  const validPassword = userPassword.value.length >= 6;
  const validPasswordConfirm = userConfirmPassword.value === userPassword.value;

  if (!validFirstName) {
    document.querySelector(`.first_name-error-msg`).innerHTML = 'Must be at least 3 characters.';
    document.querySelector(`.first_name-error-msg`).classList.add('error-msg--visible')
  }
  if (!validLastName) {
    document.querySelector(`.last_name-error-msg`).innerHTML = 'Must be at least 3 characters.';
    document.querySelector(`.last_name-error-msg`).classList.add('error-msg--visible')
  }
  if (!validEmail) {
    document.querySelector(`.email-error-msg`).innerHTML = 'Enter a valid Email.';
    document.querySelector(`.email-error-msg`).classList.add('error-msg--visible')
  }
  if (!validPassword) {
    document.querySelector(`.password-error-msg`).innerHTML = 'Must be at least 6 characters.';
    document.querySelector(`.password-error-msg`).classList.add('error-msg--visible')
  }
  if (!validPasswordConfirm) {
    document.querySelector(`.confirm_password-error-msg`).innerHTML = 'Passwords must be the same.';
    document.querySelector(`.confirm_password-error-msg`).classList.add('error-msg--visible')
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
  
        console.log(result);
  
        // If signup faild
        if (!result.success) {
  
          Object.keys(result.errors).forEach(error => {
            const errorText = result.errors[error][0]
  
            document.getElementsByName(error)[0].classList.add('input-field--error');
            document.querySelector(`.${error}-error-msg`).innerHTML = errorText;
          })
  
        }
  
      });
  }
});
