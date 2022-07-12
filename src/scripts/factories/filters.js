const { createElement } = require('../components/dom')

module.exports = {

  getIngredientList (data, array) {
    const { ingredients } = data

    const getAllIngredients = () => {
      for (const ingredient of ingredients) {
        array.push(ingredient.ingredient)
      }
    }
    getAllIngredients()
  },

  createFilterListDOM (array, parent) {
    const listAttributes = [{ class: 'list' }]
    const list = createElement('ul', listAttributes, parent, null)
    array.forEach(el => {
      createElement('li', listAttributes, list, el)
    })
  }

}
