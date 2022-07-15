const { createElement } = require('../components/dom')

module.exports = {

  getIngredientList (data, array) {
    const { ingredients } = data

    for (const item of ingredients) {
      array.push(item.ingredient)
    }
  },

  getAppareilsList (data, array) {
    data.forEach(el => {
      array.push(el.appliance)
    })
  },

  getUstensilesList (data, array) {
    const { ustensils } = data
    ustensils.forEach(el => {
      array.push(el)
    })
  },

  createFilterListDOM (array, parent) {
    const listAttributes = [{ class: 'list list-X' }]
    const listItemAttributes = [{ class: 'list' }]
    const list = createElement('ul', listAttributes, parent, null)
    array.forEach(el => {
      createElement('li', listItemAttributes, list, el)
    })
  }
}
