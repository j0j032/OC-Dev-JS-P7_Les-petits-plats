const api = require('../components/api')
console.log('hello world')

const init = async () => {
  const recipes = await api.getRecipes()
  console.log(recipes)
}

init()
