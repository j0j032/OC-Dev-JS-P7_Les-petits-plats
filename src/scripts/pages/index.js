/* eslint-disable no-unused-expressions */
const api = require('../components/api')
const dom = require('../components/dom')
const domLinker = require('../components/domLinker')
const filters = require('../factories/filters')
const { createRecipeCard } = require('../factories/recipe')

let allIngredients = []
let allAppliance = []
let allUstensils = []

const logRecipes = async () => {
  const recipes = await api.getRecipes()
  console.log(recipes)
}
logRecipes()

// Ingredient Methods
const displayIngredientList = (data) => {
  data.forEach(recipe => {
    filters.getIngredientList(recipe, allIngredients)
  })
  allIngredients = [...new Set(allIngredients)]
  filters.createFilterListDOM(allIngredients, domLinker.ingredientsList)
}

const displayIngredients = async () => {
  const recipes = await api.getRecipes()
  displayIngredientList(recipes)
}

const displayApplianceList = (data) => {
  filters.getAppareilsList(data, allAppliance)
  allAppliance = [...new Set(allAppliance)]
  console.log(allAppliance)
}

const displayAppliances = async () => {
  const recipes = await api.getRecipes()
  displayApplianceList(recipes)
}
displayAppliances()

const displayUstensilsList = (data) => {
  data.forEach(recipe => {
    filters.getUstensilesList(recipe, allUstensils)
  })
  allUstensils = [...new Set(allUstensils)]
  console.log(allUstensils)
}

const displayUstensils = async () => {
  const recipes = await api.getRecipes()
  displayUstensilsList(recipes)
}
displayUstensils()


const displayNewList = (array, dom) => {
  filters.createFilterListDOM(array, dom)
}
const ingredientsSearch = (inputValue) => {
  if (inputValue.length >= 3) {
    allIngredients = allIngredients.filter(ingredient => ingredient.toLowerCase().includes(inputValue))
    dom.emptyDOM(domLinker.ingredientsList)
    displayNewList(allIngredients, domLinker.ingredientsList)
    domLinker.ingredientsList.classList.add('onSearch')
  } else if (inputValue.length < 3) {
    dom.emptyDOM(domLinker.ingredientsList)
    domLinker.ingredientsList.classList.remove('onSearch')
    allIngredients = []
    displayIngredients()
  }
}

// Button filters methods
const displayList = (btn, list, container, placeHolder, displayFunc, textSearch) => {
  btn.style.transform = 'rotate(180deg)'
  list.classList.add('show')
  list.classList.remove('hidden')
  container.classList.add('absolute')
  placeHolder.classList.add('show')
  placeHolder.removeAttribute('disabled')
  placeHolder.setAttribute('placeholder', `Rechercher un ${textSearch}`)
  placeHolder.focus()
  displayFunc
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
  dom.emptyDOM(list)
}

const toggleList = (btn, list, container, placeHolder, displayFunc, textSearch, textDefault) => {
  if (list.classList.contains('hidden')) {
    displayList(btn, list, container, placeHolder, displayFunc, textSearch)
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

domLinker.ingredientsIconBtn.addEventListener('click', () => toggleList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, displayIngredients(), 'ingrédient', 'Ingrédients'))
domLinker.ingredientsSearchBar.addEventListener('input', (e) => ingredientsSearch(e.target.value))
