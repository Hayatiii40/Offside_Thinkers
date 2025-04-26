document.addEventListener('DOMContentLoaded', () => {
    const favoriteLeaguesKey = 'favoriteLeagues';
  
    function loadFavoriteLeagues() {
      const list = document.getElementById('favoriteLeaguesList');
      const favorites = JSON.parse(localStorage.getItem(favoriteLeaguesKey)) || [];
  
      list.innerHTML = favorites
        .map(
          league => `
          <li>
            ${league}
            <button onclick="removeFavoriteLeague('${league}')">Verwijder</button>
          </li>`
        )
        .join('');
    }
  
    window.removeFavoriteLeague = function (leagueName) {
      let favorites = JSON.parse(localStorage.getItem(favoriteLeaguesKey)) || [];
      favorites = favorites.filter(name => name !== leagueName);
      localStorage.setItem(favoriteLeaguesKey, JSON.stringify(favorites));
      loadFavoriteLeagues();
    };
  
    document.querySelectorAll('.add-favorite-btn').forEach(button => {
      button.addEventListener('click', () => {
        const leagueName = button.closest('.league-container').dataset.league;
        let favorites = JSON.parse(localStorage.getItem(favoriteLeaguesKey)) || [];
  
        if (!favorites.includes(leagueName)) {
          favorites.push(leagueName);
          localStorage.setItem(favoriteLeaguesKey, JSON.stringify(favorites));
          loadFavoriteLeagues();
        }
      });
    });
  
    loadFavoriteLeagues();
  });
  //jkdvnjkdfnv

  /*
  document.addEventListener('DOMContentLoaded', () => {
    const favoriteLeaguesKey = 'favoriteLeagues';
  
    function loadFavoriteLeagues(): void {
      const list = document.getElementById('favoriteLeaguesList') as HTMLUListElement | null;
      if (!list) return;
  
      const favorites: string[] = JSON.parse(localStorage.getItem(favoriteLeaguesKey) || '[]');
  
      list.innerHTML = favorites
        .map(
          (league) => `
          <li>
            ${league}
            <button onclick="removeFavoriteLeague('${league}')">Verwijder</button>
          </li>`
        )
        .join('');
    }
  
    // Remove function global tanımlı olacaksa window'a type eklemen lazım:
    (window as any).removeFavoriteLeague = function (leagueName: string): void {
      let favorites: string[] = JSON.parse(localStorage.getItem(favoriteLeaguesKey) || '[]');
      favorites = favorites.filter(name => name !== leagueName);
      localStorage.setItem(favoriteLeaguesKey, JSON.stringify(favorites));
      loadFavoriteLeagues();
    };
  
    document.querySelectorAll<HTMLButtonElement>('.add-favorite-btn').forEach(button => {
      button.addEventListener('click', () => {
        const leagueContainer = button.closest('.league-container') as HTMLElement | null;
        const leagueName = leagueContainer?.dataset.league;
        if (!leagueName) return;
  
        let favorites: string[] = JSON.parse(localStorage.getItem(favoriteLeaguesKey) || '[]');
  
        if (!favorites.includes(leagueName)) {
          favorites.push(leagueName);
          localStorage.setItem(favoriteLeaguesKey, JSON.stringify(favorites));
          loadFavoriteLeagues();
        }
      });
    });
  
    loadFavoriteLeagues();
  });
*/  