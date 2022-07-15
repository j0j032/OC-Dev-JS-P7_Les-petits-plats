/* eslint-disable no-unused-expressions */
const api = require('../components/api')
const dom = require('../components/dom')
const domLinker = require('../components/domLinker')
const filters = require('../factories/filters')
const { createRecipeCard } = require('../factories/recipe')

let allIngredients = []
let allAppareils = []
let allUstensils = []

const logRecipes = async () => {
  const recipes = await api.getRecipes()
  console.log(recipes)
}
logRecipes()

// GetLists
const displayIngredientList = (data) => {
  data.forEach(recipe => {
    filters.getIngredientList(recipe, allIngredients)
  })
  allIngredients = [...new Set(allIngredients)]
  filters.createFilterListDOM(allIngredients, domLinker.ingredientsList)
}
const displayUstensilsList = (data) => {
  data.forEach(recipe => {
    filters.getUstensilesList(recipe, allUstensils)
  })
  allUstensils = [...new Set(allUstensils)]
  filters.createFilterListDOM(allUstensils, domLinker.ustensilesList)
}

const displayAppareilsList = (data) => {
  filters.getAppareilsList(data, allAppareils)
  allAppareils = [...new Set(allAppareils)]
  filters.createFilterListDOM(allAppareils, domLinker.appareilsList)
}

const displayAllFiltersList = async () => {
  const recipes = await api.getRecipes()
  displayIngredientList(recipes)
  displayAppareilsList(recipes)
  displayUstensilsList(recipes)
}
displayAllFiltersList()

const displayNewList = (array, dom) => {
  filters.createFilterListDOM(array, dom)
}

// List search
const filterSearch = (inputValue, array, container) => {
  if (inputValue.length >= 3) {
    array = array.filter(item => item.toLowerCase().includes(inputValue))
    dom.emptyDOM(container)
    displayNewList(array, container)
    container.classList.add('onSearch')
  } else if (inputValue.length < 3) {
    dom.emptyDOM(container)
    container.classList.remove('onSearch')
    array = []
    displayAllFiltersList()
  }
}

domLinker.ingredientsSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, allIngredients, domLinker.ingredientsList))
domLinker.appareilsSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, allAppareils, domLinker.appareilsList))
domLinker.ustensilesSearchBar.addEventListener('input', (e) => filterSearch(e.target.value, allUstensils, domLinker.ustensilesList))

// Button filters methods
const displayList = (btn, list, container, placeHolder, textSearch) => {
  btn.style.transform = 'rotate(180deg)'
  list.classList.add('show')
  list.classList.remove('hidden')
  container.classList.add('absolute')
  placeHolder.classList.add('show')
  placeHolder.removeAttribute('disabled')
  placeHolder.setAttribute('placeholder', `Rechercher un ${textSearch}`)
  placeHolder.focus()
}
const hideList = (btn, list, container, placeHolder, textDefault) => {
  btn.style.transform = 'rotate(0deg)'
  list.classList.remove('show')
  list.classList.add('hidden')
  list.classList.remove('onSearch')
  container.classList.remove('absolute')
  placeHolder.classList.remove('show')
  placeHolder.setAttribute('disabled', '')
  placeHolder.setAttribute('placeholder', textDefault)
  placeHolder.value = ''
}

const toggleList = (btn, list, container, placeHolder, textSearch, textDefault) => {
  if (list.classList.contains('hidden')) {
    displayList(btn, list, container, placeHolder, textSearch)
  } else {
    hideList(btn, list, container, placeHolder, textDefault)
  }
}

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

const mainSearchBar = async (search) => {
  let recipes = await api.getRecipes()
  recipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(search) || recipe.description.toLowerCase().includes(search))
  displayRecipe(recipes)
  if (recipes.length <= 0) {
    domLinker.resultsContainer.textContent = 'Aucune recette ne correspond à votre recherche'
  }
  console.log(recipes)
}

// events
domLinker.searchBar.addEventListener('input', e => {
  if (e.target.value.length >= 3) {
    dom.emptyDOM(domLinker.resultsContainer)
    mainSearchBar(e.target.value)
  } else {
    dom.emptyDOM(domLinker.resultsContainer)
    displayAllRecipes()
  }
})

domLinker.ingredientsIconBtn.addEventListener('click', () => toggleList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'ingrédient', 'Ingrédients'))

domLinker.ustensilesIconBtn.addEventListener('click', () => toggleList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'ustensile', 'Ustensiles'))

domLinker.appareilsIconBtn.addEventListener('click', () => toggleList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'appareil', 'Appareils'))


