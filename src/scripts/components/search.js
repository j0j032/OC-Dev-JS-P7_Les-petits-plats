/**
 * Determines whether an array (value1 in lower case) includes a certain value (value2 in lower case) among its entries,
 * returning true or false as appropriate.
 * @param {String} value1
 * @param {String} value2
 * @returns Boolean
 */
const isIncluded = (value1, value2) => value1.toLowerCase().indexOf(value2.toLowerCase()) > -1

const isFound = (array, property, value) => {
  for (const item of array) {
    if (isIncluded(item[property], value)) {
      return true
    }
  }
  return false
}
/**
 * Get recipes in function of value includes in name or description or ingredients
 * using native loop
 * @param {Array} recipes
 * @param {String} value
 * @returns Array of object of recipes
 */
const filterMainSearch = (recipes, value) => {
  const result = []
  // 1st step: Loop on each recipes
  for (const recipe of recipes) {
    // 2nd step: Compare value with each properties (name, description, ingredients)
    if (isIncluded(recipe.description, value) ||
      isIncluded(recipe.name, value) ||
      isFound(recipe.ingredients, 'ingredient', value)) {
      // 3rd step: add recipe to a result array
      result.push(recipe)
    }
  }
  return result
}

const isRecipeIncludesEveryTagIngredient = (recipe, tags) => tags.ingredients.every(ingredient => recipe.ingredients.map(elem => elem.ingredient).includes(ingredient))
const isRecipeIncludesEveryTagAppliance = (recipe, tags) => tags.appliances.every(appliance => recipe.appliance.includes(appliance))
const isRecipeIncludesEveryTagUstensil = (recipe, tags) => tags.ustensils.every(ustensil => recipe.ustensils.includes(ustensil))

/**
 * Get recipes which include every tag in param
 * @param {Array} recipes - Array of object (recipes)
 * @param {Object} tags - tags to search
 * @returns Array of object of recipes
 */
const tagFilter = (recipes, tags) => recipes.filter(recipe => isRecipeIncludesEveryTagIngredient(recipe, tags) && isRecipeIncludesEveryTagAppliance(recipe, tags) && isRecipeIncludesEveryTagUstensil(recipe, tags))

module.exports = {
  isIncluded, isFound, filterMainSearch, tagFilter
}
