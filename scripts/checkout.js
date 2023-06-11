const headerNav = document.getElementById("header-nav")
const buttons = document.querySelectorAll("header button")

const form = document.getElementById("checkout-form")
const inputs = document.body.querySelectorAll("#checkout-form input")
const deliveryMessage = document.body.querySelector(".on-delivery-message")
const onDeliveryInput = document.getElementById("cash-on-delivery")
const cardInputs = document.body.querySelectorAll(".card")

console.log(onDeliveryInput)

const loadInputs = () => {
  for (const input of inputs) {
    const inputName = input.getAttribute("name")
    const localStorageValue = localStorage.getItem(inputName)
    input.value = localStorageValue
  }
}

loadInputs()

const addInLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}

const getSpanElement = (element) => {
  const span = element.parentNode.querySelector("span")
  if(span) {
    return span
  } else {
    return element.parentNode.parentNode.querySelector("span")
  }

}

// NavBar toggle functionality

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

// Validation functions

const verifyIfInputEmpty = (value) => {
  return value.length === 0
}

// Checking for invalid inputs

const hideShowError = (input, errorMessage, func) => {
  const span = getSpanElement(input)
  const label = span.parentNode.firstElementChild

  if (func(input.value)) {
    input.classList.add("error")
    span.classList.replace("hide", "show")
    label.classList.add("show")
  } else {
    label.classList.remove("show")
    input.classList.remove("error")
    span.classList.replace("show", "hide")
  }
  span.textContent = errorMessage
}

// Radio buttons toggle functionality

const eMoneyContainer = document.getElementById("e-money-container")
const onDeliveryContainer = document.getElementById("on-delivery-container")
const radioInputs = document.body.querySelectorAll("input[type=radio]")

const removeCardNumbers = () => {
  for (const input of cardInputs) {
    const span = getSpanElement(input)
    const label = span.parentNode.firstElementChild
   
    const inputContainer = input.parentNode
    inputContainer.classList.toggle("display")

    
    label.classList.remove("show")
    input.classList.remove("error")
    span.classList.replace("show", "hide")
  }

}


const removeStyleToRadioInputs = () => {
  for (const input of radioInputs) {
    const container1 = input.parentNode
    container1.classList.remove("checked")
  }
}

const addFunctionalityToRadio = () => {
  for (const input of radioInputs) {
    input.addEventListener("change", (e) => {
      const inputContainer = e.target.parentNode
      const checked = e.target.checked
      if (checked) {
        removeStyleToRadioInputs()
        deliveryMessage.classList.toggle("display")
      }
      inputContainer.classList.add("checked")
      removeCardNumbers()
    })
  }
}

addFunctionalityToRadio()

// Adding and checking validation

const namesValidation = (name) => {
  const regex = /[\d!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/
  const test = regex.test(name)
  return test
}

const emailValidation = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const isValidEmail = emailRegex.test(email)

  return !isValidEmail
}

const ifTypeNumberValidation = (value) => {
  return isNaN(value)
}

// console.log(ifTypeNumberValidation("1123"))

const spliceWord = (word, beginning, end) => {
  const splitWord = word.split("")
  const splicedWord = splitWord.splice(beginning, end)
  const joinedWord = splicedWord.join("")

  return joinedWord
}

console.log(spliceWord('banane', 0, 3))

const lengthValidation = (input) => {
  const phoneNumberMaxLength = 11
  const zipCodeMaxLength = 5
  const pinMaxLength = 4
  const eMoneyMaxLength = 9

  if(input.name === "phone-number"){
    if(input.value.length > 11){
      const inputValue = spliceWord(input.value, 0, phoneNumberMaxLength)
      input.value = inputValue
      return false
    }
  }

  if (input.name === "zip-code") {
    if (input.value.length > 5) {
      input.value = input.value.substring(0, zipCodeMaxLength)
      return false
    }
  }

  if (input.name === "card-pin") {
    if (input.value.length > 4) {
      input.value = input.value.substring(0, pinMaxLength)
      return false
    }
  }

  if (input.name === "card-number") {
    if (input.value.length > 9) {
      input.value = input.value.substring(0, eMoneyMaxLength)
      return false
    }
  }

}


