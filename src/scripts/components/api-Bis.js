const { default: axios } = require('axios')
const { mainSearch, filterByLength } = require('./search-Bis')
const url = 'src/data/recipes.json'

const getRecipes = (value) => axios.get(url).then(response => {
    const result = value.length >= 3 ? mainSearch(response.data.recipes, value) : response.data.recipes
    return filterByLength(result)
})

module.exports = { getRecipes }
