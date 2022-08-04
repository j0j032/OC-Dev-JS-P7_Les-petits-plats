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
 * To display messages if no results found
 * @param {HTML Element} container - to display messsage
 * @param {String} text - to write the message
 */
const displayError = (container, text) => {
  container.textContent = text
}

// THE 3 FOLLOWING ARE TO TOGGLE DISPLAY FILTERLIST
/**
     * DISPLAY
     * @param {HTML Element} btn -  to toggle (icon)
     * @param {HTML Element} list - container to display list
     * @param {HTML Element} container - main container to set visibility
     * @param {HTML Element} placeHolder - to set and allow user search input
     * @param {string} textSearch - to set placholder text when search is available
     */
const displayList = (btn, list, container, placeHolder, textSearch) => {
  btn.style.transform = 'rotate(180deg)'
  list.classList.add('show')
  list.classList.remove('hidden')
  container.classList.add('display')
  placeHolder.classList.add('show')
  placeHolder.removeAttribute('disabled')
  placeHolder.setAttribute('placeholder', `Rechercher un ${textSearch}`)
  placeHolder.focus()
}
/**
     * HIDE
     * @param {HTML Element} btn - to toggle (icon)
     * @param {HTML Element} list - container to display list
     * @param {HTML Element} container - main container to set visibility
     * @param {HTML Element} placeHolder - to set and allow user search input
     * @param {string} textDefault - to displayBack the btn text
     */
const hideList = (btn, list, container, placeHolder, textDefault) => {
  btn.style.transform = 'rotate(0deg)'
  list.classList.remove('show')
  list.classList.add('hidden')
  list.classList.remove('onSearch')
  container.classList.remove('display')
  placeHolder.classList.remove('show')
  placeHolder.setAttribute('disabled', '')
  placeHolder.setAttribute('placeholder', textDefault)
  placeHolder.value = ''
}
// SAME PARAM AS DISPLAY AND HIDE
const toggleList = (btn, list, container, placeHolder, textSearch, textDefault) => {
  if (list.classList.contains('hidden')) {
    displayList(btn, list, container, placeHolder, textSearch)
  } else {
    hideList(btn, list, container, placeHolder, textDefault)
  }
}

module.exports = {
  createElement, emptyDOM, toggleList, displayError
}
