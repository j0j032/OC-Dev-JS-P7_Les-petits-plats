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

const displayIngredients = async () => {
  const recipes = await api.getRecipes()
  displayIngredientList(recipes)
}

const displayRecipe = (data) => {
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}

const displayIngredientList = (data) => {
  data.forEach(recipe => {
    filters.getIngredientList(recipe, allIngredients)
  })
  const allIngredientsG = [...new Set(allIngredients)]
  console.log(allIngredientsG)
  filters.createFilterListDOM(allIngredientsG, domLinker.filterList)
}

const displayList = (list, container) => {
  list.classList.add('show')
  list.classList.remove('hidden')
  container.classList.add('absolute')
  displayIngredients()
}
const hideList = (list, container) => {
  list.classList.remove('show')
  list.classList.add('hidden')
  container.classList.remove('absolute')
  dom.emptyDOM(list)
}

const toggleList = (list, container) => {
  if (list.classList.contains('hidden')) {
    displayList(list, container)
  } else {
    hideList(list, container)
  }
}

domLinker.ingredientBtn.addEventListener('click', () => toggleList(domLinker.filterList, domLinker.ingredients))

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

domLinker.searchBar.addEventListener('input', e => {
  if (e.target.value.length >= 3) {
    dom.emptyDOM(domLinker.resultsContainer)
    mainSearchBar(e.target.value)
  } else {
    dom.emptyDOM(domLinker.resultsContainer)
    displayAllRecipes()
  }
})
