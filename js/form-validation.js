const inputFields = document.querySelectorAll('.input-field');
const submitBtn = document.querySelector('#submit-btn');

submitBtn.addEventListener('click', (e) => {
  // e.preventDefault();

  inputFields.forEach((field) => {
  
  // Remove Error when typing
  field.addEventListener('input', () => {
    if (field.classList.contains('input-field--error')) {
      field.classList.remove('input-field--error');
    }
  })

  // Add Error if field is empty
  if (!field.value) {
    field.classList.add('input-field--error');
  }
  });
});

