/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
const api = require('../components/api')
const state = require('../components/state')
const { isIncluded, isFound, noResult, emptyDOM } = require('../components/dom')
const domLinker = require('../components/domLinker')
const { createRecipeCard } = require('../factories/recipe')
const { createFilters } = require('../factories/filters')
const { resultsContainer, ingredientsSearchBar, appareilsSearchBar, ustensilesSearchBar, ingredientsIconBtn, ustensilesIconBtn, appareilsIconBtn, ingredientsList, ustensilesList, appareilsList, searchBar } = require('../components/domLinker')
const filterModel = createFilters()

/**
 * Log Data in console (to code)
 */
const logRecipes = async () => {
  state.allRecipes = await api.getRecipes()
  console.log(state.allRecipes)
}
window.onload = logRecipes()

/**
 * Display each filter list for search input
 */
const displayIngList = (data) => {
  emptyDOM(ingredientsList)
  filterModel.getAllIngredients(data)
  filterModel.createFilterListDOM(state.allIngredients, domLinker.ingredientsList, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li')
  state.allIngredients = []
}

const displayAppList = (data) => {
  emptyDOM(appareilsList)
  filterModel.getAppareilsList(data)
  filterModel.createFilterListDOM(state.allAppareils, domLinker.appareilsList, state.tags.appliance, state.tagAppList, '.appareils__list>ul>li')
  state.allAppareils = []
}
const displayUstList = (data) => {
  emptyDOM(ustensilesList)
  filterModel.getUstensilsList(data)
  filterModel.createFilterListDOM(state.allUstensils, domLinker.ustensilesList, state.tags.ustensil, state.tagUstList, '.ustensiles__list>ul>li')
  state.allUstensils = []
}

/**
 * TO SEARCH AA SPECIFIC FILTER LIST ITEM
 * @param {string} inputValue = user research
 
 * THE FOLLOWING CONCERN createFilterListDOM FROM filter.js
 * @param {array} array for each filter list 
 * array in state.js = allIngredients, allAppareils, allUstensils
 * @paraHTML el} container to target and the attached list (parent in createFilterListDOM)
 * @param {HTML el} inpuTarget to open and join the right filter list
 
 * THE FOLLOWING CONCERN tagEvent METHOD CALLED IN createFilterListDOM FROM filter.js
 * @param {array} tagList to fill an array of tag when user select an item in the list
 * object tags in state.js = tags.ingredient, tags.appliance, tags.ustensil
 * @param {array} filterBtns to set every list item as an html node
 * list in state.js = tagIngList, tagAppList, tagUstList
 * @param {HTML el} selector to select each item as a btn and select and set a tag
 */
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
      case ingredientsSearchBar:
        displayIngList()
        break
      case appareilsSearchBar:
        displayAppList()
        break
      case ustensilesSearchBar:
        displayUstList()
        break
    }
  }
  if (inputValue.length >= 3 && array.length === 0) {
    container.textContent = 'Aucun résultat'
  }
}

/**
 * ALL EVENTS TO OPEN THE FILTER LISTS CONTAINER
 */
ingredientsIconBtn.addEventListener('click', () => {
  filterModel.toggleList(ingredientsIconBtn, ingredientsList, domLinker.ingredients, ingredientsSearchBar, 'ingrédient', 'Ingrédients') 
  if (searchBar.value.length < 3) {
    displayIngList(state.allRecipes)
  } else {
    displayIngList(state.searchRecipes)
  }
})

ustensilesIconBtn.addEventListener('click', () => {
  filterModel.toggleList(ustensilesIconBtn, ustensilesList, domLinker.ustensiles, ustensilesSearchBar, 'ustensile', 'Ustensiles')
  if (searchBar.value.length < 3) {
    displayUstList(state.allRecipes)
  } else {
    displayUstList(state.searchRecipes)
  }
})

