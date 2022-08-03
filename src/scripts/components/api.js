const { default: axios } = require('axios')
const { isIncluded, filterMainSearch, tagFilter } = require('./search')
const url = 'src/data/recipes.json'
const tagsDefault = {
  ingredients: [],
  appliances: [],
  ustensils: []
}

/**
 * Get all recipes filtered by value and tags in param
 * @param {String} value - String to search
 * @param {Object} tags - tags filtered
 * @returns Array of object (recipes)
 */
const getRecipes = (value = '', tags = tagsDefault) => axios.get(url).then(response => {
  const result = value.length >= 3 ? filterMainSearch(response.data.recipes, value) : response.data.recipes
  return tagFilter(result, tags)
})

/**
 * Get Ingredients filtered
 * @param {*} main - String searched into main search bar
 * @param {*} tags - tags filtered
 * @param {*} value - String to search from input search bar ingredients
 * @returns Array of String (ingredients)
 */
const getIngredients = (main = '', tags, value = '') => getRecipes(main, tags)
  .then(recipes => {
    const filter = value === 'Ingrédients' ? '' : value
    let ingredients = []
    // Get all unique ingredients
    recipes.forEach(recipe => {
      ingredients = [...new Set([...ingredients, ...recipe.ingredients.map(item => item.ingredient)])]
    })
    return filter.length >= 3 ? ingredients.filter(item => isIncluded(item, filter)) : ingredients
  })

/**
 * Get Appliances filtered
 * @param {*} main - String searched into main search bar
 * @param {*} tags - tags filtered
 * @param {*} value - String to search from input search bar appliances
 * @returns Array of String (appliances)
 */
const getAppliances = (main = '', tags, value = '') => getRecipes(main, tags)
  .then(recipes => {
    const filter = value === 'appliances' ? '' : value
    // Get all unique appliances
    const appliances = [...new Set(recipes.map(item => item.appliance))]
    return filter.length >= 3 ? appliances.filter(item => isIncluded(item, filter)) : appliances
  })

/**
 * Get Ustensils filtered
 * @param {*} main - String searched into main search bar
 * @param {*} tags - tags filtered
 * @param {*} value - String to search from input search bar ustensils
 * @returns Array of String (ustensils)
 */
const getUstensils = (main = '', tags, value = '') => getRecipes(main, tags)
  .then(recipes => {
    const filter = value === 'Ustensils' ? '' : value
    let ustensils = []
    // Get all unique ustensils
    recipes.forEach(recipe => {
      ustensils = [...new Set([...ustensils, ...recipe.ustensils])]
    })
    return filter.length >= 3 ? ustensils.filter(item => isIncluded(item, filter)) : ustensils
  })

module.exports = { getRecipes, getIngredients, getAppliances, getUstensils }
