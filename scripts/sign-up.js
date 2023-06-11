const form = document.querySelector("form")
const inputs = document.body.querySelectorAll("div input")
const password = document.getElementById("password")
const conditionTerms = document.getElementById("condition-terms")
// const termsSpan = document.body.querySelector(".terms span")

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

const passwordErrorMessages = [
  "Password is required",
  "Password should contain at least 1 special character",
  "Password should contain at least 1 number",
  "Password should contain at least one upper case letter ",
  "Length should be at least 8 characters",
  "error",
]

const confirmErrorMsg = (input, span, label, errorMessage) => {
  input.classList.add("error")
  span.classList.replace("hide", "show")
  label.classList.add("show")
  span.textContent = errorMessage
}

const hideShowError = (input, errorMessage, func) => {
  const span = getSpanElement(input)
  const label = span.parentNode.firstElementChild

  if (input.name !== "password") {
    if (func(input.value)) {
      input.classList.add("error")
      span.classList.replace("hide", "show")
      label.classList.add("show")
      span.textContent = errorMessage
    } else {
      label.classList.remove("show")
      input.classList.remove("error")
      span.classList.replace("show", "hide")
    }
  }

  if (input.name === "password") {
    if (func(input.value, verifyIfInputEmpty)) {
      confirmErrorMsg(input, span, label, "Password is required")
    } else if (func(input.value, containsSpecialChar)) {
      confirmErrorMsg(
        input,
        span,
        label,
        "Password should contain at least 1 special character"
      )
    } else if (func(input.value, containsNum)) {
      confirmErrorMsg(
        input,
        span,
        label,
        "Password should contain at least 1 number"
      )
    } else if (func(input.value, containsUpperCase)) {
      confirmErrorMsg(
        input,
        span,
        label,
        "Password should contain at least one upper case letter"
      )
    } else if (func(input.value, verifyIfLengthUnder8)) {
      confirmErrorMsg(
        input,
        span,
        label,
        "Length should be at least 8 characters"
      )
    } else {
      label.classList.remove("show")
      input.classList.remove("error")
      span.classList.replace("show", "hide")
    }
  }
}

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
  console.log(e.name)
  const msg =
    e.name === "repeated-password"
      ? "Please confirm password"
      : `${name} is required`

  if (e.name !== "condition-term") {
    hideShowError(e, msg, verifyIfInputEmpty)
  }

  if (e.value.length !== 0) {
    if (e.name === "email") {
      hideShowError(e, `This email adress is not valid`, emailValidation)
    }

    if (e.name === "repeated-password") {
      hideShowError(e, `Password not matching`, repeatPasswordValidation)
    }

    if (name.includes("name")) {
      hideShowError(e, `Wrong format`, namesValidation)
    }

    if (e.name === "password") {
      hideShowError(e, passwordErrorMessages, passwordValidation)
    }

    if (e.name === "condition-term") {
      hideShowError(
        e,
        "Accepting terms and conditions is required",
        checkBoxValidation
      )
    }
  }
}

const addEventsOnInputs = () => {
  for (const input of inputs) {
    if (input.name !== "condition-term") {
      input.addEventListener("input", (e) => {
        inputValidation(e.target)
      })
    } 
    // else {
    //   input.addEventListener("click", (e) => {
    //     inputValidation(e.target)
    //   })
    // }
  }
}

addEventsOnInputs()

form.addEventListener("submit", (e) => {
  // e.preventDefault()

  for (const input of inputs) {
    const label = input.parentElement.firstElementChild
    const span = getSpanElement(input)

    inputValidation(input)
    if (label.classList.contains("error") || span.classList.contains("show")) {
      e.preventDefault()
    }
  }
})
