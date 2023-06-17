const form = document.getElementById("checkout-form")
const inputs = document.body.querySelectorAll("#checkout-form input")
const deliveryMessage = document.body.querySelector(".on-delivery-message")
const onDeliveryInput = document.getElementById("cash-on-delivery")
const cardInputs = document.body.querySelectorAll(".card")


// console.log(onDeliveryInput)

// Local storage loading from shared script

const loadInputs = (inputs) => {
  for (const input of inputs) {
    const inputName = input.getAttribute("name")
    const localStorageValue = localStorage.getItem(inputName)
    input.value = localStorageValue
  }
}

loadInputs(inputs)

// const addInLocalStorage = (key, value) => {
//   localStorage.setItem(key, value)
// }

const getSpanElement = (element) => {
  const span = element.parentNode.querySelector("span")
  if (span) {
    return span
  } else {
    return element.parentNode.parentNode.querySelector("span")
  }
}

const getLabelElement = (element) => {
 const label = element.parentNode.querySelector("label")
 return label
}

// // NavBar toggle functionality

// const addToggleFunctionality = () => {
//   for (const button of buttons) {
//     if (button.classList.contains("display-none")) {
//       button.classList.toggle("display-none")
//       document.body.classList.toggle("stop-scroll")
//     }
//   }
// }

// const addButtonEvent = () => {
//   for (const button of buttons) {
//     const id = button.getAttribute("id")

//     if (id !== "cart-button") {
//       button.addEventListener("click", (e) => {
//         headerNav.classList.toggle("nav-toggle")

//         const eventButton = e.target

//         addToggleFunctionality()
//         eventButton.classList.toggle("display-none")
//       })
//     }
//   }
// }

// addButtonEvent()


// CART TOGGLE

// const cartButton = document.getElementById("cart-button")
// const cartContainer = document.getElementById("cart-container")

// console.log(cartButton)

// cartButton.addEventListener("click", () => {
//   cartContainer.classList.toggle("show-cart")
//   document.body.classList.toggle("stop-scroll")
// })


// Checking for invalid inputs

const hideShowError = (input, errorMessage, func) => {
  const span = getSpanElement(input)
  const label = getLabelElement(input)
  console.log(label)
  const funcAdaptation = typeof func === "boolean" ? func : func(input.value)
  console.log(funcAdaptation)
  if (funcAdaptation) {
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

const verifyIfInputEmpty = (value) => {
  if (value === "") {
    return value.length === 0
  }
  return false
}

const namesValidation = (name) => {
  const regex = /[\d!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/
  // const specialCharacters = "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?"
  // const test = name.includes(specialCharacters)
  const test = regex.test(name)
  return test
}

const emailValidation = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const isValidEmail = emailRegex.test(email)

  return !isValidEmail
}

const ifTypeNumberValidation = (value) => {
  if (value.includes(" ")) {
    return true
  }
  return isNaN(value)
}

const spliceWord = (word, beginning, end) => {
  const splitWord = word.split("")
  const splicedWord = splitWord.splice(beginning, end)
  const joinedWord = splicedWord.join("")

  return joinedWord
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

// generate hideShowError for input length

const checkLength = (value, minLength) => {
  return value.length < minLength
}

const returnHideShowError = (input, minLength, func) => {
    hideShowError(
      input,
      `Insert ${minLength} characters`,
      func(input.value, minLength)
    )
}

const inputsLengthValidation = (input) => {
  

  if (input.name === "phone-number" || input.name === "card-number") {
    returnHideShowError(input, 9, checkLength)
  }

  if (input.name === "city") {
    returnHideShowError(input, 6, checkLength)
  }

  if (input.name === "zip-code") {
    returnHideShowError(input, 5, checkLength)
  }

  if (
    input.name === "city" ||
    input.name === "country" ||
    input.name === "card-pin"
  ) {
    returnHideShowError(input, 4, checkLength)
  }

}

// Function that checks type of input, then checks validation

const insertInputValidation = (e) => {
  addInLocalStorage(e.name, e.value)
  const name = clearName(e.name)
  // console.log(name)
  if (e.name !== "payment-method") {
    hideShowError(e, `${name} is required`, verifyIfInputEmpty)
  }

  if (e.value.length !== 0) {
    
    inputsLengthValidation(e)


    if (e.name === "email") {
      hideShowError(e, `Email address is not valid`, emailValidation)
    }

    if (e.name === "full-name") {
      hideShowError(e, `Wrong format`, namesValidation)

      if(!e.classList.contains("error")){
        returnHideShowError(e, 6, checkLength)
      }
    }
  }
}

// Functions helping with adding events

const noNumbersTypeEvent = (input) => {
  input.addEventListener("keydown", (e) => {
    console.log(e.key)
    if (!isNaN(e.key) && e.key !== "Backspace" && e.key !== " ") {
      e.preventDefault()
    }
  })
}

const limitNumTypeEvent = (limit, input) => {
  input.addEventListener("keydown", (e) => {
    const value = e.target.value
    if (value.length >= limit && e.key !== "Backspace") {
      e.preventDefault()
    }

    if (ifTypeNumberValidation(e.key) && e.key !== "Backspace") {
      e.preventDefault()
    }
  })
}

// Main event loader

const addEventsOnInputs = () => {
  for (const input of inputs) {
    if (input.name !== "payment-method") {
      input.addEventListener("input", (e) => {
        insertInputValidation(e.target)
      })
    }

    if (input.name === "phone-number") {
      limitNumTypeEvent(11, input)
    }

    if (input.name === "zip-code") {
      limitNumTypeEvent(5, input)
    }

    if (input.name === "card-number") {
      limitNumTypeEvent(9, input)
    }

    if (input.name === "card-pin") {
      limitNumTypeEvent(4, input)
    }

    if (input.getAttribute("id") === "city") {
      noNumbersTypeEvent(input)
    }

    if (input.getAttribute("id") === "country") {
      noNumbersTypeEvent(input)
    }
  }
}

addEventsOnInputs()

// Form
form.addEventListener("submit", (e) => {
  // e.preventDefault()
  e.stopPropagation()

  for (const input of inputs) {
    const label = input.parentElement.firstElementChild
    const span = getSpanElement(input)

    console.log(onDeliveryInput.checked)
    if (onDeliveryInput.checked) {
      if (input.id !== "card-number" || input.id !== "card-pin") {
        insertInputValidation(input)
      }
      break
    } else {
      insertInputValidation(input)
    }

    if (label.classList.contains("error") || span.classList.contains("show")) {
      e.preventDefault()
    }
  }
})





// old solution for validating length

// const lengthValidation = (input) => {
//   const phoneNumberMaxLength = 11
//   const zipCodeMaxLength = 5
//   const pinMaxLength = 4
//   const eMoneyMaxLength = 9

//   if(input.name === "phone-number"){
//     if(input.value.length > 11){
//       const inputValue = spliceWord(input.value, 0, phoneNumberMaxLength)
//       input.value = inputValue
//       return false
//     }
//   }

//   if (input.name === "zip-code") {
//     if (input.value.length > 5) {
//       input.value = input.value.substring(0, zipCodeMaxLength)
//       return false
//     }
//   }

//   if (input.name === "card-pin") {
//     if (input.value.length > 4) {
//       input.value = input.value.substring(0, pinMaxLength)
//       return false
//     }
//   }

//   if (input.name === "card-number") {
//     if (input.value.length > 9) {
//       input.value = input.value.substring(0, eMoneyMaxLength)
//       return false
//     }
//   }

// }

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
