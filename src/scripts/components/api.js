const { default: axios } = require('axios')
const url = 'src/data/recipes.json'
const { isIncluded, isFound, getLastItem } = require('./search')
const state = require('../components/state')

const getAllRecipes = () => axios.get(url).then(response => response.data.recipes)

const getSearchedRecipes = (value) => axios.get(url).then(response => {
  const allRecipes = response.data.recipes
  state.newResult = allRecipes.filter(recipe => isIncluded(recipe.name, value) || isIncluded(recipe.description, value) || isFound(recipe.ingredients, 'ingredient', value))
})

const getFilteredRecipes = (value, tag) => axios.get(url).then(response => {
  const allRecipes = response.data.recipes
  state.newResult = allRecipes.filter(recipe => isIncluded(recipe.name, value) || isIncluded(recipe.description, value) || isFound(recipe.ingredients, 'ingredient', value))
  state.finalResult = state.newResult.filter(recipe => isIncluded(recipe.appliance, getLastItem(state.tags.appliance)) && isFound(recipe.ingredients, 'ingredient', tag))
})

module.exports = {
  getAllRecipes, getSearchedRecipes, getFilteredRecipes
}
