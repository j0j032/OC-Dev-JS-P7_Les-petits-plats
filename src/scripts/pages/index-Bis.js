const api = require('../components/api-Bis')
const domLinker = require('../components/domLinker')
const { emptyDOM, toggleList, noResult } = require('../components/dom')
const { createRecipeCard } = require('../factories/recipe')

const displayRecipes = (data) => {
  emptyDOM(domLinker.resultsContainer)
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}

const applySearchBarFilter = async () => {
  const recipes = await api.getRecipes(domLinker.searchBar.value)
  displayRecipes(recipes)
}

domLinker.searchBar.addEventListener('input', applySearchBarFilter)
