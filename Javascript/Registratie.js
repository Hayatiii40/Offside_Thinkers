document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('Formulier')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Voorkom standaard verzending

      let username = document.getElementById('username').value.trim();
      let password = document.getElementById('Password').value.trim();

      if (username === '' || password === '') {
        alert('Vul alle velden in!');
      } else {
        alert('Succesvol ingelogd!');
        window.location.href = 'Menupagina.html'; // Verwijs door na login
      }
    });
});
