/* eslint-disable no-unused-expressions */
const api = require('../components/api')
const state = require('../components/state')
const dom = require('../components/dom')
const domLinker = require('../components/domLinker')
const { createRecipeCard } = require('../factories/recipe')
const { createFiltersList } = require('../factories/filters')
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
displayAllFiltersList()

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
    array = array.filter(item => dom.isIncluded(item, inputValue))
    dom.emptyDOM(container)
    filterModel.createFilterListDOM(array, container, tagList, filterBtns, selector)
    container.classList.add('onSearch')
  } else if (inputValue.length >= 3 && !array.length > 0) {
    console.log('Rien')
  } else if (inputValue.length < 3) {
    dom.emptyDOM(container)
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
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}

const displayAllRecipes = async () => {
  state.allRecipes = await api.getRecipes()
  if (state.tags.ingredient.length === 0 && state.tags.appliance.length === 0 && state.tags.ustensil.length === 0) {
    displayRecipe(state.allRecipes)
  }
}
displayAllRecipes()

const mainSearchBar = (search) => {
  if (state.tags.ingredient.length === 0 && state.tags.appliance.length === 0 && state.tags.ustensil.length === 0) {
    state.allRecipes = state.allRecipes.filter(recipe => dom.isIncluded(recipe.name, search) || dom.isIncluded(recipe.description, search) || dom.isFound(recipe.ingredients, 'ingredient', search))
    displayRecipe(state.allRecipes)
    if (state.allRecipes.length <= 0) {
      domLinker.resultsContainer.textContent = 'Aucune recette ne correspond à votre recherche'
    }
    console.log(state.allRecipes)
  } else if (state.tags.appliance.length > 0) {
    state.allRecipes = state.allRecipes.filter(item => dom.isIncluded(item.name, search) || dom.isIncluded(item.description, search) || dom.isFound(item.ingredients, 'ingredient', search))
    displayRecipe(state.allRecipes)
  }
  if (state.allRecipes.length <= 0) {
    domLinker.resultsContainer.textContent = 'Aucune recette ne correspond à votre recherche'
  }
}

domLinker.searchBar.addEventListener('input', e => {
  if (e.target.value.length >= 3) {
    dom.emptyDOM(domLinker.resultsContainer)
    mainSearchBar(e.target.value)
  } else {
    dom.emptyDOM(domLinker.resultsContainer)
    displayAllRecipes()
  }
})
