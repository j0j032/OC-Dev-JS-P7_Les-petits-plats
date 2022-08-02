const { default: axios } = require('axios')
const { mainSearch, tagFilter } = require('./search-Bis')
const url = 'src/data/recipes.json'
const tagsDefault = {
  ingredients: [],
  appliances: [],
  ustensils: []
}

const logDatas = () => axios.get(url).then(response => { console.log(response.data.recipes) })

const getRecipes = (value = '', tags = tagsDefault) => axios.get(url).then(response => {
  const result = value.length >= 3 ? mainSearch(response.data.recipes, value) : response.data.recipes
  return tagFilter(result, tags)
})

module.exports = { logDatas, getRecipes }
