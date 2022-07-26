module.exports = {
  searchBar: document.querySelector('.navbar__searchbar'),
  resultsContainer: document.querySelector('.cards-container'),
  filtersContainer: document.querySelector('.filters-container'),

  ingredients: document.querySelector('.ingredients'),
  ingredientMainBtn: document.querySelector('.filter__btn--ingredient'),
  ingredientsIconBtn: document.getElementById('ingredients__iconBtn'),
  ingredientsList: document.querySelector('.ingredients__list'),
  ingredientsListUl: document.querySelector('.ingredients__list > ul'),
  ingredientsSearchBar: document.getElementById('ingredients__searchBar'),
  ingredientClosedBtn: document.querySelector('.filter.ingredients'),

  ustensiles: document.querySelector('.ustensiles'),
  ustensileMainBtn: document.querySelector('.filter__btn--ustensile'),
  ustensilesIconBtn: document.getElementById('ustensiles__iconBtn'),
  ustensilesList: document.querySelector('.ustensiles__list'),
  ustensilesSearchBar: document.querySelector('.ustensiles__searchBar'),
  ustensilesClosedBtn: document.querySelector('.filter.ustensiles'),

  appareils: document.querySelector('.appareils'),
  appareilMainBtn: document.querySelector('.filter__btn--appareil'),
  appareilsIconBtn: document.getElementById('appareils__iconBtn'),
  appareilsList: document.querySelector('.appareils__list'),
  appareilsSearchBar: document.querySelector('.appareils__searchBar'),
  appareilsClosedBtn: document.querySelector('.filter.appareils'),

  arrowIcon: document.querySelectorAll('.filter__btn > span'),
  tagsContainer: document.querySelector('.tags'),
  filterInputs: document.querySelectorAll('.filter-search')
}
