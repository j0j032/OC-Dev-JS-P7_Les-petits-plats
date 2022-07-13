const api = require('../components/api')
const dom = require('../components/dom')
const domLinker = require('../components/domLinker')
const filters = require('../factories/filters')
const { createRecipeCard } = require('../factories/recipe')

const allIngredients = []

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
  const allIngredientsG = [...new Set(allIngredients)]
  console.log(allIngredientsG)
  filters.createFilterListDOM(allIngredientsG, domLinker.filterList)
}
const displayIngredients = async () => {
  const recipes = await api.getRecipes()
  displayIngredientList(recipes)
}

// Button filters methods
const displayList = (btn, list, container, placeHolder) => {
  btn.style.transform = 'rotate(180deg)'
  list.classList.add('show')
  list.classList.remove('hidden')
  container.classList.add('absolute')
  placeHolder.classList.add('show')
  placeHolder.removeAttribute('disabled')
  placeHolder.setAttribute('placeholder', 'Rechercher un ingrédient')
  placeHolder.focus()
  displayIngredients()
}
const hideList = (btn, list, container, placeHolder) => {
  btn.style.transform = 'rotate(0deg)'
  list.classList.remove('show')
  list.classList.add('hidden')
  container.classList.remove('absolute')
  placeHolder.classList.remove('show')
  placeHolder.setAttribute('disabled', '')
  placeHolder.setAttribute('placeholder', 'Ingrédients')
  placeHolder.value = ''
  dom.emptyDOM(list)
}

const toggleList = (btn, list, container, placeHolder) => {
  if (list.classList.contains('hidden')) {
    displayList(btn, list, container, placeHolder)
  } else {
    hideList(btn, list, container, placeHolder)
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

domLinker.ingredientsIconBtn.addEventListener('click', () => toggleList(domLinker.ingredientsIconBtn, domLinker.filterList, domLinker.ingredients, domLinker.ingredientsSearchBar))
