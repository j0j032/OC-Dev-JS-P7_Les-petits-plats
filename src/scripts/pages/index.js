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

const displayAllLists = (data) => {
  displayIngList(data)
  displayAppList(data)
  displayUstList(data)
}

const tagSearch = (arr, value, container, tagList, btnList, selector) => {
  arr = arr.filter(item => isIncluded(item, value))
  emptyDOM(container)
  filterModel.createFilterListDOM(arr, container, tagList, btnList, selector)
  if (value.length >= 3 && arr.length === 0) {
    container.textContent = 'Aucun filtre'
  }
}

const filtersSearch = () => {
  domLinker.filterInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const inputValue = e.target.value
      switch (e.target.id) {
        case 'ingredients__searchBar':
          searchBar.value.length < 3 ? filterModel.getAllIngredients(state.allRecipes) : filterModel.getAllIngredients(state.searchRecipes)
          tagSearch(state.allIngredients, inputValue, ingredientsList, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li')
          state.allIngredients = []
          break
        case 'appareils__searchBar':
          searchBar.value.length < 3 ? filterModel.getAppareilsList(state.allRecipes) : filterModel.getAppareilsList(state.searchRecipes)
          tagSearch(state.allAppareils, inputValue, appareilsList, state.tags.appliance, state.tagAppList, '.appareils__list>ul>li')
          state.allAppareils = []
          break
        case 'ustensiles__searchBar':
          searchBar.value.length < 3 ? filterModel.getUstensilsList(state.allRecipes) : filterModel.getUstensilsList(state.searchRecipes)
          tagSearch(state.allUstensils, inputValue, ustensilesList, state.tags.ustensil, state.tagUstList, '.ustensiles__list>ul>li')
          state.allUstensils = []
          break
      }
    })
  })
}

/**
 * ALL EVENTS TO OPEN THE FILTER LISTS CONTAINER
 */
ingredientsIconBtn.addEventListener('click', () => {
  filterModel.toggleList(ingredientsIconBtn, ingredientsList, domLinker.ingredients, ingredientsSearchBar, 'ingrédient', 'Ingrédients') 
  searchBar.value.length < 3 ? displayIngList(state.allRecipes) : displayIngList(state.searchRecipes)
  filtersSearch()
})

ustensilesIconBtn.addEventListener('click', () => {
  filterModel.toggleList(ustensilesIconBtn, ustensilesList, domLinker.ustensiles, ustensilesSearchBar, 'ustensile', 'Ustensiles')
  searchBar.value.length < 3 ? displayUstList(state.allRecipes) : displayUstList(state.searchRecipes)
  filtersSearch()
})

appareilsIconBtn.addEventListener('click', () => {
  filterModel.toggleList(appareilsIconBtn, appareilsList, domLinker.appareils, appareilsSearchBar, 'appareil', 'Appareils')
  searchBar.value.length < 3 ? displayAppList(state.allRecipes) : displayAppList(state.searchRecipes)
  filtersSearch()
})

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
    displayAllLists(state.searchRecipes)
    if (state.searchRecipes.length <= 0) {
      noResult(resultsContainer, 'Aucune recette ne correspond à votre recherche')
      noResult(ingredientsList, 'Aucun filtre')
      noResult(appareilsList, 'Aucun filtre')
      noResult(ustensilesList, 'Aucun filtre')
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

/**
 * MAIN SEARCH BAR EVENT
 * research start at 3 charachters
 * if less than 3 charachters display all recipe by default
 * but if less than 3 charachters and a tag is selected display newResult
 */
domLinker.searchBar.addEventListener('input', e => {
  const inputValue = e.target.value
  domLinker.filterInputs.forEach(input => {
    input.value = ''
  })
  if (inputValue.length >= 3) {
    emptyDOM(resultsContainer)
    mainSearchBar(inputValue)
  } else {
    emptyDOM(resultsContainer)
    displayAllLists(state.allRecipes)
    if (state.tags.ingredient.length === 0 && state.tags.appliance.length === 0 && state.tags.ustensil.length === 0) {
      displayAllRecipes()
    } else if (state.tags.appliance.length > 0 || state.tags.ingredient.length > 0 || state.tags.ustensil.length > 0) {
      displayRecipe(state.newResult)
    }
  }
})
