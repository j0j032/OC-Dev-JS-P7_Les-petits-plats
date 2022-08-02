const { default: axios } = require('axios')
const url = 'src/data/recipes.json'
const { isIncluded, isFound, getLastItem, filterMainSearchBar, filterByTags } = require('./search')
const state = require('../components/state')
const tagsDefault = {
  ingredient: [],
  appliances: [],
  ustensils: []
}

const getRecipes = (value = '', tags = tagsDefault) => axios.get(url).then(response => {
  console.log('tags:', tags)
  const result = value.length >= 3 ? filterMainSearchBar(response.data, value) : response.data
  return filterByTags(result, tags)
})

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
  getAllRecipes, getSearchedRecipes, getFilteredRecipes, getRecipes
}
