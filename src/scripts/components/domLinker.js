module.exports = {
  searchBar: document.querySelector('.navbar__searchbar'),
  resultsContainer: document.querySelector('.cards-container'),
  filtersContainer: document.querySelector('.filters-container'),

  ingredients: document.querySelector('.ingredients'),
  ingredientMainBtn: document.querySelector('.filter__btn--ingredient'),
  ingredientsIconBtn: document.getElementById('ingredients__iconBtn'),
  ingredientsList: document.querySelector('.ingredients__list'),
  ingredientsSearchBar: document.getElementById('ingredients__searchBar'),
  ingredientClosedBtn: document.querySelector('.filter.ingredients'),

  ustensiles: document.querySelector('.ustensiles'),
  ustensileMainBtn: document.querySelector('.filter__btn--ustensile'),
  ustensilesIconBtn: document.getElementById('ustensiles__iconBtn'),
  ustensilesList: document.querySelector('.ustensiles__list'),
  ustensilesSearchBar: document.querySelector('.ustensiles__searchBar'),
  ustensilesClosedBtn: document.querySelector('.filter.ustensiles'),

  appliances: document.querySelector('.appliances'),
  applianceMainBtn: document.querySelector('.filter__btn--appliance'),
  appliancesIconBtn: document.getElementById('appliances__iconBtn'),
  appliancesList: document.querySelector('.appliances__list'),
  appliancesSearchBar: document.querySelector('.appliances__searchBar'),
  appliancesClosedBtn: document.querySelector('.filter.appliances'),

  arrowIcon: document.querySelectorAll('.filter__btn > span'),
  tagsContainer: document.querySelector('.tags'),
  filterInputs: document.querySelectorAll('.filter-search')
}
