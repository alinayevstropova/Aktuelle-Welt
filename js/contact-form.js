document.querySelector('#submit').addEventListener('click', (event) => {
  event.preventDefault();
  sendForm();
});

function sendForm() {
  const newPath = 'thanks.html';

  // Get form inputs
  const emailInput = document.getElementById('email').value.trim();
  const phoneInput = document.getElementById('phone').value.trim();
  const nameInput = document.getElementById('name').value.trim();
  const surnameInput = document.getElementById('surname').value.trim();
  const questionInput = document.getElementById('question').value;

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;

  // Validate name
  if (!nameInput) {
    document.getElementById('name').classList.add('is-invalid');
    isValid = false;
  } else {
    document.getElementById('name').classList.remove('is-invalid');
  }

  // Validate surname
  if (!surnameInput) {
    document.getElementById('surname').classList.add('is-invalid');
    isValid = false;
  } else {
    document.getElementById('surname').classList.remove('is-invalid');
  }

  // Validate email
  if (!emailRegex.test(emailInput)) {
    document.getElementById('result').textContent = 'Bitte geben Sie eine gültige E-Mail ein.';
    isValid = false;
  } else {
    document.getElementById('result').textContent = '';
  }

  // Validate phone
  if (!phoneInput) {
    document.getElementById('phoneResult').textContent = 'Telefonnummer ist erforderlich.';
    isValid = false;
  } else {
    document.getElementById('phoneResult').textContent = '';
  }

  // Validate question
  if (!questionInput) {
    document.getElementById('questionResult').textContent = 'Bitte wählen Sie Ihre Frage aus.';
    isValid = false;
  } else {
    document.getElementById('questionResult').textContent = '';
  }

  // If all fields are valid, redirect
  if (isValid) {
    window.location.href = newPath;
  }
}

// Add input event listeners to clear errors
document.getElementById('name').addEventListener('input', () => {
  document.getElementById('name').classList.remove('is-invalid');
});

document.getElementById('surname').addEventListener('input', () => {
  document.getElementById('surname').classList.remove('is-invalid');
});

document.getElementById('email').addEventListener('input', () => {
  document.getElementById('result').textContent = '';
  document.getElementById('email').classList.remove('is-invalid');
});

document.getElementById('phone').addEventListener('input', () => {
  document.getElementById('phoneResult').textContent = '';
  document.getElementById('phone').classList.remove('is-invalid');
});

document.getElementById('question').addEventListener('change', () => {
  document.getElementById('questionResult').textContent = '';
});

// Ініціалізація intl-tel-input
const phoneInputField = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInputField, {
  initialCountry: "auto",
  geoIpLookup: (callback) => {
    // fetch('https://ipinfo.io?token=YOUR_IPINFO_TOKEN')
    //   .then((resp) => resp.json())
    //   .then((data) => callback(data.country))
    //   .catch(() => callback('us'));



  //   fetch('https://ipinfo.io?token=REPLACE_WITH_YOUR_TOKEN', { mode: 'no-cors' })
  // .then((resp) => resp.json())
  // .then((data) => callback(data.country))
  // .catch(() => callback('us'));

  fetch("http://ip-api.com/json/")
  .then((response) => response.json())
  .then((data) => {
    const countryCode = data.countryCode.toLowerCase();
    iti.setCountry(countryCode);
  })
  .catch(() => {
    iti.setCountry("us"); // Країна за замовчуванням у разі помилки
  });
  },
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Для перевірки валідності
});