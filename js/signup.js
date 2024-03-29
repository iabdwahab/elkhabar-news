const errorMsgEl = document.querySelector('.error-msg');

// Password visiblitiy
changePasswordVisibility();


// <<<< Check password Confirming >>>>

// [submitBtn] was declared from [form-validation.js] file
// Note [signup.html] has an access to [form-validation.js] file
submitBtn.addEventListener('click', () => {
  if (passwordElements[0].value !== passwordElements[1].value) {
    passwordElements[1].classList.add('input-field--error');

    errorMsgEl.classList.add('error-msg--visible');
  }
});