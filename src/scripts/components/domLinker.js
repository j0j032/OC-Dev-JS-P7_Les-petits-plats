module.exports = {
  searchBar: document.querySelector('.navbar__searchbar'),
  resultsContainer: document.querySelector('.cards-container'),
  filtersContainer: document.querySelector('.filters-container'),

  ingredients: document.querySelector('.ingredients'),
  ingredientMainBtn: document.querySelector('.filter__btn--ingredient'),
  ingredientsIconBtn: document.getElementById('ingredients__iconBtn'),
  ingredientsList: document.querySelector('.ingredients__list'),
  ingredientsSearchBar: document.querySelector('.ingredients__searchBar'),

  ustensiles: document.querySelector('.ustensiles'),
  ustensileMainBtn: document.querySelector('.filter__btn--ustensile'),
  ustensilesIconBtn: document.getElementById('ustensiles__iconBtn'),
  ustensilesList: document.querySelector('.ustensiles__list'),
  ustensilesSearchBar: document.querySelector('.ustensiles__searchBar'),

  appareils: document.querySelector('.appareils'),
  appareilMainBtn: document.querySelector('.filter__btn--appareil'),
  appareilsIconBtn: document.getElementById('appareils__iconBtn'),
  appareilsList: document.querySelector('.appareils__list'),
  appareilsSearchBar: document.querySelector('.appareils__searchBar'),

  arrowIcon: document.querySelectorAll('.filter__btn > span'),
  listUl: document.querySelector('.list-X'),
  tagsContainer: document.querySelector('.tags')
}
