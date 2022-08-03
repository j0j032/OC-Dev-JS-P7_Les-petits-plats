const { createElement } = require('../components/dom')
const domLinker = require('../components/domLinker')
const state = require('../components/state-Bis')

module.exports = {

  createFilters () {
    const createFilterListDOM = (arr, parent) => {
      const listAttributes = [{ class: 'list' }]
      const list = createElement('ul', listAttributes, parent, null)
      arr.forEach(el => {
        createElement('li', listAttributes, list, el)
      })
    }

    const createTag = (value, category) => {
      console.log('create', value)
      const tagAttribute = [{ class: category }]
      const closeAttribute = [{ class: 'tag__close bi bi-x-circle' }]
      const tag = createElement('span', tagAttribute, domLinker.tagsContainer, value)
      createElement('i', closeAttribute, tag, null)
    }

    /**
     * TO REMOVE A TAG
     * @param {EVENT} get event methods
     */
    const removeTag = (event) => {
      const tagName = event.target.parentElement.firstChild.data
      const tagDom = event.target.parentElement

      for (const category of Object.keys(state.tags)) {
        const content = state.tags[category]
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
