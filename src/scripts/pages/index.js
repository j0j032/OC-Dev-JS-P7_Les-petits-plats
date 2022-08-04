const api = require('../components/api')
const state = require('../components/state')
const domLinker = require('../components/domLinker')
const { emptyDOM, toggleList, displayError } = require('../components/dom')
const { isIncluded } = require('../components/search')
const { createRecipeCard } = require('../factories/recipe')
const { createFilters } = require('../factories/filter')
const { ingredientsSearchBar, appliancesSearchBar, ustensilesSearchBar } = require('../components/domLinker')
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
      const container = e.target.classList[1]
      switch (container) {
        case 'list--ing':
          toggleList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'ingrédient', 'Ingrédients')
          break
        case 'list--app':
          toggleList(domLinker.appliancesIconBtn, domLinker.appliancesList, domLinker.appliances, domLinker.appliancesSearchBar, 'appliance', 'appliances')
          break
        case 'list--ust':
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
 * @param {String} categoryList - To set the right class to the lists in terms of category
 * @param {HTML Element} container - To display the result (from: factories/filter/createFilterListDOM)
 * The 4th following are the parameters from tagEvent()
 * @param {Array} tagList
 * @param {Array} btnList
 * @param {HTML Element} selector
 * @param {HTML Element} categoryTag
 */
const tagSearch = (arr, value, categoryList, container, tagList, btnList, selector, categoryTag) => {
  arr = arr.filter(item => isIncluded(item, value))
  emptyDOM(container)
  filterModel.createFilterListDOM(arr, categoryList, container)
  tagEvent(tagList, btnList, selector, categoryTag)
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
  ingredients.length === 0 ? displayError(domLinker.ingredientsList, 'Aucun résultat') : filterModel.createFilterListDOM(ingredients, 'ingredients', domLinker.ingredientsList)

  tagEvent(state.Tags.ingredients, tagIngBtnList, '.ingredients__list>ul>li', 'tag tag--ing')

  ingredientsSearchBar.addEventListener('input', () => {
    tagSearch(ingredients, ingredientsSearchBar.value, 'ingredients', domLinker.ingredientsList, state.Tags.ingredients, tagIngBtnList, '.ingredients__list>ul>li', 'tag tag--ing')
  })
}

const getAndDisplayAppliancesList = async () => {
  const tagAppBtnList = []
  let appliances
  // eslint-disable-next-line prefer-const
  appliances = await api.getAppliances(domLinker.searchBar.value, state.Tags, domLinker.appliancesSearchBar.value)
  emptyDOM(domLinker.appliancesList)
  appliances.length === 0 ? displayError(domLinker.appliancesList, 'Aucun résultat') : filterModel.createFilterListDOM(appliances, 'appliances', domLinker.appliancesList)

  tagEvent(state.Tags.appliances, tagAppBtnList, '.appliances__list>ul>li', 'tag tag--app')

  appliancesSearchBar.addEventListener('input', () => {
    tagSearch(appliances, appliancesSearchBar.value, 'appliances', domLinker.appliancesList, state.Tags.appliances, tagAppBtnList, '.appliances__list>ul>li', 'tag tag--app')
  })
}

const getAndDisplayUstensilsList = async () => {
  const tagUstBtnList = []
  let ustensiles
  // eslint-disable-next-line prefer-const
  ustensiles = await api.getUstensils(domLinker.searchBar.value, state.Tags, domLinker.ustensilesSearchBar.value)
  emptyDOM(domLinker.ustensilesList)
  ustensiles.length === 0 ? displayError(domLinker.ustensilesList, 'Aucun résultat') : filterModel.createFilterListDOM(ustensiles, 'ustensils', domLinker.ustensilesList)

  tagEvent(state.Tags.ustensils, tagUstBtnList, '.ustensiles__list>ul>li', 'tag tag--ust')

  ustensilesSearchBar.addEventListener('input', () => {
    tagSearch(ustensiles, ustensilesSearchBar.value, 'ustensils', domLinker.ustensilesList, state.Tags.ustensils, tagUstBtnList, '.ustensiles__list>ul>li', 'tag tag--ust')
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
      case 'appliances__iconBtn':
        toggleList(domLinker.appliancesIconBtn, domLinker.appliancesList, domLinker.appliances, domLinker.appliancesSearchBar, 'appliance', 'appliances')
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
