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

const isIncluded = (property, value) => property.toLowerCase().includes(value.toLowerCase())

const isFound = (array, property, value) => array.find(item => isIncluded(item[property], value))

module.exports = {
  createElement, emptyDOM, isIncluded, isFound
}
