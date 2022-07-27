/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
const api = require('../components/api')
const state = require('../components/state')
const { emptyDOM, toggleList } = require('../components/dom')
const domLinker = require('../components/domLinker')
const { createRecipeCard } = require('../factories/recipe')
const { createFilters } = require('../factories/filters')
const filterModel = createFilters()

const logData = async () => {
  state.allRecipes = await api.getAllRecipes()
  console.log(state.allRecipes)
}
logData()

const allRecipes = async () => {
  state.allRecipes = await api.getAllRecipes()
  displayRecipe(state.allRecipes)
}

const searchedRecipes = async (value) => {
  await api.getSearchedRecipes(value)
  displayRecipe(state.newResult)
}

const displayRecipe = (data) => {
  emptyDOM(domLinker.resultsContainer)
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}

window.onload = allRecipes

domLinker.searchBar.addEventListener('input', (e) => {
  const inputValue = e.target.value
  inputValue.length >= 3 ? searchedRecipes(inputValue) : allRecipes()
})
