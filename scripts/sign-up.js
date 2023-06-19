const form = document.querySelector("form")
const inputs = document.body.querySelectorAll("div input")
const password = document.getElementById("signup_password")
const conditionTerms = document.getElementById("condition_terms")
const popupContainer = document.body.querySelector(".popup")
const popupButton = document.body.querySelector(".popup button")
console.log(popupButton)
// popupContainer.classList.toggle("hide")
// localStorage.clear()
// First part for getting and and adding user || rest of the code is at form event
const existingUsers = localStorage.getItem("users")
const parsedUsers = JSON.parse(existingUsers)
const users = existingUsers ? parsedUsers : []
// Note you will have to parse it twice =))))
// console.log(JSON.parse(JSON.parse(existingUsers)[0]))

console.log(users)



const addInLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}


 const loadInputs = (inputs) => {
   for (const input of inputs) {
     const inputName = input.getAttribute("name")
     const localStorageValue = localStorage.getItem(inputName)
     input.value = localStorageValue
   }
 }
loadInputs(inputs)


// for(let user of parsedUsers){
//   const parsedUser = JSON.parse(user)
//   console.log(parsedUser.email)
// }

//
// validation functions

const getUser = (email) => {
  if(users.length > 0){
    for (let user of users) {
      const parsedUser = JSON.parse(user)
      if (parsedUser.email === email) {
        return parsedUser
      }
    }
  }
}

const userExistenceValidation = (emailValidation) => {
  if (getUser(emailValidation)) {
    return true
  }

  return false
}

// const checkUserPassword = (password) => {
//   const user = getUser(email.value)
//   if (user.signup_password === password) {
//     return !true
//   }

//   return !false
// }


const getSpanElement = (element) => {
  return element.parentNode.querySelector("span")
}

const verifyIfInputEmpty = (value) => {
  return value.length === 0
}

const emailValidation = (string) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const isValidEmail = emailRegex.test(string)

  return !isValidEmail
}

const containsNum = (password) => {
  const regex = /\d/
  const test = regex.test(password)

  return !test
}

const containsUpperCase = (password) => {
  const regex = /[A-Z]/
  const test = regex.test(password)

  return !test
}

