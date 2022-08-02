/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
const api = require('../components/api')
const { isIncluded } = require('../components/search')
const state = require('../components/state')
const { emptyDOM, toggleList, noResult } = require('../components/dom')
const domLinker = require('../components/domLinker')
const { createRecipeCard } = require('../factories/recipe')
const { createFilters } = require('../factories/filters')
const filterModel = createFilters()

const logData = async () => {
  state.allRecipes = await api.getAllRecipes()
  console.log(state.allRecipes)
}
logData()

const afficheRecettes = async (value, tags) => {
  await api.getRecipes(value, tags)
}

const allRecipes = async () => {
  state.allRecipes = await api.getAllRecipes()
  displayRecipe(state.allRecipes)
  displayAllLists(state.allRecipes)
}

const searchedRecipes = async (value) => {
  await api.getSearchedRecipes(value)
  displayRecipe(state.newResult)
  displayAllLists(state.newResult)
  if (state.newResult.length === 0) {
    noResult(domLinker.resultsContainer, 'Aucune recette ne correspond à votre recherche')
    noResult(domLinker.appareilsList, 'Aucun résultat')
    noResult(domLinker.ustensilesList, 'Aucun résultat')
    noResult(domLinker.ingredientsList, 'Aucun résultat')
  }
  console.log('NewResult (searchBar):', state.newResult)
}

const displayRecipe = (data) => {
  emptyDOM(domLinker.resultsContainer)
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}

window.onload = allRecipes()

domLinker.searchBar.addEventListener('input', (e) => {
  const inputValue = e.target.value
  afficheRecettes(inputValue, state.tags.ingredient)
  if (state.tags.ingredient.length === 0 && state.tags.appliance.length === 0 && state.tags.ustensil.length === 0) {
    inputValue.length >= 3 ? searchedRecipes(inputValue) : allRecipes()
  } else if (state.tags.appliance.length > 0 || state.tags.ingredient.length > 0 || state.tags.ustensil.length > 0) {
    console.log('il y a un tag')
  }
})

const displayIngList = (data) => {
  emptyDOM(domLinker.ingredientsList)
  state.allIngredients = []
  filterModel.getAllIngredients(data)
  filterModel.createFilterListDOM(state.allIngredients, domLinker.ingredientsList, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li')
}
const displayAppList = (data) => {
  emptyDOM(domLinker.appareilsList)
  state.allAppareils = []
  filterModel.getAppareilsList(data)
  filterModel.createFilterListDOM(state.allAppareils, domLinker.appareilsList, state.tags.appliance, state.tagAppList, '.appareils__list>ul>li')
}
const displayUstList = (data) => {
  emptyDOM(domLinker.ustensilesList)
  state.allUstensils = []
  filterModel.getUstensilsList(data)
  filterModel.createFilterListDOM(state.allUstensils, domLinker.ustensilesList, state.tags.ustensil, state.tagUstList, '.ustensiles__list>ul>li')
}

const displayAllLists = (data) => {
  displayIngList(data)
  displayAppList(data)
  displayUstList(data)
}

domLinker.ingredientsIconBtn.addEventListener('click', () => {
  toggleList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'ingrédient', 'Ingrédients') 
  domLinker.searchBar.value.length < 3 ? displayIngList(state.allRecipes) : displayIngList(state.newResult)
  if (domLinker.searchBar.value.length >= 3 && state.newResult.length === 0) {
    noResult(domLinker.ingredientsList, 'Aucun résultat')
  }
  filtersSearch()
})

domLinker.ustensilesIconBtn.addEventListener('click', () => {
  toggleList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'ustensile', 'Ustensiles')
  domLinker.searchBar.value.length < 3 ? displayUstList(state.allRecipes) : displayUstList(state.newResult)
  if (domLinker.searchBar.value.length >= 3 && state.newResult.length === 0) {
    noResult(domLinker.ustensilesList, 'Aucun résultat')
  }
  filtersSearch()
})

domLinker.appareilsIconBtn.addEventListener('click', () => {
  toggleList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'appareil', 'Appareils')
  domLinker.searchBar.value.length < 3 ? displayAppList(state.allRecipes) : displayAppList(state.newResult)
  if (domLinker.searchBar.value.length >= 3 && state.newResult.length === 0) {
    noResult(domLinker.appareilsList, 'Aucun résultat')
  }
  filtersSearch()
})

const tagSearch = (arr, value, container, tagList, btnList, selector) => {
  arr = arr.filter(item => isIncluded(item, value))
  emptyDOM(container)
  filterModel.createFilterListDOM(arr, container, tagList, btnList, selector)
  if (value.length >= 2 && arr.length === 0) {
    container.textContent = 'Aucun filtre'
  }
}

const filtersSearch = () => {
  domLinker.filterInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const inputValue = e.target.value
      switch (e.target.id) {
        case 'ingredients__searchBar':
          domLinker.searchBar.value.length < 3 ? filterModel.getAllIngredients(state.allRecipes) : filterModel.getAllIngredients(state.newResult)
          tagSearch(state.allIngredients, inputValue, domLinker.ingredientsList, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li')
          break
        case 'appareils__searchBar':
          domLinker.searchBar.value.length < 3 ? filterModel.getAppareilsList(state.allRecipes) : filterModel.getAppareilsList(state.newResult)
          tagSearch(state.allAppareils, inputValue, domLinker.appareilsList, state.tags.appliance, state.tagAppList, '.appareils__list>ul>li')
          state.allAppareils = []
          break
        case 'ustensiles__searchBar':
          domLinker.searchBar.value.length < 3 ? filterModel.getUstensilsList(state.allRecipes) : filterModel.getUstensilsList(state.newResult)
          tagSearch(state.allUstensils, inputValue, domLinker.ustensilesList, state.tags.ustensil, state.tagUstList, '.ustensiles__list>ul>li')
          state.allUstensils = []
          break
      }
    })
  })
}
