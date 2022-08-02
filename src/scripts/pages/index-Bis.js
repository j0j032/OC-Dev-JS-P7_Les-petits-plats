const api = require('../components/api-Bis')
const domLinker = require('../components/domLinker')
const { emptyDOM, toggleList, noResult } = require('../components/dom')
const { createRecipeCard } = require('../factories/recipe')
const state = require('../components/state-Bis')

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
  recipes.length === 0 ? noResult(domLinker.resultsContainer, 'Aucune recette trouvée') : displayRecipes(recipes)
}

window.onload = (applySearchBarFilter(), api.logDatas())
domLinker.searchBar.addEventListener('input', applySearchBarFilter)
