const cartProductsForSummary = localStorage.getItem("cart-products")
const parsedCartProductsForSummary = JSON.parse(cartProductsForSummary)
const summaryCart = parsedCartProductsForSummary
  ? parsedCartProductsForSummary
  : []



  // aici fac un if else mare foarte mare
  // daca summary cart.length e mai mic ca 0 atunci sterg tot ce e pe pagina si fac load la un mesaj
  // daca este mai mare ca 0 atunci facem load la tot
  // sterg formularul si in locul lui apendez alt element care are rol de eroare
  
  const form = document.getElementById("checkout-form")
  const checkoutContainer = document.getElementById("checkout-container")
  console.log(checkoutContainer)

  if(summaryCart.length === 0){
    form.remove()
    const message = document.createElement("div")
    message.classList.add("message")

    message.innerHTML = "<h2>Sorry your cart is empty</h2>"


    checkoutContainer.appendChild(message)
  } 

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

// Checking for invalid inputs

const hideShowError = (input, errorMessage, func) => {
  const span = getSpanElement(input)
  const label = getLabelElement(input)
  const funcAdaptation = typeof func === "boolean" ? func : func(input.value)
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
  const regex = /[\!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/
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
  console.log(value?.includes(" "))
  if (value?.includes(" ")) {
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

      if (!e.classList.contains("error")) {
        returnHideShowError(e, 6, checkLength)
      }
    }

    if(e.name === "city"){
      hideShowError(e, `Wrong format`, namesValidation)
    }

    if (e.name === "country") {
      hideShowError(e, `Wrong format`, namesValidation)
    }

    if (e.name === "address") {
      hideShowError(e, `Wrong format`, namesValidation)
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

    // if(e.target.id === "city"){
    //    console.log(e.target.classList)
    //    console.log(!e.target.classList.contains("error"))

    //    if (!e.target.classList.contains("error")) {
    //      hideShowError(e.target, `Wrong format`, namesValidation)
    //    }
    // }

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



// console.log(localStorage.getItem(localStorage.key(2)))




// Form
form.addEventListener("submit", (e) => {
  e.preventDefault()
  // e.stopPropagation()

  const formData = new FormData(e.currentTarget)
  const entries = [...formData.entries()]

  const formObject = Object.fromEntries(formData)
  const userData = JSON.stringify(formObject)

  const errors = []

  for (const input of inputs) {
    const label = input.parentElement.firstElementChild
    const span = getSpanElement(input)

    // console.log(onDeliveryInput.checked)
    if (onDeliveryInput.checked) {
      if (
        input.getAttribute("id") !== "card-number" &&
        input.getAttribute("id") !== "card-pin"
      ) {
        // console.log(input.id)
        insertInputValidation(input)
      }
    } else {
      insertInputValidation(input)
    }

    if (label.classList.contains("error") || span.classList.contains("show")) {
      e.preventDefault()
      errors.push("invalid")
    } 
  }

  if(!errors.includes("invalid")){
    const orderSuccessPop = document.getElementById("order-success")
    orderSuccessPop.classList.remove("hide")
    document.body.classList.add("stop-scroll")
    cleanLocalStorage()
  }
})
 

// Behaviour of local storage is diffrent it updated the length as items are removed so that is why we need to loop backwards

// Also we can not delete them directly while looping because it updates like previously said, so we grab the keys then we delete the items

const cleanLocalStorage = () => {
  const toRemove = []

  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i)
    // console.log(key)
    if (
      key !== "products" &&
      key !== "price-ranges" &&
      key !== "debug" &&
      key !== "users" &&
      key !== "recent-searches" &&
      key !== "isUserLoggedIn"
    ) {
      toRemove.push(key)
    }
  }

  toRemove.forEach(key => localStorage.removeItem(key))

}

   








const addSumEl = (
  productId,
  productImg,
  productAlt,
  productName,
  productPrice,
  productCount,
  ifDiscount
) => {
  const li = document.createElement("li")
  li.setAttribute("id", `list-${productId}`)

  const calcDiscount = productPrice * (ifDiscount / 100)
  const priceDiscount = ifDiscount ? productPrice - calcDiscount : productPrice


  li.innerHTML = `
  
    <div class="img-container">
      <img src=${productImg} alt=${productAlt} />
    </div>

    <p>
      <strong>${productName}</strong>
      <span>$</span>
      <span id="price">${priceDiscount}</span>
    </p>

    <span>x <span id="sum-count">${productCount}</span></span>
    </div>`

  return li
}

const summaryList = document.getElementById("summary-list")
const allProducts = localStorage.getItem("products")
const allProductList = JSON.parse(allProducts)

const loadSummary = () => {
  summaryCart.forEach((cartEl) => {
    const product = allProductList.find((element) => element.id === cartEl.id)

    const listEL = addSumEl(
      product.id,
      product.images.display.first,
      product.name,
      product.slug,
      product.price,
      cartEl.count,
      product.discount
    )
    summaryList.appendChild(listEL)
  })
}

loadSummary()

// console.log(

// shipping,
// vat,
// grandTotal

// )
const cartListSum = document.getElementById("cart-list")
const shipping = document.getElementById("shipping")
const vat = document.getElementById("vat")
const grandTotal = document.getElementById("grand-total")

// summaryList

// IF CART DOES NOT WORK PROPERLY MEANING DOESN T LOAD I NEED TO REWRITE THIS
const totalSum = document.getElementById("total")

const calculateSummaryTotal = (list) => {
  let total = 0
  for (const el of list) {
    const elCount = el.querySelector("#sum-count")
    const elPrice = el.querySelector("#price")
    const price = parseInt(elCount.innerText)
    const count = parseInt(elPrice.innerText)
    total = total + price * count
    console.log(total)
  }

  totalSum.innerText = total
  const ship = total > 300 ? "free" : 40
  shipping.innerText = `$ ${ship}`
  const calc = Math.floor(total * 0.1)
  vat.innerText = calc
  grandTotal.innerText = total + (typeof ship === "string" ? 0 : ship)
}

if (summaryCart.length > 0) {
  calculateSummaryTotal(summaryList.children)
}

// GOING BACK

const backButton = document.getElementById("go-back")
console.log(backButton)

backButton.addEventListener("click", () => {
  history.back()
})

// ORDER SUCCESSFUL

if (summaryCart.length > 0) {
  // const orderSuccessPop = document.getElementById("order-success")
  const orderUl = document.getElementById("order-item-list")
  const orderParagraph = document.body.querySelector("#order p")
  const ItemsOrdered = document.getElementById("items-ordered")
  const plural = document.getElementById("plural")
  const orderGrandTotal = document.getElementById("order-grand-total")
  // orderSuccessPop.classList.toggle("hide")
  // document.body.classList.toggle("stop-scroll")

  const product = allProductList.find(
    (element) => element.id === summaryCart[0].id
  )

  const listEL = addSumEl(
    product.id,
    product.images.display.first,
    product.name,
    product.slug,
    product.price,
    summaryCart[0].count
  )
  orderUl.appendChild(listEL)

  if (summaryCart.length === 1) {
    orderParagraph.remove()
  }

  const itemsRemaining = summaryCart.length - 1
  ItemsOrdered.innerText = itemsRemaining

  plural.innerText = itemsRemaining === 1 ? "item" : "items"
  orderGrandTotal.innerHTML = `$ ${grandTotal.innerText}`
}

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
