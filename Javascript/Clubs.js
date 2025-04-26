document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', function() {
      const clubContainer = this.closest('.club-container');
      const clubName = clubContainer.dataset.club;
      addToFavorites(clubName);
    });
  });

  document.querySelectorAll('.blacklist-btn').forEach(button => {
    button.addEventListener('click', function() {
      const clubContainer = this.closest('.club-container');
      const clubName = clubContainer.dataset.club;
      addToBlacklist(clubName);
    });
  });

  function addToFavorites(clubName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(clubName)) {
      favorites.push(clubName);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(clubName + ' toegevoegd aan favorieten!');
    }
  }

  function addToBlacklist(clubName) {
    let blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];
    if (!blacklist.includes(clubName)) {
      blacklist.push(clubName);
      localStorage.setItem('blacklist', JSON.stringify(blacklist));
      alert(clubName + ' toegevoegd aan blacklist!');
    }
  }
});

//sahbcxhjcas
/*document.addEventListener('DOMContentLoaded', () => {
  const backButton = document.getElementById('backButton') as HTMLButtonElement | null;
  if (backButton) {
    backButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  document.querySelectorAll<HTMLButtonElement>('.favorite-btn').forEach(button => {
    button.addEventListener('click', function () {
      const clubContainer = (this as HTMLElement).closest('.club-container') as HTMLElement | null;
      const clubName = clubContainer?.dataset.club;
      if (clubName) {
        addToFavorites(clubName);
      }
    });
  });

  document.querySelectorAll<HTMLButtonElement>('.blacklist-btn').forEach(button => {
    button.addEventListener('click', function () {
      const clubContainer = (this as HTMLElement).closest('.club-container') as HTMLElement | null;
      const clubName = clubContainer?.dataset.club;
      if (clubName) {
        addToBlacklist(clubName);
      }
    });
  });

  function addToFavorites(clubName: string): void {
    const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(clubName)) {
      favorites.push(clubName);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${clubName} toegevoegd aan favorieten!`);
    }
  }

  function addToBlacklist(clubName: string): void {
    const blacklist: string[] = JSON.parse(localStorage.getItem('blacklist') || '[]');
    if (!blacklist.includes(clubName)) {
      blacklist.push(clubName);
      localStorage.setItem('blacklist', JSON.stringify(blacklist));
      alert(`${clubName} toegevoegd aan blacklist!`);
    }
  }
});
*/