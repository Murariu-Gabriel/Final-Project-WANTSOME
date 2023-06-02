// Nav toggle

const headerNav = document.getElementById("header-nav")
const hamburgerButton = document.getElementById("h-button")
const closeButton = document.getElementById("x-button")

hamburgerButton.addEventListener("click", () => {
  headerNav.classList.toggle("nav-toggle")
  hamburgerButton.classList.toggle("display-none")
  closeButton.classList.toggle("display-none")
})

closeButton.addEventListener("click", () => {
  closeButton.classList.toggle("display-none")
  hamburgerButton.classList.toggle("display-none")
  headerNav.classList.toggle("nav-toggle")
})


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