const containsSpecialChar = (password) => {
  const regex = /[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/
  const test = regex.test(password)

  return !test
}

const verifyIfLengthUnder8 = (password) => {
  return password.length < 8
}

const passwordValidation = (password, func) => {
  const result = func(password)
  return result
}

const repeatPasswordValidation = (repeatedPassword) => {
  const passwordInput = password.value
  return passwordInput !== repeatedPassword
}

const namesValidation = (name) => {
  const regex = /[\d!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/
  const test = regex.test(name)
  return test
}

const checkBoxValidation = () => {
  return !conditionTerms.checked
}
// !Amparola1
const passwordErrorMessages = [
  "Password is required",
  "Password should contain at least 1 special character",
  "Password should contain at least 1 number",
  "Password should contain at least one upper case letter ",
  "Length should be at least 8 characters",
  "error",
]

//MULTIPLE ERROR VALIDATOR FUNCTION FOR PASSWORD

const multipleConditionPasswordValidator = (input) => {
  const span = getSpanElement(input)
  const label = span.parentNode.firstElementChild
  if (passwordValidation(input.value, containsSpecialChar)) {
    showError(
      input,
      span,
      label,
      "Password should contain at least 1 special character"
    )
  } else if (passwordValidation(input.value, containsUpperCase)) {
    showError(
      input,
      span,
      label,
      "Password should contain at least one upper case letter"
    )
  } else if (passwordValidation(input.value, containsNum)) {
    showError(input, span, label, "Password should contain at least 1 number")
  } else if (passwordValidation(input.value, verifyIfLengthUnder8)) {
    showError(input, span, label, "Length should be at least 8 characters")
  } else {
    hideError(input, span, label)
  }
}

// MULTIPLE ERROR VALIDATION FOR MAIL

const multipleConditionMailValidator = (input) => {
  const span = getSpanElement(input)
  const label = span.parentNode.firstElementChild

  if(emailValidation(input.value)){
      showError(
        input,
        span,
        label,
        "Email not valid"
      )
  } else if (userExistenceValidation(input.value)) {
      showError(input, span, label, "Email is already registered")
   } else {
    hideError(input, span, label)
   }
}










// ERROR DISPLAY FUNCTIONS

const showError = (input, span, label, errorMessage) => {
  input.classList.add("error")
  span.classList.replace("hide", "show")
  label.classList.add("show")
  span.textContent = errorMessage
}

const hideError = (input, span, label) => {
  label.classList.remove("show")
  input.classList.remove("error")
  span.classList.replace("show", "hide")
}

const hideShowError = (input, errorMessage, func) => {
  const span = getSpanElement(input)
  const label = span.parentNode.firstElementChild
  
  if (func(input.value)) {
    showError(input, span, label, errorMessage)
  } else {
    hideError(input, span, label)
  }
}

const upperCaseFirstLetter = (name) => {
  const split = name.split("")
  split[0] = split[0].toUpperCase()
  const newWord = split.join("")
  return newWord
}

const clearName = (name) => {
  let modifiedName = name.replace("_", " ")
  if (name === "signup_password") {
    modifiedName = name.replace("signup_", "")
  }
  const upperCased = upperCaseFirstLetter(modifiedName)
  console.log(upperCased)
  return upperCased
}

const inputValidation = (e) => {
  addInLocalStorage(e.name, e.value)
  const name = clearName(e.name)
  // console.log(e.name)
  const msg =
    e.name ===  e.name === "signup_password"
      ? "Please confirm password"
      : `${name} is required`

  hideShowError(e, msg, verifyIfInputEmpty)

  // console.log(e.checked)
  if (e.value.length !== 0) {
    // if (e.name === "email") {
    //   hideShowError(e, `This email address is not valid`, emailValidation)
       
    // }

    if(e.name === "email"){
      // hideShowError(e, `This email address is not valid`, emailValidation)
      multipleConditionMailValidator(e)
      //  if (e.value.includes(".") && e.value.includes("@")) {
      //    hideShowError(
      //      e,
      //      "This mail is already registered",
      //      userExistenceValidation
      //    )
      //  }
    }

    if (e.name === "repeated_password") {
      hideShowError(e, `Password not matching`, repeatPasswordValidation)
    }

    if (name.includes("name")) {
      hideShowError(e, `Wrong format`, namesValidation)
    }

    if (e.name === "signup_password") {
      multipleConditionPasswordValidator(e)
    }
  }

  if (e.name === "condition_terms") {
    if (e.checked) {
      addInLocalStorage(e.name, "true")
    }
    hideShowError(
      e,
      "Accepting terms and conditions is required",
      checkBoxValidation
    )
  }
}

const addEventsOnInputs = () => {
  for (const input of inputs) {
    // console.log(input.name)
    // if (input.name !== "condition_terms") {
    input.addEventListener("input", (e) => {
      inputValidation(e.target)
    })
    // }
  }
}

// Validation function for the form

const checkIfValid = (e) => {
  let noError = false
  const errors = []

  for (const input of inputs) {
    const label = input.parentElement.firstElementChild
    const span = getSpanElement(input)

    inputValidation(input)
  
    if (label.classList.contains("error") || span.classList.contains("show")) {
      errors.push("error")
      e.preventDefault()
      noError = false
    } else {
      errors.push("valid")
    }

  }

  if (errors.includes("error")){
    noError = false
    return noError
  } 

  noError = true
  console.log(errors)
  return noError
}

addEventsOnInputs()

const cleanLocalStorage = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key !== "products" && key !== "users" && key !== "debug") {
      localStorage.removeItem(key)
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
  const entries = [...formData.entries()]

  const formObject = Object.fromEntries(formData)
  const user = JSON.stringify(formObject)

  // ON SUBMIT it checks if the data is valid

  const isValid = checkIfValid(e)

  // !Parola12
  if (isValid) {
    //Clearing local storage of inputs
    cleanLocalStorage()
    // Resetting inputs
    e.currentTarget.reset()

    // Second part | adds user in array and then sends it to local storage
    users.push(user)
    const newUsers = JSON.stringify(users)
    localStorage.setItem("users", newUsers)
    popupContainer.classList.toggle("hide")

    // !Password1
  }
})
// localStorage.clear()
// console.log(JSON.parse(localStorage.getItem("users")))
// !AMS1euoparola