// name clearing

const upperCaseFirstLetter = (name) => {
  const split = name.split("")
  split[0] = split[0].toUpperCase()
  const newWord = split.join("")
  return newWord
}


const clearName = (name) => {
  const modifiedName = name.replace("-", " ")
  const upperCased = upperCaseFirstLetter(modifiedName)
  return upperCased
}

const inputValidation = (e) => {
  addInLocalStorage(e.name, e.value)
  const name = clearName(e.name)
  console.log(name)
  if (e.name !== "payment-method"){
    hideShowError(e, `${name} is required`, verifyIfInputEmpty)
  }

  

  if (e.value.length !== 0) {
    if (e.name === "email") {
      hideShowError(e, `Email address is not valid`, emailValidation)
    }

    if (e.name === "full-name") {
      hideShowError(e, `Wrong format`, namesValidation)
    }

    if (
      e.name.includes("number") ||
      e.name.includes("zip") ||
      e.name.includes("pin")
    ) {
      hideShowError(e, `Wrong format`, ifTypeNumberValidation)
    }
  }
}

const addEventsOnInputs = () => {
  for (const input of inputs) {
    // console.log(input.name.includes("name"))
    // console.log(input.name)
    if (input.name !== "payment-method") {
      input.addEventListener("input", (e) => {
        inputValidation(e.target)
      })
    }

     if (
      input.name.includes("number") ||
      input.name.includes("zip") ||
      input.name.includes("pin")
    ) {
       input.addEventListener("input", (e) => {
         lengthValidation(e.target)
       })
    }
  }
}

addEventsOnInputs()

form.addEventListener("submit", (e) => {
  // e.preventDefault()

  for (const input of inputs) {
    const label = input.parentElement.firstElementChild
    const span = getSpanElement(input)

    //daca cash on delivery este checked atunci nu verifica e money num si emoney pin
    console.log(onDeliveryInput.checked)
    if (onDeliveryInput.checked){
      if (input.id !== "card-number" || input.id !== "card-pin") {
        inputValidation(input)
      }
      break;
    } else {
      inputValidation(input)
    }
      // if (input.id === "cash-on-delivery") {
      //   if (input.checked) {
      //     console.log(input)
      //     if (input.id !== "card-number" || input.id !== "card-pin") {
      //       inputValidation(input)
      //     }
      //   }
      // }

    if (label.classList.contains("error") || span.classList.contains("show")) {
      e.preventDefault()
    }
  }
})







































// previous methods of styling when payment method was checked

// const radioMoney = document.getElementById("e-money")
// const onDelivery = document.getElementById("cash-on-delivery")

// eMoneyContainer.addEventListener("change", (e) => {
//   if (e.target.checked) {
//     eMoneyContainer.style.borderColor = "#D87D4A"
//   }
//   onDeliveryContainer.style.borderColor = "#F1F1F1"
// })

// onDelivery.addEventListener("change", (e) => {
//   if (e.target.checked) {
//     onDeliveryContainer.style.borderColor = "#D87D4A"
//   }
//   eMoneyContainer.style.borderColor = "#F1F1F1"
// })



// Nav toggle

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


// simple way

// const hamburgerButton = document.getElementById("h-button")
// const closeButton = document.getElementById("x-button")


// hamburgerButton.addEventListener("click", () => {
//   headerNav.classList.toggle("nav-toggle")
//   hamburgerButton.classList.toggle("display-none")
//   closeButton.classList.toggle("display-none")
// })

// closeButton.addEventListener("click", () => {
//   closeButton.classList.toggle("display-none")
//   hamburgerButton.classList.toggle("display-none")
//   headerNav.classList.toggle("nav-toggle")
// })