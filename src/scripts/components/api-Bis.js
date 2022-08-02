const { default: axios } = require('axios')
const { isLowerCaseIncluded, mainSearch, tagFilter } = require('./search-Bis')
const url = 'src/data/recipes.json'
const tagsDefault = {
  ingredients: [],
  appliances: [],
  ustensils: []
}

const logDatas = () => axios.get(url).then(response => { console.log(response.data.recipes) })

const getRecipes = (value = '', tags = tagsDefault) => axios.get(url).then(response => {
  const result = value.length >= 3 ? mainSearch(response.data.recipes, value) : response.data.recipes
  return tagFilter(result, tags)
})

const getIngredients = (main = '', tags, value = '') => getRecipes(main, tags)
  .then(recipes => {
    const filter = value === 'Ingrédients' ? '' : value
    let ingredients = []
    // Get all unique ingredients
    recipes.forEach(recipe => {
      ingredients = [...new Set([...ingredients, ...recipe.ingredients.map(item => item.ingredient)])]
    })
    return filter.length >= 3 ? ingredients.filter(item => isLowerCaseIncluded(item, filter)) : ingredients
  })

module.exports = { logDatas, getRecipes, getIngredients }
