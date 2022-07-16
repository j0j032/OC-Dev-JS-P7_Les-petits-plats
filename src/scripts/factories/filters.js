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

    const createFilterListDOM = (array, parent) => {
      const listAttributes = [{ class: 'list-X' }]
      const listItemAttributes = [{ class: 'list' }]
      const list = createElement('ul', listAttributes, parent, null)
      array.forEach(el => {
        createElement('li', listItemAttributes, list, el)
      })
    }

    const displayIngredientList = (data) => {
      data.forEach(recipe => {
        getIngredientList(recipe, state.allIngredients)
      })
      state.allIngredients = [...new Set(state.allIngredients)]
      createFilterListDOM(state.allIngredients, domLinker.ingredientsList)
    }

    const displayAppareilsList = (data) => {
      getAppareilsList(data, state.allAppareils)
      state.allAppareils = [...new Set(state.allAppareils)]
      createFilterListDOM(state.allAppareils, domLinker.appareilsList)
    }

    const displayUstensilsList = (data) => {
      data.forEach(recipe => {
        getUstensilesList(recipe, state.allUstensils)
      })
      state.allUstensils = [...new Set(state.allUstensils)]
      createFilterListDOM(state.allUstensils, domLinker.ustensilesList)
    }

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

    const createTag = (value, parent) => {
      const tagAttribute = [{ class: 'tag' }]
      createElement('span', tagAttribute, parent, value)
    }

    return { createFilterListDOM, displayIngredientList, displayAppareilsList, displayUstensilsList, toggleList, createTag }
  }
}
