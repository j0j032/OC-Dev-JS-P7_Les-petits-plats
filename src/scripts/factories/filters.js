const { createElement, emptyDOM, isIncluded, isFound, noResult } = require('../components/dom')
const domLinker = require('../components/domLinker')
const state = require('../components/state')
const { createRecipeCard } = require('./recipe')

module.exports = {

  createFilters () {
    /**
     * TO GET ALL INGREDIENTS
     * @param {Object} data getData from recipes.json
     * @param {array} newArr array of ingredients
     */
    const getIngredientList = (data, newArr) => {
      const { ingredients } = data
      for (const item of ingredients) {
        newArr.push(item.ingredient)
      }
    }
    /**
     * TO GET ALL APPLIANCE
     * @param {Object} data getData from recipes.json
     * @param {array} newArr array of appliances
     */
    const getAppareilsList = (data, newArr) => {
      data.forEach(el => {
        newArr.push(el.appliance)
      })
    }
    /**
     * TO GET ALL USTENSILS
     * @param {Object} data getData from recipes.json
     * @param {array} newArr array of ustensils
     */
    const getUstensilesList = (data, newArr) => {
      const { ustensils } = data
      ustensils.forEach(el => {
        newArr.push(el)
      })
    }
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
    const createFilterListDOM = (arr, parent, tagList, filterBtns, selector) => {
      const listAttributes = [{ class: 'list' }]
      const list = createElement('ul', listAttributes, parent, null)
      arr.forEach(el => {
        createElement('li', listAttributes, list, el)
      })
      tagEvent(tagList, filterBtns, selector)
    }

    /**
     * TO DISPLAY INGREDIENT FILTER LIST
     * @param {Object} data getData from recipes.json
     */
    const displayIngredientList = (data) => {
      data.forEach(recipe => {
        getIngredientList(recipe, state.allIngredients)
      })
      state.allIngredients = [...new Set(state.allIngredients)]
      createFilterListDOM(state.allIngredients, domLinker.ingredientsList, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li')
      console.log(state.allIngredients)
    }
    /**
     * TO DISPLAY APPLIANCE FILTER LIST
     * @param {Object} data getData from recipes.json
     */
    const displayAppareilsList = (data) => {
      getAppareilsList(data, state.allAppareils)
      state.allAppareils = [...new Set(state.allAppareils)]
      createFilterListDOM(state.allAppareils, domLinker.appareilsList, state.tags.appliance, state.tagAppList, '.appareils__list>ul>li')
    }
    /**
     * TO DISPLAY USTENSIL FILTER LIST
     * @param {Object} data getData from recipes.json
     */
    const displayUstensilsList = (data) => {
      data.forEach(recipe => {
        getUstensilesList(recipe, state.allUstensils)
      })
      state.allUstensils = [...new Set(state.allUstensils)]
      createFilterListDOM(state.allUstensils, domLinker.ustensilesList, state.tags.ustensil, state.tagUstList, '.ustensiles__list>ul>li')
    }

    const filterBtnPositionShown = () => {
      if (domLinker.ingredientsList.classList.contains('show')) {
        hideList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'Ustensiles')
        hideList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'Appareils')
        domLinker.appareilsClosedBtn.classList.add('adapt__app--toIng')
      }
      if (domLinker.appareilsList.classList.contains('show')) {
        hideList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'Ustensiles')
        hideList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'Ingrédients')
        domLinker.appareilsClosedBtn.classList.add('adapt__app--toSelf')
        domLinker.ustensilesClosedBtn.classList.add('adapt__ust--toApp')
      }
      if (domLinker.ustensilesList.classList.contains('show')) {
        hideList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'Appareils')
        hideList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'Ingrédients')
        domLinker.ustensilesClosedBtn.classList.add('adapt__ust--toSelf')
      }
    }
    const filterBtnPositionHidden = () => {
      if (domLinker.appareilsClosedBtn.classList.contains('adapt__app--toIng')) {
        domLinker.appareilsClosedBtn.classList.remove('adapt__app--toIng')
      } else if (domLinker.appareilsClosedBtn.classList.contains('adapt__app--toSelf')) {
        domLinker.appareilsClosedBtn.classList.remove('adapt__app--toSelf')
        domLinker.ustensilesClosedBtn.classList.remove('adapt__ust--toApp')
      } else if (domLinker.ustensilesClosedBtn.classList.contains('adapt__ust--toSelf')) {
        domLinker.ustensilesClosedBtn.classList.remove('adapt__ust--toSelf')
      }
    }

    // THE 3 FOLLOWING ARE TO TOGGLE DISPLAY FILTERLIST
    /**
     * DISPLAY
     * @param {HTML el} btn to toggle (icon)
     * @param {HTML el} list container to display list
     * @param {HTML el} container main container to set visibility
     * @param {HTML el} placeHolder to set and allow user search input
     * @param {string} textSearch to set placholder text when search is available
     */
    const displayList = (btn, list, container, placeHolder, textSearch) => {
      btn.style.transform = 'rotate(180deg)'
      list.classList.add('show')
      filterBtnPositionShown()
      list.classList.remove('hidden')
      container.classList.add('absolute')
      placeHolder.classList.add('show')
      placeHolder.removeAttribute('disabled')
      placeHolder.setAttribute('placeholder', `Rechercher un ${textSearch}`)
      placeHolder.focus()
      displayIngredientList(state.searchRecipes)
    }
    /**
     * HIDE
     * @param {HTML el} btn to toggle (icon)
     * @param {HTML el} list container to display list
     * @param {HTML el} container main container to set visibility
     * @param {HTML el} placeHolder to set and allow user search input
     * @param {string} textDefault to displayBack the btn text
     */
    const hideList = (btn, list, container, placeHolder, textDefault) => {
      btn.style.transform = 'rotate(0deg)'
      list.classList.remove('show')
      filterBtnPositionHidden()
      list.classList.add('hidden')
      list.classList.remove('onSearch')
      container.classList.remove('absolute')
      placeHolder.classList.remove('show')
      placeHolder.setAttribute('disabled', '')
      placeHolder.setAttribute('placeholder', textDefault)
      placeHolder.value = ''
    }
    // SAME PARAM AS DISPLAY AND HIDE
    const toggleList = (btn, list, container, placeHolder, textSearch, textDefault) => {
      if (list.classList.contains('hidden')) {
        displayList(btn, list, container, placeHolder, textSearch)
      } else {
        hideList(btn, list, container, placeHolder, textDefault)
      }
    }

    /**
     * TO SET TAG EVENT LISTENER TO FILTERLIST ITEM WHEN CREATE
     * @param {array} tagList to fill an array of tag when user select an item in the list
     * object tags in state.js = tags.ingredient, tags.appliance, tags.ustensil
     * @param {array} filterBtns to set every list item as an html node
     * list in state.js = tagIngList, tagAppList, tagUstList
     * @param {HTML el} selector to select each item as a btn and select and set a tag
     */
    const tagEvent = (tagList, filterBtns, selector) => {
      filterBtns = document.querySelectorAll(selector)
      filterBtns.forEach(el => { el.addEventListener('click', (e) => getTag(tagList, e.target.outerText, e.target)) })
    }

    /**
     * TO GET LAST ITEM OF AN ARRAY (used in getTag method)
     * @param {array}
     * @returns last item
     */
    const getLastItem = (arr) => {
      const lastItem = arr[arr.length - 1]
      return lastItem
    }

    /**
     * TO CREATE A TAG
     * @param {string} value = take last item of an array of tag
     * @param {string} category = to set class attribute in function of tag category
     */
    const createTag = (value, category) => {
      const tagAttribute = [{ class: category }]
      const closeAttribute = [{ class: 'tag__close bi bi-x-circle' }]
      const tag = createElement('span', tagAttribute, domLinker.tagsContainer, value)
      createElement('i', closeAttribute, tag, null)
      closeTagEvent()
    }

    /**
     * TO UPDATE DISPLAY DATA AFTER TAG CHANGES
     */
    const displayUpdateDOM = () => {
      emptyDOM(domLinker.resultsContainer)
      state.newResult.forEach(recipe => {
        const recipeModel = createRecipeCard(recipe)
        const recipeCardDOM = recipeModel.getRecipeCardDOM()
        domLinker.resultsContainer.appendChild(recipeCardDOM)
      })
    }

    /**
     * THE 3 FOLLOWING:
     * FILTERS TO APPLY IN FUNCTION OF TAGS
     */
    // for appliances tag
    const applyFilterApp = () => {
      state.newResult = state.newResult.filter(recipe => isIncluded(recipe.appliance, getLastItem(state.tags.appliance)))
      displayUpdateDOM()
      console.log('NewResult', state.newResult)
    }
    // for ingredients tag
    const applyFilterIng = () => {
      state.tags.ingredient.forEach(tag => {
        state.newResult = state.newResult.filter(recipe => isFound(recipe.ingredients, 'ingredient', tag))
      })
      displayUpdateDOM()
      console.log('NewResult', state.newResult)
    }
    // for ustensils tag
    const applyFilterUst = () => {
      state.newResult = state.newResult.filter(recipe => recipe.ustensils.includes(getLastItem(state.tags.ustensil)))
      displayUpdateDOM()
      console.log('NewResult', state.newResult)
    }

    /**
     * TO GET TAG IN DOM
     * @param {array} tagList to target the good list of tag
     * @param {string} value tag value to compare to filterList
     * @param {HTML el} target to remove item from the list when selected
     */
    const getTag = (tagList, value, target) => {
      if (state.tags.ingredient.length === 0 && state.tags.appliance.length === 0 && state.tags.ustensil.length === 0) {
        state.newResult = state.allRecipes
      }
      tagList.push(value)
      if (state.allIngredients.includes(value)) {
        createTag(getLastItem(tagList), 'tag tag--ing')
        applyFilterIng()
        toggleList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'ingrédient', 'Ingrédients')
      } else if (state.allAppareils.includes(value)) {
        createTag(getLastItem(tagList), 'tag tag--app')
        applyFilterApp()
        toggleList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'appareil', 'Appareils')
      } else if (state.allUstensils.includes(value)) {
        createTag(getLastItem(tagList), 'tag tag--ust')
        applyFilterUst()
        toggleList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'ustensile', 'Ustensiles')
      }
      if (state.newResult.length === 0) {
        domLinker.resultsContainer.textContent = 'Aucune recette ne correspond à votre recherche'
      }
      target.remove()
    }

    /**
     * TO DISPLAY ALL RECIPES BY DEFAULT IF NO TAGS SELECTED OR DISPLAY FILTERED DATA IF STILL TAG AFTER REMOVE A TAG
     */
    const displayBackAllRecipes = () => {
      if (state.tags.appliance.length === 0 && state.tags.ingredient.length === 0 && state.tags.ustensil.length === 0) {
        state.newResult = state.allRecipes
      } else {
        state.newResult = state.allRecipes
        for (const category of Object.keys(state.tags)) {
          const content = state.tags[category]
          content.forEach(el => {
            state.newResult = state.newResult.filter(recipe => isIncluded(recipe.appliance, el) || isFound(recipe.ingredients, 'ingredient', el) || recipe.ustensils.includes(el))
          })
        }
      }
      displayUpdateDOM()
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

      displayBackAllRecipes()
      if (state.newResult.length === 0) {
        noResult(domLinker.resultsContainer)
      }
    }

    /**
     * TO ADD EVENT LISTENER ON TAG'S CLOSE ICON
     */
    const closeTagEvent = () => {
      const removeTagBtn = document.querySelectorAll('.tag__close')
      removeTagBtn.forEach(el => { el.addEventListener('click', (e) => removeTag(e)) })
    }

    return { createFilterListDOM, displayIngredientList, displayAppareilsList, displayUstensilsList, toggleList, createTag }
  }
}
