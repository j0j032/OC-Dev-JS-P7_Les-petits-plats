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

const emptyDOM = el => {
  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }
}

const noResult = (container, text) => {
  container.textContent = text
}

// THE 3 FOLLOWING ARE TO TOGGLE DISPLAY FILTERLIST
/**
     * DISPLAY
     * @param {HTML el} btn to toggle (icon)
     * @param {HTML el} list container to display list
     * @param {HTML el} container main container to set visibility
     * @param {HTML el} placeHolder to set and allow user search input
     * @param {string} textSearch to set placholder text when search is available
     */
const displayList = (btn, list, container, placeHolder, textSearch) => {
  btn.style.transform = 'rotate(180deg)'
  list.classList.add('show')
  list.classList.remove('hidden')
  container.classList.add('absolute')
  placeHolder.classList.add('show')
  placeHolder.removeAttribute('disabled')
  placeHolder.setAttribute('placeholder', `Rechercher un ${textSearch}`)
  placeHolder.focus()
}
/**
     * HIDE
     * @param {HTML el} btn to toggle (icon)
     * @param {HTML el} list container to display list
     * @param {HTML el} container main container to set visibility
     * @param {HTML el} placeHolder to set and allow user search input
     * @param {string} textDefault to displayBack the btn text
     */
const hideList = (btn, list, container, placeHolder, textDefault) => {
  btn.style.transform = 'rotate(0deg)'
  list.classList.remove('show')
  list.classList.add('hidden')
  list.classList.remove('onSearch')
  container.classList.remove('absolute')
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
  createElement, emptyDOM, toggleList, noResult
}
