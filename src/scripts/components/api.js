const { default: axios } = require('axios')
const url = 'src/data/recipes.json'

/**
 * Get all recipes
 * @returns Array of photographer object
 */
const getRecipes = () => {
  axios.get(url).then((response) => response.data.recipes)
}

module.exports = {
  getRecipes
}
