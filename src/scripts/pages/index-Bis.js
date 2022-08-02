const api = require('../components/api-Bis')
const domLinker = require('../components/domLinker')
const { emptyDOM, toggleList, noResult } = require('../components/dom')
const { createRecipeCard } = require('../factories/recipe')
const state = require('../components/state-Bis')
const { createFilters } = require('../factories/filters')
const filterModel = createFilters()

const displayRecipes = (data) => {
  emptyDOM(domLinker.resultsContainer)
  data.forEach(recipe => {
    const recipeModel = createRecipeCard(recipe)
    const recipeCardDOM = recipeModel.getRecipeCardDOM()
    domLinker.resultsContainer.appendChild(recipeCardDOM)
  })
}

const applySearchBarFilter = async () => {
  const recipes = await api.getRecipes(domLinker.searchBar.value, state.tags)
  state.newRecipes = recipes
  if (recipes.length === 0) {
    noResult(domLinker.resultsContainer, 'Aucune recette trouvée')
    noResult(domLinker.appareilsList, 'Aucun résultat')
    noResult(domLinker.ustensilesList, 'Aucun résultat')
    noResult(domLinker.ingredientsList, 'Aucun résultat')
  } else {
    displayRecipes(recipes)
  }
}

const displayIngredientsList = async () => {
  let ingredients
  // eslint-disable-next-line prefer-const
  ingredients = await api.getIngredients(domLinker.searchBar.value, state.tags, domLinker.ingredientsSearchBar.value)
  emptyDOM(domLinker.ingredientsList)
  filterModel.createFilterListDOM(ingredients, domLinker.ingredientsList, state.tags.ingredient, state.tagIngList, '.ingredients__list>ul>li')
}

domLinker.arrowIcon.forEach(btn => btn.addEventListener('click', (e) => {
  const category = e.composedPath()[1].id

  switch (category) {
    case 'ingredients__iconBtn':
      toggleList(domLinker.ingredientsIconBtn, domLinker.ingredientsList, domLinker.ingredients, domLinker.ingredientsSearchBar, 'ingrédient', 'Ingrédients')
      displayIngredientsList()
      break
    case 'appareils__iconBtn':
      toggleList(domLinker.appareilsIconBtn, domLinker.appareilsList, domLinker.appareils, domLinker.appareilsSearchBar, 'appareil', 'Appareils')
      break
    case 'ustensiles__iconBtn':
      toggleList(domLinker.ustensilesIconBtn, domLinker.ustensilesList, domLinker.ustensiles, domLinker.ustensilesSearchBar, 'ustensile', 'Ustensiles')
      break
  }
}))

window.onload = (applySearchBarFilter(), api.logDatas())
domLinker.searchBar.addEventListener('input', () => {
  applySearchBarFilter()
  displayIngredientsList()
})
