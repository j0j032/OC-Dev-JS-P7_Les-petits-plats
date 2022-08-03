const { createElement } = require('../components/dom')
const domLinker = require('../components/domLinker')
const state = require('../components/state-Bis')

module.exports = {

  createFilters () {
    /**
     * TO CREATE EACH LIST OF FILTER ITEMS
     * @param {array} arr = list of filter items
     * @param {HTML el} parent = container to fill

     * THE FOLLOWING CONCERN tagEvent
     * @param {array} tagList to fill an array of tag when user select an item in the list
     * object tags in state.js = tags.ingredient, tags.appliance, tags.ustensil
     * @param {array} filterBtns to set every list item as an html node
     * list in state.js = tagIngList, tagAppList, tagUstList
     * @param {HTML el} selector to select each item as a btn and select and set a tag
     */
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
      closeTagEvent()
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

    /**
     * TO ADD EVENT LISTENER ON TAG'S CLOSE ICON
     */
    const closeTagEvent = () => {
      const removeTagBtn = document.querySelectorAll('.tag__close')
      removeTagBtn.forEach(el => { el.addEventListener('click', (e) => removeTag(e)) })
    }

    return { createFilterListDOM, createTag }
  }
}
