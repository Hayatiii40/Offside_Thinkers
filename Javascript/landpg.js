document.addEventListener('DOMContentLoaded', () => {
  let warning = document.getElementById('warning');
  let warbut = document.getElementById('warbut');
  let articles = document.querySelectorAll('.forbidden');

  articles.forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      warning.classList.add('show'); 
    });
  });

  warbut.addEventListener('click', () => {
    warning.classList.remove('show'); 
  });

  
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