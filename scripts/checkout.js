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


const form = document.getElementsByTagName("form")

form[1].addEventListener("submit", () => {
  e.preventDefault()
})