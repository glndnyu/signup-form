// Step 2: Attach event listeners
const form = document.getElementById('form');
form.addEventListener('blur', handleInput, true)
form.addEventListener('submit', handleSubmit);
let passwordCheck;

function handleInput(event) {
  const input = event.target;
  const errorElement = input.nextElementSibling;
  validateInput(input, errorElement)
}


// Step 3: Validate user input
function validateInput(input, errorElement) {
  
  if(input.type == 'submit') return;
  if(input.type == 'password' && input.value.trim() != '') {
    checkPassword(input);
    if(passwordCheck) return;
  } else if (input.validity.valueMissing) {
    showError(errorElement, 'This field is required.');
  } else if (input.validity.typeMismatch) {
    showError(errorElement, 'Invalid email format.');
  } else if (input.validity.patternMismatch) {
      showError(errorElement, 'Invalid phone pattern. Number format - All digits and (XXX-XXXX-XXXX)');
  } else {
    hideError(errorElement);
    input.removeEventListener('input', handleInput, true)
    return;
  }
  
  input.addEventListener('input', handleInput, true)
}

function checkPassword(input) {
  const password = Array.from(document.querySelectorAll("input[type='password']"));
  const errorElement = input.nextElementSibling;
  const value = input.value.trim();
  const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

  if(input.id == 'confirm-password'){
    if(password[0].value.trim() != value){
      showError(errorElement, 'Password doesn\'t match');
      passwordCheck = false;
    } else {
      hideError(errorElement);
      input.removeEventListener('input', handleInput, true);
      passwordCheck = true;
    }
    return;
  }
  if(!passRegEx.test(value)){
    showError(errorElement, 'Password format: 8 - 12 characters, at least one small letter, capital letter, special character and number');
    passwordCheck = false;
  } else {
    hideError(errorElement);
    input.removeEventListener('input', handleInput, true);
    passwordCheck = true;
  }
  if (value != password[1].value.trim() && password[1].value.trim() != ''){
    showError(password[1].nextElementSibling, 'Password doesn\'t match');
    password[1].addEventListener('input', handleInput, true);
  } else {
    hideError(password[1].nextElementSibling);
    password[1].removeEventListener('input', handleInput, true);
  }
  return;
}

// Step 4: Display validation feedback
function showError(errorElement, errorMessage) {
  errorElement.textContent = errorMessage;
  errorElement.classList.add('show');
}

function hideError(errorElement) {
  errorElement.textContent = '';
  errorElement.classList.remove('show');
}

// Step 5: Handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent form submission

  const inputs = form.querySelectorAll('input');
  let hasErrors = false;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const errorElement = input.nextElementSibling;
    validateInput(input, errorElement);

    if (!input.validity.valid) {
      showError(errorElement, 'Please fill in the required field.');
      hasErrors = true;
    }
  }

  if (!hasErrors) {
    form.submit();
  }
}