const isIncluded = (property, value) => property.toLowerCase().includes(value.toLowerCase())

const isFound = (array, property, value) => array.find(item => isIncluded(item[property], value))

const noResult = (container, text) => {
  container.textContent = text
}

module.exports = {
  isIncluded, isFound, noResult
}
