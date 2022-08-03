const isIncluded = (value1, value2) => value1.toLowerCase().includes(value2.toLowerCase())

const isFound = (array, property, value) => array.find(item => isIncluded(item[property], value))

/**
     * TO GET LAST ITEM OF AN ARRAY (used in getTag method)
     * @param {array}
     * @returns last item
     */
const getLastItem = (arr) => {
  const lastItem = arr[arr.length - 1]
  return lastItem
}

const noResult = (container, text) => {
  container.textContent = text
}

const mainSearch = (recipes, value) => recipes.filter(item => isIncluded(item.name, value) || isIncluded(item.description, value) || isFound(item.ingredients, 'ingredient', value))

const isRecipeIncludesEveryTagIngredient = (recipe, tags) => tags.ingredients.every(ingredient => recipe.ingredients.map(elem => elem.ingredient).includes(ingredient))
const isRecipeIncludesEveryTagAppliance = (recipe, tags) => tags.appliances.every(appliance => recipe.appliance.includes(appliance))
const isRecipeIncludesEveryTagUstensil = (recipe, tags) => tags.ustensils.every(ustensil => recipe.ustensils.includes(ustensil))

const tagFilter = (recipes, tags) => recipes.filter(recipe => isRecipeIncludesEveryTagIngredient(recipe, tags) && isRecipeIncludesEveryTagAppliance(recipe, tags) && isRecipeIncludesEveryTagUstensil(recipe, tags))

module.exports = {
  isIncluded, isFound, noResult, getLastItem, mainSearch, tagFilter
}
