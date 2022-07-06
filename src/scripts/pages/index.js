const api = require('../components/api')

const init = async () => {
  const recipes = await api.getRecipes()
  console.log(recipes)
}

init()
