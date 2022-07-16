const { createElement } = require('../components/dom')
const domLinker = require('../components/domLinker')

const state = require('../components/state')

module.exports = {

  createFiltersList () {
    const getIngredientList = (data, array) => {
      const { ingredients } = data
      for (const item of ingredients) {
        array.push(item.ingredient)
      }
    }

    const getAppareilsList = (data, array) => {
      data.forEach(el => {
        array.push(el.appliance)
      })
    }

    const getUstensilesList = (data, array) => {
      const { ustensils } = data
      ustensils.forEach(el => {
        array.push(el)
      })
    }

    // display lists methods

    const createFilterListDOM = (array, parent, tagList, filterBtns, selector) => {
      const listAttributes = [{ class: 'list' }]
      const list = createElement('ul', listAttributes, parent, null)
      array.forEach(el => {
        createElement('li', listAttributes, list, el)
      })
      tagEvent(tagList, filterBtns, selector)
    }

    const displayIngredientList = (data) => {
      data.forEach(recipe => {
        getIngredientList(recipe, state.allIngredients)
      })
      state.allIngredients = [...new Set(state.allIngredients)]
      createFilterListDOM(state.allIngredients, domLinker.ingredientsList, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li')
    }

    const displayAppareilsList = (data) => {
      getAppareilsList(data, state.allAppareils)
      state.allAppareils = [...new Set(state.allAppareils)]
      createFilterListDOM(state.allAppareils, domLinker.appareilsList, state.tags.appliance, state.tagAppList, '.appareils__list>ul>li')
    }

    const displayUstensilsList = (data) => {
      data.forEach(recipe => {
        getUstensilesList(recipe, state.allUstensils)
      })
      state.allUstensils = [...new Set(state.allUstensils)]
      createFilterListDOM(state.allUstensils, domLinker.ustensilesList, state.tags.ustensil, state.tagUstList, '.ustensiles__list>ul>li')
    }

    // display DOM filters list Methods

    const displayList = (btn, list, container, placeHolder, textSearch) => {
      btn.style.transform = 'rotate(180deg)'
      list.classList.add('show')
      list.classList.remove('hidden')
      container.classList.add('absolute')
      placeHolder.classList.add('show')
      placeHolder.removeAttribute('disabled')
      placeHolder.setAttribute('placeholder', `Rechercher un ${textSearch}`)
      placeHolder.focus()
    }
    const hideList = (btn, list, container, placeHolder, textDefault) => {
      btn.style.transform = 'rotate(0deg)'
      list.classList.remove('show')
      list.classList.add('hidden')
      list.classList.remove('onSearch')
      container.classList.remove('absolute')
      placeHolder.classList.remove('show')
      placeHolder.setAttribute('disabled', '')
      placeHolder.setAttribute('placeholder', textDefault)
      placeHolder.value = ''
    }

    const toggleList = (btn, list, container, placeHolder, textSearch, textDefault) => {
      if (list.classList.contains('hidden')) {
        displayList(btn, list, container, placeHolder, textSearch)
      } else {
        hideList(btn, list, container, placeHolder, textDefault)
      }
    }

    // Tag Methods
    const getLastItem = (arr) => {
      const lastItem = arr[arr.length - 1]
      return lastItem
    }

    const createTag = (value, parent, category) => {
      const tagAttribute = [{ class: category }]
      const closeAttribute = [{ class: 'tag__close bi bi-x-circle' }]
      const tag = createElement('span', tagAttribute, parent, value)
      createElement('i', closeAttribute, tag, null)
    }

    const getTag = (tagList, value) => {
      tagList.push(value)
      if (state.allIngredients.includes(value)) {
        createTag(getLastItem(tagList), domLinker.tagsContainer, 'tag tag--ing')
      } else if (state.allAppareils.includes(value)) {
        createTag(getLastItem(tagList), domLinker.tagsContainer, 'tag tag--app')
      } else if (state.allUstensils.includes(value)) {
        createTag(getLastItem(tagList), domLinker.tagsContainer, 'tag tag--ust')
      }
      console.log(state.tags)
    }

    const tagEvent = (tagList, filterBtns, selector) => {
      filterBtns = document.querySelectorAll(selector)
      filterBtns.forEach(el => { el.addEventListener('click', (e) => getTag(tagList, e.target.outerText)) })
    }

    return { createFilterListDOM, displayIngredientList, displayAppareilsList, displayUstensilsList, toggleList, createTag }
  }
}
