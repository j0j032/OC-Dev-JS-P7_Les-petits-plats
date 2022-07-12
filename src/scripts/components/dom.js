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

module.exports = {
  createElement, emptyDOM
}
