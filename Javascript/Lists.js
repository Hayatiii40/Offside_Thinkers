class ListManager {
    constructor() {
      this.initElements();
      this.bindEvents();
      this.loadLists();
    }
  
    initElements() {
      this.elements = {
        favoriteList: document.getElementById('favoriteList'),
        blacklist: document.getElementById('blacklist'),
        favoriteLeagues: document.getElementById('favoriteLeagues'),
        emptyFavorites: document.getElementById('emptyFavorites'),
        emptyBlacklist: document.getElementById('emptyBlacklist'),
        emptyLeagues: document.getElementById('emptyLeagues'),
        favoriteCount: document.getElementById('favoriteCount'),
        blacklistCount: document.getElementById('blacklistCount'),
        leagueCount: document.getElementById('leagueCount')
      };
    }
  
    bindEvents() {

      document.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.btn-remove') ||
                         (e.target.classList.contains('fa-times') ? e.target.parentElement : null);
        
        if (removeBtn) {
          this.handleRemoveClick(removeBtn);
        }
      });
    }
  
    handleRemoveClick(button) {
      const listItem = button.closest('.list-item');
      if (!listItem) return;
  
      const itemName = listItem.querySelector('.item-name').textContent;
      const listElement = listItem.parentElement; // ul 
      const listId = listElement.id;
  
      switch (listId) {
        case 'favoriteList':
          this.removeItem('favorites', itemName);
          break;
        case 'blacklist':
          this.removeItem('blacklist', itemName);
          break;
        case 'favoriteLeagues':
          this.removeItem('favoriteLeagues', itemName);
          break;
      }
    }
  
    loadLists() {
      const favorites = this.getFromStorage('favorites');
      const blacklist = this.getFromStorage('blacklist');
      const favoriteLeagues = this.getFromStorage('favoriteLeagues');
  
      this.updateCounts(favorites, blacklist, favoriteLeagues);
      this.renderLists(favorites, blacklist, favoriteLeagues);
    }
  
    getFromStorage(key) {
      try {
        return JSON.parse(localStorage.getItem(key)) || [];
      } catch (e) {
        console.error('LocalStorage read error:', e);
        return [];
      }
    }
  
    updateCounts(favorites, blacklist, favoriteLeagues) {
      this.elements.favoriteCount.textContent = favorites.length;
      this.elements.blacklistCount.textContent = blacklist.length;
      this.elements.leagueCount.textContent = favoriteLeagues.length;
    }
  
    renderLists(favorites, blacklist, favoriteLeagues) {
      this.renderList('favoriteList', 'emptyFavorites', favorites);
      this.renderList('blacklist', 'emptyBlacklist', blacklist);
      this.renderList('favoriteLeagues', 'emptyLeagues', favoriteLeagues);
    }
  
    renderList(listId, emptyId, items) {
      const listElement = this.elements[listId];
      const emptyElement = this.elements[emptyId];
  
      if (!listElement || !emptyElement) return;
  
      if (items.length > 0) {
        emptyElement.style.display = 'none';
        listElement.innerHTML = items.map(item => this.createListItem(item)).join('');
      } else {
        emptyElement.style.display = 'block';
        listElement.innerHTML = '';
      }
    }
  
    createListItem(item) {
      return `
        <li class="list-item">
          <span class="item-name">${item}</span>
          <button class="btn-remove" title="Verwijderen">
            <i class="fas fa-times"></i>
          </button>
        </li>
      `;
    }
  
    removeItem(listName, itemName) {
      try {
        const items = this.getFromStorage(listName);
        const updatedItems = items.filter(item => item !== itemName);
        localStorage.setItem(listName, JSON.stringify(updatedItems));
        this.loadLists(); 
        console.log(`${itemName} removed from ${listName}`);
      } catch (e) {
        console.error('Error while removing item:', e);
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new ListManager();
  });
  
  //nasbcsjdsjdbcdjsc
