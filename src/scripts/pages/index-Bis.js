const api = require('../components/api-Bis')
const domLinker = require('../components/domLinker')
const { emptyDOM, toggleList, noResult } = require('../components/dom')
const { createRecipeCard } = require('../factories/recipe')
const state = require('../components/state-Bis')
const { createFilters } = require('../factories/filters')
const { isIncluded } = require('../components/search-Bis')
const { ingredientsSearchBar, appareilsSearchBar, ustensilesSearchBar } = require('../components/domLinker')
const filterModel = createFilters()

const displayRecipes = (data) => {
  emptyDOM(domLinker.resultsContainer)
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}

const applySearchBarFilter = async () => {
  const recipes = await api.getRecipes(domLinker.searchBar.value, state.tags)
  state.newRecipes = recipes
  recipes.length === 0 ? noResult(domLinker.resultsContainer, 'Aucune recette trouvée') : displayRecipes(recipes)
}
const tagSearch = (arr, value, container, tagList, btnList, selector) => {
  arr = arr.filter(item => isIncluded(item, value))
  emptyDOM(container)
  filterModel.createFilterListDOM(arr, container, tagList, btnList, selector)
  if (value.length >= 2 && arr.length === 0) {
    container.textContent = 'Aucun filtre'
  }
}

const displayIngredientsList = async () => {
  let ingredients
  // eslint-disable-next-line prefer-const
  ingredients = await api.getIngredients(domLinker.searchBar.value, state.tags, domLinker.ingredientsSearchBar.value)
  emptyDOM(domLinker.ingredientsList)
  ingredients.length === 0 ? noResult(domLinker.ingredientsList, 'Aucun résultat') : filterModel.createFilterListDOM(ingredients, domLinker.ingredientsList, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li')

  ingredientsSearchBar.addEventListener('input', () => {
    tagSearch(ingredients, ingredientsSearchBar.value, domLinker.ingredientsList, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li')
  })
}

const displayAppliancesList = async () => {
  let appliances
  // eslint-disable-next-line prefer-const
  appliances = await api.getAppliances(domLinker.searchBar.value, state.tags, domLinker.appareilsSearchBar.value)
  emptyDOM(domLinker.appareilsList)
  appliances.length === 0 ? noResult(domLinker.appareilsList, 'Aucun résultat') : filterModel.createFilterListDOM(appliances, domLinker.appareilsList, state.tags.appliance, state.tagAppList, '.appareils__list>ul>li')

  appareilsSearchBar.addEventListener('input', () => {
    tagSearch(appliances, appareilsSearchBar.value, domLinker.appareilsList, state.tags.appliance, state.tagAppList, '.appareils__list>ul>li')
  })
}

const displayUstensilsList = async () => {
  let ustensiles
  // eslint-disable-next-line prefer-const
  ustensiles = await api.getUstensils(domLinker.searchBar.value, state.tags, domLinker.ustensilesSearchBar.value)
  emptyDOM(domLinker.ustensilesList)
  ustensiles.length === 0 ? noResult(domLinker.ustensilesList, 'Aucun résultat') : filterModel.createFilterListDOM(ustensiles, domLinker.ustensilesList, state.tags.ustensils, state.tagAppList, '.ustensiles__list>ul>li')

  ustensilesSearchBar.addEventListener('input', () => {
    tagSearch(ustensiles, ustensilesSearchBar.value, domLinker.ustensilesList, state.tags.ustensils, state.tagAppList, '.ustensiles__list>ul>li')
  })
}

const displayAllTagsList = () => {
  displayIngredientsList()
  displayAppliancesList()
  displayUstensilsList()
}

domLinker.arrowIcon.forEach(btn => btn.addEventListener('click', (e) => {
  const category = e.composedPath()[1].id

  switch (category) {
    case 'ingredients__iconBtn':
      toggleList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'ingrédient', 'Ingrédients')
      displayIngredientsList()
      break
    case 'appareils__iconBtn':
      toggleList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'appareil', 'Appareils')
      displayAppliancesList()
      break
    case 'ustensiles__iconBtn':
      toggleList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'ustensile', 'Ustensiles')
      displayUstensilsList()
      break
  }
}))

window.onload = (applySearchBarFilter(), api.logDatas())
domLinker.searchBar.addEventListener('input', () => {
  applySearchBarFilter()
  displayAllTagsList()
})