appareilsIconBtn.addEventListener('click', () => {
  filterModel.toggleList(appareilsIconBtn, appareilsList, domLinker.appareils, appareilsSearchBar, 'appareil', 'Appareils')
  if (searchBar.value.length < 3) {
    displayAppList(state.allRecipes)
  } else {
    displayAppList(state.searchRecipes)
  }
})

/**
 * ALL EVENTS TO SEARCH AN ITEM IN FILTER LIST
 */
ingredientsSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, state.allIngredients, ingredientsList, e.target, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li'))
appareilsSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, state.allAppareils, appareilsList, e.target, state.tags.appliance, state.tagAppList, '.appareils__list>ul>li'))
ustensilesSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, state.allUstensils, ustensilesList, e.target, state.tags.ustensil, state.tagUstList, '.ustensiles__list>ul>li'))

/**
 * TO DISPLAY EACH CARD THAT MATCH THE GOOD ARRAY
 * @param {array} data 
 * when allRecipes = display every recipe
 * when newResult = display filterd recipes
 * when finalResult = display filtered recipes with value in mainSearchBar
 */
const displayRecipe = (data) => {
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    resultsContainer.appendChild(recipeCardDOM)
  })
}

/**
 * Display every recipe by default
 */
const displayAllRecipes = async () => {
  state.allRecipes = await api.getRecipes()
  displayRecipe(state.allRecipes)
}
window.onload = displayAllRecipes()

/**
 * TO SEARCH RECIPE IN MAIN SEARCH BAR
 * @param {string} inputValue = user research
 * if no tag(s): default dataList is allRecipe
 * if tag(s): default dataList is newResult and finalResult get the research from newResult 
 */
const mainSearchBar = (inputValue) => {
  if (state.tags.ingredient.length === 0 && state.tags.appliance.length === 0 && state.tags.ustensil.length === 0) {
    state.searchRecipes = state.allRecipes.filter(recipe => isIncluded(recipe.name, inputValue) || isIncluded(recipe.description, inputValue) || isFound(recipe.ingredients, 'ingredient', inputValue))
    displayRecipe(state.searchRecipes)
    displayIngList(state.searchRecipes)
    displayAppList(state.searchRecipes)
    displayUstList(state.searchRecipes)
    // displayBackLists()
    if (state.searchRecipes.length <= 0) {
      noResult(resultsContainer, 'Aucune recette ne correspond à votre recherche')
      noResult(ingredientsList, 'Aucun filtre')
    }
  } else if (state.tags.appliance.length > 0 || state.tags.ingredient.length > 0 || state.tags.ustensil.length > 0) {
    console.log('NewResult', state.newResult)
    const finalResult = state.newResult.filter(recipe => isIncluded(recipe.name, inputValue) || isIncluded(recipe.description, inputValue) || isFound(recipe.ingredients, 'ingredient', inputValue))
    displayRecipe(finalResult)
    console.log('finalResult', finalResult)
    if (finalResult.length === 0) {
      noResult(resultsContainer, 'Aucune recette ne correspond à votre recherche')
    }
  }
}

/* const displayBackLists = () => {
  if (searchBar.value.length < 3) {
    displayIngList(state.allRecipes)
    displayAppList(state.allRecipes)
    displayUstList(state.allRecipes)
  }
} */

/**
 * MAIN SEARCH BAR EVENT
 * research start at 3 charachters
 * if less than 3 charachters display all recipe by default
 * but if less than 3 charachters and a tag is selected display newResult
 */
domLinker.searchBar.addEventListener('input', e => {
  const inputValue = e.target.value
  if (inputValue.length >= 3) {
    emptyDOM(resultsContainer)
    mainSearchBar(inputValue)
  } else {
    emptyDOM(resultsContainer)
    if (state.tags.ingredient.length === 0 && state.tags.appliance.length === 0 && state.tags.ustensil.length === 0) {
      displayAllRecipes()
    } else if (state.tags.appliance.length > 0 || state.tags.ingredient.length > 0 || state.tags.ustensil.length > 0) {
      displayRecipe(state.newResult)
    }
  }
})
