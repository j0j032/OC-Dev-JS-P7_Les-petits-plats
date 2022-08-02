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

const filterByLength = (recipes) => recipes.filter(recipe => recipe.name.length < 8)

module.exports = {
  isIncluded, isFound, noResult, getLastItem, mainSearch, filterByLength
}
