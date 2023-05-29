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

// I have a feeling this part has performance issues

// Second try with looping
// IT works but I have a feeling this code isn t the most optimal

// const payment = document.getElementsByName("payment-method")
// const container = document.getElementsByClassName("radio-button")

// for(const [index, el] of payment.entries()){
//   el.addEventListener("change", (e) => {
//     if (e.target.checked) {
//       container[index].style.borderColor = "#D87D4A"
   
//       if(index === 0){
//         container[1].style.borderColor = "#F1F1F1"
//       } else{
//         container[0].style.borderColor = "#F1F1F1"
//       }
//     } 
//   })
// }


// first try, it repeats

const eMoneyContainer = document.getElementById("e-money-container")
const onDeliveryContainer = document.getElementById("on-delivery-container")
const radioMoney = document.getElementById("e-money")
const onDelivery = document.getElementById("cash-on-delivery")

eMoneyContainer.addEventListener("change", (e) => {
  if (e.target.checked) {
    eMoneyContainer.style.borderColor = "#D87D4A"
  }
  onDeliveryContainer.style.borderColor = "#F1F1F1"
})

onDelivery.addEventListener("change", (e) => {
  if (e.target.checked) {
    onDeliveryContainer.style.borderColor = "#D87D4A"
  }
  eMoneyContainer.style.borderColor = "#F1F1F1"
})









// const form = document.getElementsByTagName("form")

// form[1].addEventListener("submit", () => {
//   e.preventDefault()
// })