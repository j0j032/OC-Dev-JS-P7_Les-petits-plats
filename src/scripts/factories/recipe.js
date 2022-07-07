const dom = require('../components/dom')

module.exports = {

  createRecipeCard (data) {
    const { id, name, appliance, description, ingredients, servings, time, ustensils } = data

    const cardAttributes = [{ class: 'recipe-card' }]
    const imgAttributes = [{ class: 'recipe-card__imgContainer' }]
    const infosAttributes = [{ class: 'recipe-card__infosContainer' }]
    const headAttributes = [{ class: 'recipe-card__headContainer' }]
    const subHeadAttributes = [{ class: 'recipe-card__subHeadContainer' }]
    const nameAttributes = [{ class: 'recipe-card__name' }]
    const timeAttributes = [{ class: 'recipe-card__time' }]
    const ingdtsAttributes = [{ class: 'recipe-card__ingdts' }]
    const descsAttributes = [{ class: 'recipe-card__desc' }]

    const getRecipeCardDOM = () => {
      const card = dom.createElement('div', cardAttributes, null, null)
      dom.createElement('div', imgAttributes, card, null)
      const infosContainer = dom.createElement('div', infosAttributes, card, null)
      const headingContainer = dom.createElement('div', headAttributes, infosContainer, null)
      // const subHeadingContainer = dom.createElement('div', subHeadAttributes, infosContainer, null)
      dom.createElement('h3', nameAttributes, headingContainer, name)
      dom.createElement('p', timeAttributes, headingContainer, time)

      return card
    }
    return { name, time, getRecipeCardDOM }
  }
}
