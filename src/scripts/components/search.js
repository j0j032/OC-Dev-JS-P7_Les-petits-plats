const isIncluded = (property, value) => property.toLowerCase().includes(value.toLowerCase())

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

module.exports = {
  isIncluded, isFound, noResult, getLastItem
}
