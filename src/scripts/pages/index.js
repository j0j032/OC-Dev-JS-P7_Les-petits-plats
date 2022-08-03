const api = require('../components/api')
const state = require('../components/state')
const domLinker = require('../components/domLinker')
const { emptyDOM, toggleList, displayError } = require('../components/dom')
const { isIncluded } = require('../components/search')
const { createRecipeCard } = require('../factories/recipe')
const { createFilters } = require('../factories/filter')
const { ingredientsSearchBar, appareilsSearchBar, ustensilesSearchBar } = require('../components/domLinker')
const filterModel = createFilters()

/**
 * @param {Array} data - Array of Objects (from api: ingredients)
 */
const displayRecipes = (data) => {
  // to reset the container before display new results
  emptyDOM(domLinker.resultsContainer)
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}

// To get the results from API or display error if nothing found
const applySearchBarFilter = async () => {
  const recipes = await api.getRecipes(domLinker.searchBar.value, state.Tags)
  recipes.length === 0 ? displayError(domLinker.resultsContainer, 'Aucune recette trouvée') : displayRecipes(recipes)
}

/**
 * To set the listenner any time when a tag list has been displayed
 * @param {Array} tagList - from state.Tags Object - To target the right category
 * @param {Array} tagBtnList - To get an array of Btn in terms of a category and set the right selector when list of tags has been displayed
 * @param {HTML Element} selector - To target the goods btns in terms of category
 * @param {HTML Element} category - To set the class in terms of it's category (for exemple ingredients: to get it blue the classes are 'tag tag--ing' )
 */
const tagEvent = (tagList, tagBtnList, selector, category) => {
  tagBtnList = document.querySelectorAll(selector)
  tagBtnList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tagList.push(e.target.outerText)
      filterModel.createTag(e.target.outerText, category)
      applySearchBarFilter()
      closeTagEvent()

      // to close container when user select a tag
      const container = e.target.offsetParent.classList[1]
      switch (container) {
        case 'ingredients':
          toggleList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'ingrédient', 'Ingrédients')
          break
        case 'appareils':
          toggleList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'appareil', 'Appareils')
          break
        case 'ustensiles':
          toggleList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'ustensile', 'Ustensiles')
          break
      }
    })
  })
}
// To set listener on cross mark icons
const closeTagEvent = () => {
  const removeTagBtn = document.querySelectorAll('.tag__close')
  removeTagBtn.forEach(el => {
    el.addEventListener('click', (e) => {
      filterModel.removeTag(e)
      applySearchBarFilter()
    })
  })
}

/**
 * To search a tag when a list has been displayed
 * @param {Array} arr - Array of list item from filled from api
 * @param {String} value - Input value to search (from: component/search/isIncluded())
 * @param {HTML Element} container - To display the result (from: factories/filter/createFilterListDOM)
 * The 4th following are the parameters from tagEvent()
 * @param {Array} tagList
 * @param {Array} btnList
 * @param {HTML Element} selector
 * @param {HTML Element} category
 */
const tagSearch = (arr, value, container, tagList, btnList, selector, category) => {
  arr = arr.filter(item => isIncluded(item, value))
  emptyDOM(container)
  filterModel.createFilterListDOM(arr, container)
  tagEvent(tagList, btnList, selector, category)
  if (value.length >= 2 && arr.length === 0) {
    container.textContent = 'Aucun filtre'
  }
}

/**
 * THE 3 FOLLOWING ARE THE METHODS TO GET AND DISPLAY EACH TAGLIST USING THE SAME METHODS (one methods per category)
 * 1st: fill an array from api
 * 2nd: reset DOM and display the right content
 * 3rd: set the listenner to allow the creation of a tag on click
 * 4th: set the listenner to allow research in the list (always in terms of the value of the main searchbar input)
 */
const getAndDisplayIngredientsList = async () => {
  const tagIngBtnList = []
  let ingredients
  // eslint-disable-next-line prefer-const
  ingredients = await api.getIngredients(domLinker.searchBar.value, state.Tags, domLinker.ingredientsSearchBar.value)
  emptyDOM(domLinker.ingredientsList)
  ingredients.length === 0 ? displayError(domLinker.ingredientsList, 'Aucun résultat') : filterModel.createFilterListDOM(ingredients, domLinker.ingredientsList)

  tagEvent(state.Tags.ingredients, tagIngBtnList, '.ingredients__list>ul>li', 'tag tag--ing')

  ingredientsSearchBar.addEventListener('input', () => {
    tagSearch(ingredients, ingredientsSearchBar.value, domLinker.ingredientsList, state.Tags.ingredients, tagIngBtnList, '.ingredients__list>ul>li', 'tag tag--ing')
  })
}

const getAndDisplayAppliancesList = async () => {
  const tagAppBtnList = []
  let appliances
  // eslint-disable-next-line prefer-const
  appliances = await api.getAppliances(domLinker.searchBar.value, state.Tags, domLinker.appareilsSearchBar.value)
  emptyDOM(domLinker.appareilsList)
  appliances.length === 0 ? displayError(domLinker.appareilsList, 'Aucun résultat') : filterModel.createFilterListDOM(appliances, domLinker.appareilsList)

  tagEvent(state.Tags.appliances, tagAppBtnList, '.appareils__list>ul>li', 'tag tag--app')

  appareilsSearchBar.addEventListener('input', () => {
    tagSearch(appliances, appareilsSearchBar.value, domLinker.appareilsList, state.Tags.appliances, tagAppBtnList, '.appareils__list>ul>li', 'tag tag--app')
  })
}

const getAndDisplayUstensilsList = async () => {
  const tagUstBtnList = []
  let ustensiles
  // eslint-disable-next-line prefer-const
  ustensiles = await api.getUstensils(domLinker.searchBar.value, state.Tags, domLinker.ustensilesSearchBar.value)
  emptyDOM(domLinker.ustensilesList)
  ustensiles.length === 0 ? displayError(domLinker.ustensilesList, 'Aucun résultat') : filterModel.createFilterListDOM(ustensiles, domLinker.ustensilesList)

  tagEvent(state.Tags.ustensils, tagUstBtnList, '.ustensiles__list>ul>li', 'tag tag--ust')

  ustensilesSearchBar.addEventListener('input', () => {
    tagSearch(ustensiles, ustensilesSearchBar.value, domLinker.ustensilesList, state.Tags.ustensils, tagUstBtnList, '.ustensiles__list>ul>li', 'tag tag--ust')
  })
}

// To always get the right lists in terms of the main search bar input value
const getAllTagsList = () => {
  getAndDisplayIngredientsList()
  getAndDisplayAppliancesList()
  getAndDisplayUstensilsList()
}

const init = () => {
  window.onload = applySearchBarFilter()

  domLinker.searchBar.addEventListener('input', () => {
    applySearchBarFilter()
    getAllTagsList()
  })

  domLinker.arrowIcon.forEach(btn => btn.addEventListener('click', (e) => {
    const category = e.composedPath()[1].id

    switch (category) {
      case 'ingredients__iconBtn':
        toggleList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'ingrédient', 'Ingrédients')
        getAndDisplayIngredientsList()
        break
      case 'appareils__iconBtn':
        toggleList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'appareil', 'Appareils')
        getAndDisplayAppliancesList()
        break
      case 'ustensiles__iconBtn':
        toggleList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'ustensile', 'Ustensiles')
        getAndDisplayUstensilsList()
        break
    }
  }))
}
init()
