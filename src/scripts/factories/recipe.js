const dom = require('../components/dom')

module.exports = {

  createRecipeCard (data) {
    const { id, name, appliance, description, ingredients, servings, time, ustensils } = data
    const clock = '/src/assets/images/clock.svg'
    const timeDisplay = `${time} min`

    const cardAttributes = [{ class: 'recipe-card' }]
    const imgAttributes = [{ class: 'recipe-card__imgContainer' }]
    const infosAttributes = [{ class: 'recipe-card__infosContainer' }]
    const headAttributes = [{ class: 'recipe-card__headContainer' }]
    const timeContainerAttributes = [{ class: 'recipe-card__headContainer--timeContainer' }]
    const clockAttributes = [{ src: clock }]
    const subHeadAttributes = [{ class: 'recipe-card__subHeadContainer' }]
    const nameAttributes = [{ class: 'recipe-card__name' }]
    const timeAttributes = [{ class: 'recipe-card__time' }]
    const ingdtListAttributes = [{ class: 'recipe-card__subHeadContainer--list' }]
    const ingdtsAttributes = [{ class: 'recipe-card__ingdts' }]
    const descsAttributes = [{ class: 'recipe-card__desc' }]

    const getRecipeCardDOM = () => {
      const card = dom.createElement('div', cardAttributes, null, null)
      dom.createElement('div', imgAttributes, card, null)
      const infosContainer = dom.createElement('div', infosAttributes, card, null)
      const headingContainer = dom.createElement('div', headAttributes, infosContainer, null)
      dom.createElement('h3', nameAttributes, headingContainer, name)
      const timeContainer = dom.createElement('div', timeContainerAttributes, headingContainer, null)
      dom.createElement('img', clockAttributes, timeContainer, null)
      dom.createElement('p', timeAttributes, timeContainer, timeDisplay)
      const subHeadingContainer = dom.createElement('div', subHeadAttributes, infosContainer, null)
      const ingredientList = dom.createElement('ul', ingdtListAttributes, subHeadingContainer, null)
      dom.createElement('p', descsAttributes, subHeadingContainer, description)

      for (let i = 0; i < ingredients.length; i++) {
        const ingrdtDOM = `${ingredients[i].ingredient}: ${ingredients[i].quantity} ${ingredients[i].unit}`
        dom.createElement('li', ingdtsAttributes, ingredientList, ingrdtDOM)
      }

      return card
    }

    return { name, time, getRecipeCardDOM }
  }
}
