//NAV PART

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

// INPUT PART


const eMoneyContainer = document.getElementById("e-money-container")
const onDeliveryContainer = document.getElementById("on-delivery-container")
const radioMoney = document.getElementById("e-money")
const onDelivery = document.getElementById("cash-on-delivery")



eMoneyContainer.addEventListener("change", (e) => {
  if (e.target.checked) {
    eMoneyContainer.style.borderColor = "#D87D4A"
    console.log("true")
  } 
  if (!e.target.checked) {
    eMoneyContainer.style.borderColor = "green"
    console.log("false")
  }
})

onDelivery.addEventListener("click", (e) => {
  if (e.target.checked) {
    onDeliveryContainer.style.borderColor = "#D87D4A"
  }
})



// const form = document.getElementsByTagName("form")

// form[1].addEventListener("submit", () => {
//   e.preventDefault()
// })