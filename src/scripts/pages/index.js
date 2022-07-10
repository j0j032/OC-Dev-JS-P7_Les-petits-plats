const api = require('../components/api')
const dom = require('../components/dom')
const domLinker = require('../components/domLinker')
const { createRecipeCard } = require('../factories/recipe')

let recipes

const displayRecipe = (data) => {
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}
let result = []
const init = async (search) => {
  recipes = await api.getRecipes()
  console.log(recipes)
  for (const item of recipes) {
    if (item.name.toLowerCase().includes(search)) {
      result.push(item)
    }
  }
  displayRecipe(result)
}

domLinker.searchBar.addEventListener('input', e => {
  if (e.target.value.length >= 3) {
    result = []
    dom.emptyDOM(domLinker.resultsContainer)
    init(e.target.value)
    console.log(result)
  }
})
