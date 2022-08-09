/**
 * To create DOM new Element
 * @param {HTMLElement} tag - tagName (h1,div,span...)
 * @param {array} attributes - Set attributes in an array of object: key for attribute type / value for the value of attribute
 * @param {HTMLElement} parent - To attach new element to parrent
 * @param {*} text - To set value of text if needed (if text? enter tour text/ if div set to null or '')
 * @returns new element
 */
const createElement = (tag, attributes = [], parent, text) => {
  const element = document.createElement(tag)

  for (const attribute of attributes) {
    const key = Object.keys(attribute)
    element.setAttribute(key, attribute[key])
  }

  if (text) {
    element.textContent = text
  }

  if (parent) {
    parent.appendChild(element)
  }

  return element
}

/**
 * Remove all first child from an element quoted in parameter
 * @param {HTMLElement} el - target element html with all first child to remove
 */
const emptyDOM = el => {
  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }
}

/**
 * To toggle easily between 2 classes
 * @param {HTML Element} parent
 * @param {HTML Element} classToAdd
 * @param {HTML Element} classToRemove
 */
const toggleClass = (parent, classToAdd, classToRemove) => {
  parent.classList.add(classToAdd)
  parent.classList.remove(classToRemove)
}

/**
 * To display messages if no results found
 * @param {HTML Element} parent- to display messsage
 * @param {String} text - to write the message
 */
const displayError = (parent, text) => {
  const errorAttributes = [{ class: 'error' }]
  emptyDOM(parent)
  createElement('div', errorAttributes, parent, text)
}

/**
     *To open and set the container the when user click on filters btns
     * @param {HTML Element} btn -  to toggle (icon)
     * @param {HTML Element} list - container to display list
     * @param {HTML Element} container - main container to set visibility
     * @param {HTML Element} placeHolder - to set and allow user search input
     * @param {string} textSearch - to set placholder text when search is available
     */
const toggleList = (btn, list, container, placeHolder, textSearch, textDefault) => {
  if (list.classList.contains('hidden')) {
    btn.style.transform = 'rotate(-180deg)'
    list.classList.toggle('show')
    list.classList.toggle('hidden')
    container.classList.toggle('display')
    placeHolder.classList.toggle('show')
    placeHolder.removeAttribute('disabled')
    placeHolder.setAttribute('placeholder', `Rechercher un ${textSearch}`)
    placeHolder.focus()
  } else {
    btn.style.transform = 'rotate(0deg)'
    list.classList.toggle('show')
    list.classList.toggle('hidden')
    container.classList.toggle('display')
    placeHolder.classList.toggle('show')
    list.classList.remove('onSearch')
    placeHolder.setAttribute('disabled', '')
    placeHolder.setAttribute('placeholder', textDefault)
    placeHolder.value = ''
  }
}

/**
 * To play animation on event
 * @param {HTML Element} el - element to animate
 * @param {String} animation - Class to add to play animation
 */
const playAnimation = (el, animation) => {
  el.classList.add(animation)
  setTimeout(() => {
    el.classList.remove(animation)
  }, '1000')
}

module.exports = {
  createElement, emptyDOM, toggleClass, toggleList, displayError, playAnimation
}
