/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
const api = require('../components/api')
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
  inputValue.length >= 3 ? searchedRecipes(inputValue) : allRecipes()
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
})

domLinker.ustensilesIconBtn.addEventListener('click', () => {
  toggleList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'ustensile', 'Ustensiles')
  domLinker.searchBar.value.length < 3 ? displayUstList(state.allRecipes) : displayUstList(state.newResult)
  if (domLinker.searchBar.value.length >= 3 && state.newResult.length === 0) {
    noResult(domLinker.ustensilesList, 'Aucun résultat')
  }
})

domLinker.appareilsIconBtn.addEventListener('click', () => {
  toggleList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'appareil', 'Appareils')
  domLinker.searchBar.value.length < 3 ? displayAppList(state.allRecipes) : displayAppList(state.newResult)
  if (domLinker.searchBar.value.length >= 3 && state.newResult.length === 0) {
    noResult(domLinker.appareilsList, 'Aucun résultat')
  }
})
