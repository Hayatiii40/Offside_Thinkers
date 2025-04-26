document.addEventListener('DOMContentLoaded', function() {
    const leaguesBtn = document.getElementById('leaguesBtn');
    const clubsBtn = document.getElementById('clubsBtn');
    const listsBtn = document.getElementById('listsBtn');
    
    leaguesBtn.addEventListener('click', function() {
        window.location.href = 'Leagues.html';
    });
    
    clubsBtn.addEventListener('click', function() {
        window.location.href = 'Clubs.html';
    });
    
    listsBtn.addEventListener('click', function() {
        window.location.href = 'Lists.html';
    });
    
    console.log('Club Manager application loaded');
});
//jhcjhcb

/*
document.addEventListener('DOMContentLoaded', () => {
    const leaguesBtn = document.getElementById('leaguesBtn') as HTMLButtonElement | null;
    const clubsBtn = document.getElementById('clubsBtn') as HTMLButtonElement | null;
    const listsBtn = document.getElementById('listsBtn') as HTMLButtonElement | null;
  
    if (leaguesBtn) {
      leaguesBtn.addEventListener('click', () => {
        window.location.href = 'Leagues.html';
      });
    }
  
    if (clubsBtn) {
      clubsBtn.addEventListener('click', () => {
        window.location.href = 'Clubs.html';
      });
    }
  
    if (listsBtn) {
      listsBtn.addEventListener('click', () => {
        window.location.href = 'Lists.html';
      });
    }
  
    console.log('Club Manager application loaded');
  });
*/  
