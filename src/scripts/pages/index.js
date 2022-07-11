const api = require('../components/api')
const dom = require('../components/dom')
const domLinker = require('../components/domLinker')
const { createRecipeCard } = require('../factories/recipe')

const displayRecipe = (data) => {
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}

const allRecipes = async () => {
  const recipes = await api.getRecipes()
  console.log(recipes)
  displayRecipe(recipes)
}

allRecipes()

const mainSearchBar = async (search) => {
  let recipes = await api.getRecipes()
  console.log(recipes)
  recipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(search) || recipe.description.toLowerCase().includes(search))
  displayRecipe(recipes)
  console.log(recipes)
}

domLinker.searchBar.addEventListener('input', e => {
  if (e.target.value.length >= 3) {
    dom.emptyDOM(domLinker.resultsContainer)
    mainSearchBar(e.target.value)
  } else {
    dom.emptyDOM(domLinker.resultsContainer)
    allRecipes()
  }
})
