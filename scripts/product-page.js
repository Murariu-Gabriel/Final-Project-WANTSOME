// Nav toggle

const headerNav = document.getElementById("header-nav")
const buttons = document.querySelectorAll("header button")

const addToggleFunctionality = () => {
  for (const button of buttons) {
    if (button.classList.contains("display-none")) {
      button.classList.toggle("display-none")
    }
  }
}

const addButtonEvent = () => {
  for (const button of buttons) {
    const id = button.getAttribute("id")

    if (id) {
      button.addEventListener("click", (e) => {
        headerNav.classList.toggle("nav-toggle")
        const eventButton = e.target

        addToggleFunctionality()

        eventButton.classList.toggle("display-none")
      })
    }
  }
}

addButtonEvent()
// BUTTON Increment part

const productCounter = document.getElementById("product-counter")
const incrementBtn = document.getElementById("increment")
// const form = document.querySelector("form")

// form.addEventListener("submit", () => {
//   e.preventDefault()
// })

const counter = (element) => {
  const id = element.getAttribute("id")
  const min = productCounter.getAttribute("min")
  const max = productCounter.getAttribute("max")
  const value = productCounter.value
  const currentNum = parseInt(value)
  const add = currentNum + 1
  const substract = currentNum -1
  const newValue = id === "increment" ? add  : substract

  if( newValue >= min && newValue <= max ){
    productCounter.setAttribute("value", newValue)

  }
}


