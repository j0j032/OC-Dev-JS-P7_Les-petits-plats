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

const getAppliances = (main = '', tags, value = '') => getRecipes(main, tags)
  .then(recipes => {
    const filter = value === 'Appareils' ? '' : value
    // Get all unique appliances
    const appliances = [...new Set(recipes.map(item => item.appliance))]
    return filter.length >= 3 ? appliances.filter(item => isLowerCaseIncluded(item, filter)) : appliances
  })

const getUstensils = (main = '', tags, value = '') => getRecipes(main, tags)
  .then(recipes => {
    const filter = value === 'Ustensils' ? '' : value
    let ustensils = []
    // Get all unique ustensils
    recipes.forEach(recipe => {
      ustensils = [...new Set([...ustensils, ...recipe.ustensils])]
    })
    return filter.length >= 3 ? ustensils.filter(item => isLowerCaseIncluded(item, filter)) : ustensils
  })

module.exports = { logDatas, getRecipes, getIngredients, getAppliances, getUstensils }
