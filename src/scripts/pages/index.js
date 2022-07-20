/* eslint-disable no-unused-expressions */
const api = require('../components/api')
const state = require('../components/state')
const { isIncluded, isFound, noResult, emptyDOM } = require('../components/dom')
const domLinker = require('../components/domLinker')
const { createRecipeCard } = require('../factories/recipe')
const { createFiltersList } = require('../factories/filters')
const { resultsContainer } = require('../components/domLinker')
const filterModel = createFiltersList()

const logRecipes = async () => {
  state.allRecipes = await api.getRecipes()
  console.log(state.allRecipes)
}
window.onload = logRecipes()

// Filters display
const displayAllFiltersList = async () => {
  const recipes = await api.getRecipes()
  filterModel.displayIngredientList(recipes)
  filterModel.displayAppareilsList(recipes)
  filterModel.displayUstensilsList(recipes)
}
window.onload = displayAllFiltersList()

const displayIngList = async () => {
  const recipes = await api.getRecipes()
  filterModel.displayIngredientList(recipes)
}
const displayAppList = async () => {
  const recipes = await api.getRecipes()
  filterModel.displayAppareilsList(recipes)
}
const displayUstList = async () => {
  const recipes = await api.getRecipes()
  filterModel.displayUstensilsList(recipes)
}

// List search
const filterSearch = (inputValue, array, container, inpuTarget, tagList, filterBtns, selector) => {
  console.log(state.tags)
  if (inputValue.length >= 3) {
    array = array.filter(item => isIncluded(item, inputValue))
    emptyDOM(container)
    filterModel.createFilterListDOM(array, container, tagList, filterBtns, selector)
    container.classList.add('onSearch')
  } else if (inputValue.length < 3) {
    emptyDOM(container)
    container.classList.remove('onSearch')
    array = []
    switch (inpuTarget) {
      case domLinker.ingredientsSearchBar:
        displayIngList()
        break
      case domLinker.appareilsSearchBar:
        displayAppList()
        break
      case domLinker.ustensilesSearchBar:
        displayUstList()
        break
    }
  }
  if (inputValue.length >= 3 && array.length === 0) {
    container.textContent = 'Aucun résultat'
  }
}

domLinker.ingredientsIconBtn.addEventListener('click', () => filterModel.toggleList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'ingrédient', 'Ingrédients'))

domLinker.ustensilesIconBtn.addEventListener('click', () => filterModel.toggleList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'ustensile', 'Ustensiles'))

domLinker.appareilsIconBtn.addEventListener('click', () => filterModel.toggleList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'appareil', 'Appareils'))

domLinker.ingredientsSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, state.allIngredients, domLinker.ingredientsList, e.target, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li'))

domLinker.appareilsSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, state.allAppareils, domLinker.appareilsList, e.target, state.tags.appliance, state.tagAppList, '.appareils__list>ul>li'))

domLinker.ustensilesSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, state.allUstensils, domLinker.ustensilesList, e.target, state.tags.ustensil, state.tagUstList, '.ustensiles__list>ul>li'))

// Display recipes

const displayRecipe = (data) => {
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    resultsContainer.appendChild(recipeCardDOM)
  })
}

const displayAllRecipes = async () => {
  state.allRecipes = await api.getRecipes()
  displayRecipe(state.allRecipes)
}
window.onload = displayAllRecipes()

const mainSearchBar = (search) => {
  if (state.tags.ingredient.length === 0 && state.tags.appliance.length === 0 && state.tags.ustensil.length === 0) {
    state.allRecipes = state.allRecipes.filter(recipe => isIncluded(recipe.name, search) || isIncluded(recipe.description, search) || isFound(recipe.ingredients, 'ingredient', search))
    displayRecipe(state.allRecipes)
    if (state.allRecipes.length <= 0) {
      noResult(resultsContainer)
    }
  } else if (state.tags.appliance.length > 0 || state.tags.ingredient.length > 0 || state.tags.ustensil.length > 0) {
    console.log('NewResult', state.newResult)
    const finalResult = state.newResult.filter(recipe => isIncluded(recipe.name, search) || isIncluded(recipe.description, search) || isFound(recipe.ingredients, 'ingredient', search))
    displayRecipe(finalResult)
    console.log('finalResult', finalResult)
    if (finalResult.length === 0) {
      noResult(resultsContainer)
    }
  }
}

domLinker.searchBar.addEventListener('input', e => {
  if (e.target.value.length >= 3) {
    emptyDOM(resultsContainer)
    mainSearchBar(e.target.value)
  } else {
    emptyDOM(resultsContainer)
    if (state.tags.ingredient.length === 0 && state.tags.appliance.length === 0 && state.tags.ustensil.length === 0) {
      displayAllRecipes()
    } else if (state.tags.appliance.length > 0 || state.tags.ingredient.length > 0 || state.tags.ustensil.length > 0) {
      displayRecipe(state.newResult)
    }
  }
})
