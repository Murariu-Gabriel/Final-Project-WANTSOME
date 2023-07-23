const form = document.querySelector("form")
const inputs = document.body.querySelectorAll("div input")
const password = document.getElementById("signup_password")
const conditionTerms = document.getElementById("condition_terms")
const popupContainer = document.body.querySelector(".popup")
const popupButton = document.body.querySelector(".popup button")


// GETTING EXISTING USERS

const existingUsers = localStorage.getItem("users")
const parsedUsers = JSON.parse(existingUsers)
const users = existingUsers ? parsedUsers : []


const addInLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}


// VALIDATOR FUNCTIONS

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


//MULTIPLE ERROR VALIDATion FUNCTION FOR PASSWORD

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
    showError(
      input,
      span,
      label,
      "Password should contain at least 1 number"
      )

  } else if (passwordValidation(input.value, verifyIfLengthUnder8)) {
    showError(
      input,
      span,
      label,
      "Length should be at least 8 characters"
      )
      
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
    showError(input,
      span, 
      label,
      "Email is already registered"
    )

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


// EDITING STRING FUNCTIONS

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
  return upperCased
}

// INPUT EVENT LOGIC FOR VALIDATION

const inputValidation = (e) => {
  const name = clearName(e.name)
  const msg =
    e.name ===  e.name === "signup_password"
      ? "Please confirm password"
      : `${name} is required`

  hideShowError(e, msg, verifyIfInputEmpty)


  if (e.value.length !== 0) {
   
    if(e.name === "email"){
      multipleConditionMailValidator(e)
    }

    if (e.name === "confirm_password") {
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
      addInLocalStorage(e.name, true)
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
    input.addEventListener("input", (e) => {
      inputValidation(e.target)
    })
  }
}


// VALIDATION FOR THE FORM

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
  return noError
}

addEventsOnInputs()


form.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
  const entries = [...formData.entries()]
  
  
  const fullName = `${formData.get("first_name")} ${formData.get("last_name")}` 
  const email = entries[2]


  const formObject = Object.fromEntries(formData)
  const user = JSON.stringify(formObject)

  // ON SUBMIT it checks if the data is valid

  const isValid = checkIfValid(e)

 
  if (isValid) {

    e.currentTarget.reset()

    // Second part | adds user in array and then sends it to local storage

    popupContainer.classList.remove("hide")
    popupContainer.style.display = "flex"
    
    users.push(user)
    const newUsers = JSON.stringify(users)

    localStorage.setItem("users", newUsers)
    localStorage.setItem("full-name", fullName)
    localStorage.setItem(email[0], email[1])
  }
})


