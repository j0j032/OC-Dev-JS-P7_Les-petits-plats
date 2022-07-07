const api = require('../components/api')
const domLinker = require('../components/domLinker')
const { createRecipeCard } = require('../factories/recipe')

const recipesTDI = []

const displayRecipe = (data) => {
  data.forEach(recipe => {
    recipesTDI.push(
      {
        titre: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients
      }
    )
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
  console.log(recipesTDI)
}

const init = async () => {
  const recipes = await api.getRecipes()
  console.log(recipes)
  displayRecipe(recipes)
}

domLinker.searchBar.addEventListener('input', e => {
  if (e.target.selectionEnd >= 3) {
    if (e.target.value.indexOf(recipesTDI)) {
      console.log('azerty')
    } else {
      console.log('pas trouvé')
    }
  } else {
    console.log('no')
  }
})

init()
