import { animate, inputs, updateValues, initialValues } from './simulation.js'
import { adicionarPonto } from './density.js'

for (let i = 0; i < inputs.length; i++) {
  inputs[i].value = initialValues[i]
}

inputs.forEach(element => {
  updateValues(element)
})

export let intervalID

const buttonStart = document.getElementById('start')
buttonStart.addEventListener('click', e => {
  buttonStart.disabled = true
  animate()
  intervalID = setInterval(adicionarPonto, 1000)
})

let dropDownState = false

const itens = ['Research', 'Extension', 'Simulation', 'Contact']

const resizeDropDown = () => {
  const navigation = document.getElementsByTagName('nav')[0]
  if (window.innerWidth >= 700) {
    desktopNav(navigation, itens)
  } else {
    mobileNav(navigation)
  }
}

window.addEventListener('resize', resizeDropDown)
window.addEventListener('load', resizeDropDown)

const desktopNav = (parent, arr) => {
  parent.innerHTML = ''
  const list = document.createElement('ul')

  arr.forEach(itemText => {
    const listItem = document.createElement('li')

    const link = document.createElement('a')
    link.href = `#${itemText.toLowerCase()}`
    link.textContent = itemText
    listItem.appendChild(link)
    list.appendChild(listItem)
  })
  parent.appendChild(list)
}
// PRECISO ADICIONAR O DROP DOWN
const mobileNav = parent => {
  parent.innerHTML = ''
  const button = document.createElement('span')
  button.innerText = 'Menu'
  button.addEventListener('click', e => {
    showDropDown(parent, e.target, itens)
  })
  parent.appendChild(button)
}

const showDropDown = (element, target, arr) => {
  if (!dropDownState) {
    target.innerText = "Close"
    dropDownState = true
    const dropDownDiv = document.createElement('div')

    const dropDownUl = document.createElement('ul')
    arr.forEach(itemText => {
      const listItem = document.createElement('li')

      const link = document.createElement('a')
      link.href = `#${itemText.toLowerCase()}`
      link.textContent = itemText
      listItem.appendChild(link)
      dropDownUl.appendChild(listItem)
    })
    dropDownDiv.appendChild(dropDownUl)
    element.appendChild(dropDownDiv)
  } else {
    dropDownState = false
    element.innerHTML = ""
    mobileNav(element)
  }
}
