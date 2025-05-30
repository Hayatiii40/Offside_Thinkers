document.addEventListener('DOMContentLoaded', () => {
  let searchbar = document.querySelector('#searchbar');
  let teams = document.querySelectorAll('.team');
  let button = document.querySelector('#searchbutton');

  button.addEventListener('click', () => {
    let tosearchteam = searchbar.value.toLowerCase();
    teams.forEach((element) => {
      let teamName = element.textContent.toLowerCase();
      if (teamName.includes(tosearchteam) || tosearchteam === '') {
        element.style.display = 'flex';
      } else {
        element.style.display = 'none';
      }
    });
  });



fetch("/api/user/preferences", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(voorkeuren),
});

});
