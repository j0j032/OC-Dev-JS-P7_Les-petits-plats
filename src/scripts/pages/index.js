const api = require('../components/api')
const domLinker = require('../components/domLinker')
const { createRecipeCard } = require('../factories/recipe')
// const recipesTDI = []

let recipes

const displayRecipe = (data) => {
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
    /* recipesTDI.push(
      {
        titre: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients
      }
    ) */
  })
  // console.log(recipesTDI)
}

/* const init = async () => {
  recipes = await api.getRecipes()
  console.log(recipes)
  displayRecipe(recipes)
}
init() */

const searchBar = async (search) => {
  recipes = recipes = await api.getRecipes()
  console.log(recipes)
  domLinker.searchBar.addEventListener('input', e => {
    for (let i = 0; i < recipes.length; i++) {
      if (e.target.value.indexOf(recipes[i].name)) {
        displayRecipe(recipes)
      } else {
        console.log('not A')
      }
    }
  })
}

searchBar()
