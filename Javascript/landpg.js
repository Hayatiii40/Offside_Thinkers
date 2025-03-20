document.addEventListener('DOMContentLoaded', () => {
  let warning = document.querySelector('#warning');
  let warbut = document.querySelector('#warbut');
  let articles = document.querySelectorAll('.forbidden');

  warning.style.display = 'none';

  articles.forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      warning.style.display = 'flex';
    });
  });

  warbut.addEventListener('click', () => {
    warning.style.display = 'none';
  });
});
document.addEventListener('DOMContentLoaded', () => {
  let searchbar = document.querySelector('input');
  let projecten = document.querySelectorAll('a');
  let button = document.querySelector('button');

  button.addEventListener('click', () => {
    let tosearchproject = searchbar.value.toLowerCase();
    projecten.forEach((element) => {
      let teamName = element.textContent.toLowerCase();
      if (teamName.includes(tosearchproject) || tosearchproject === '') {
        element.style.display = 'flex';
      } else {
        element.style.display = 'none';
      }
    });
  });
});