/*
  class ListManager {
    private elements: {
      favoriteList: HTMLElement | null;
      blacklist: HTMLElement | null;
      favoriteLeagues: HTMLElement | null;
      emptyFavorites: HTMLElement | null;
      emptyBlacklist: HTMLElement | null;
      emptyLeagues: HTMLElement | null;
      favoriteCount: HTMLElement | null;
      blacklistCount: HTMLElement | null;
      leagueCount: HTMLElement | null;
    };
  
    constructor() {
      this.initElements();
      this.bindEvents();
      this.loadLists();
    }
  
    private initElements(): void {
      this.elements = {
        favoriteList: document.getElementById('favoriteList'),
        blacklist: document.getElementById('blacklist'),
        favoriteLeagues: document.getElementById('favoriteLeagues'),
        emptyFavorites: document.getElementById('emptyFavorites'),
        emptyBlacklist: document.getElementById('emptyBlacklist'),
        emptyLeagues: document.getElementById('emptyLeagues'),
        favoriteCount: document.getElementById('favoriteCount'),
        blacklistCount: document.getElementById('blacklistCount'),
        leagueCount: document.getElementById('leagueCount')
      };
    }
  
    private bindEvents(): void {
      document.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const removeBtn = target.closest('.btn-remove') ||
                         (target.classList.contains('fa-times') ? target.parentElement : null);
        
        if (removeBtn) {
          this.handleRemoveClick(removeBtn as HTMLElement);
        }
      });
    }
  
    private handleRemoveClick(button: HTMLElement): void {
      const listItem = button.closest('.list-item');
      if (!listItem) return;
  
      const itemNameElement = listItem.querySelector('.item-name');
      const itemName = itemNameElement?.textContent?.trim();
      if (!itemName) return;
  
      const listElement = listItem.parentElement as HTMLElement;
      const listId = listElement.id;
  
      switch (listId) {
        case 'favoriteList':
          this.removeItem('favorites', itemName);
          break;
        case 'blacklist':
          this.removeItem('blacklist', itemName);
          break;
        case 'favoriteLeagues':
          this.removeItem('favoriteLeagues', itemName);
          break;
      }
    }
  
    private loadLists(): void {
      const favorites = this.getFromStorage('favorites');
      const blacklist = this.getFromStorage('blacklist');
      const favoriteLeagues = this.getFromStorage('favoriteLeagues');
  
      this.updateCounts(favorites, blacklist, favoriteLeagues);
      this.renderLists(favorites, blacklist, favoriteLeagues);
    }
  
    private getFromStorage(key: string): string[] {
      try {
        return JSON.parse(localStorage.getItem(key) || '[]');
      } catch (e) {
        console.error('LocalStorage read error:', e);
        return [];
      }
    }
  
    private updateCounts(favorites: string[], blacklist: string[], favoriteLeagues: string[]): void {
      if (this.elements.favoriteCount) {
        this.elements.favoriteCount.textContent = favorites.length.toString();
      }
      if (this.elements.blacklistCount) {
        this.elements.blacklistCount.textContent = blacklist.length.toString();
      }
      if (this.elements.leagueCount) {
        this.elements.leagueCount.textContent = favoriteLeagues.length.toString();
      }
    }
  
    private renderLists(favorites: string[], blacklist: string[], favoriteLeagues: string[]): void {
      this.renderList('favoriteList', 'emptyFavorites', favorites);
      this.renderList('blacklist', 'emptyBlacklist', blacklist);
      this.renderList('favoriteLeagues', 'emptyLeagues', favoriteLeagues);
    }
  
    private renderList(listId: keyof ListManager['elements'], emptyId: keyof ListManager['elements'], items: string[]): void {
      const listElement = this.elements[listId];
      const emptyElement = this.elements[emptyId];
  
      if (!listElement || !emptyElement) return;
  
      if (items.length > 0) {
        emptyElement.style.display = 'none';
        listElement.innerHTML = items.map(item => this.createListItem(item)).join('');
      } else {
        emptyElement.style.display = 'block';
        listElement.innerHTML = '';
      }
    }
  
    private createListItem(item: string): string {
      return `
        <li class="list-item">
          <span class="item-name">${item}</span>
          <button class="btn-remove" title="Verwijderen">
            <i class="fas fa-times"></i>
          </button>
        </li>
      `;
    }
  
    private removeItem(listName: string, itemName: string): void {
      try {
        const items = this.getFromStorage(listName);
        const updatedItems = items.filter(item => item !== itemName);
        localStorage.setItem(listName, JSON.stringify(updatedItems));
        this.loadLists();
        console.log(`${itemName} removed from ${listName}`);
      } catch (e) {
        console.error('Error while removing item:', e);
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new ListManager();
  });
*/  