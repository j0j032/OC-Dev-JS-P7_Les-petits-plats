/* eslint-disable no-unused-expressions */
const api = require('../components/api')
const state = require('../components/state')
const dom = require('../components/dom')
const domLinker = require('../components/domLinker')
const { createRecipeCard } = require('../factories/recipe')
const { createFiltersList } = require('../factories/filters')
const filterModel = createFiltersList()

const logRecipes = async () => {
  const recipes = await api.getRecipes()
  console.log(recipes)
}
logRecipes()

// Filters algo

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
const filterSearch = async (inputValue, array, container, inpuTarget) => {
  if (inputValue.length >= 3) {
    array = array.filter(item => item.toLowerCase().includes(inputValue))
    dom.emptyDOM(container)
    filterModel.createFilterListDOM(array, container)
    container.classList.add('onSearch')
    console.log(array)
  } else if (inputValue.length >= 3 && array.length === 0) {
    array.push('Aucun résultat')
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

domLinker.ingredientsSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, state.allIngredients, domLinker.ingredientsList, e.target))
domLinker.appareilsSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, state.allAppareils, domLinker.appareilsList, e.target))
domLinker.ustensilesSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, state.allUstensils, domLinker.ustensilesList, e.target))

// Display recipes
const displayRecipe = (data) => {
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}

const displayAllRecipes = async () => {
  const recipes = await api.getRecipes()
  displayRecipe(recipes)
}
displayAllRecipes()

const isIncluded = (property, value) => property.toLowerCase().includes(value.toLowerCase())
const isFound = (array, property, value) => array.find(item => isIncluded(item[property], value))

const mainSearchBar = async (search) => {
  let recipes = await api.getRecipes()
  recipes = recipes.filter(recipe => isIncluded(recipe.name, search) || isIncluded(recipe.description, search) || isFound(recipe.ingredients, 'ingredient', search))
  displayRecipe(recipes)
  if (recipes.length <= 0) {
    domLinker.resultsContainer.textContent = 'Aucune recette ne correspond à votre recherche'
  }
  console.log(recipes)
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
