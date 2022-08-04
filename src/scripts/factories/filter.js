const { createElement } = require('../components/dom')
const domLinker = require('../components/domLinker')
const state = require('../components/state')

module.exports = {

  createFilters () {
    /**
     * To create a list of tags in terms of category
     * @param {Array} arr - Array of category (ingredients, apliances, ustensils)
     * @param {String} category - String to set the right class in terms of category
     * @param {HTMLElement} parent - container to display the list
     */
    const createFilterListDOM = (arr, category = '', parent) => {
      let listAttributes
      switch (category) {
        case 'ingredients':
          listAttributes = [{ class: 'list list--ing' }]
          break
        case 'appliances':
          listAttributes = [{ class: 'list list--app' }]
          break
        case 'ustensils':
          listAttributes = [{ class: 'list list--ust' }]
          break
      }
      const list = createElement('ul', listAttributes, parent, null)
      arr.forEach(el => {
        createElement('li', listAttributes, list, el)
      })
    }

    /**
     * @param {String} value - To get the name of the tag
     * @param {Class} category - To set the style of the tag in terms of its category
     */
    const createTag = (value, category) => {
      const tagAttribute = [{ class: category }]
      const closeAttribute = [{ class: 'tag__close bi bi-x-circle' }]
      const tag = createElement('span', tagAttribute, domLinker.tagsContainer, value)
      createElement('i', closeAttribute, tag, null)
    }
    /**
     * @param {Prototype} event - from event Listener to get the name of the tag and the container to delete
     */
    const removeTag = (event) => {
      const tagName = event.target.parentElement.firstChild.data
      const tagDom = event.target.parentElement

      for (const category of Object.keys(state.Tags)) {
        const content = state.Tags[category]
        content.forEach(el => {
          const tagToDelete = content.indexOf(tagName)
          if (tagToDelete !== -1) {
            content.splice(tagToDelete, 1)
          }
        })
      }
      tagDom.remove()
    }

    return { createFilterListDOM, createTag, removeTag }
  }
}
