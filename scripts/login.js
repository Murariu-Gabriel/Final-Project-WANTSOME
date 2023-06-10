const form = document.querySelector("form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const inputs = document.body.getElementsByTagName("input")
const eyeButton = document.getElementById("eye-button")

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

const emailValidation = (string) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const isValidEmail = emailRegex.test(string)
  console.log(isValidEmail)

  return !isValidEmail
}

const passwordValidation = (string) => {
  const specialCharsRegex = /^(?=.*[!@#$%^&*]).{8,}$/
  const hasSpecialChars = specialCharsRegex.test(string)

  console.log(hasSpecialChars)

  return !hasSpecialChars
}

const getSpanElement = (element) => {
  return element.parentNode.querySelector("span")
}

const verifyIfInputEmpty = (value) => {
  return value.length == 0
}

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

  // return span.classList.contains("show") && !label.classList.contains("show")
  //   ? true
  //   : false
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


const inputValidation  = (e) => {
 addInLocalStorage(e.name, e.value)
   const name = clearName(e.name)
 hideShowError(
   e, `${name} is required`,
   verifyIfInputEmpty
 )

 if (e.value.length !== 0) {
   if (e.name === "email") {
     hideShowError(e, `This email adress is not valid`, emailValidation)
   }

   if (e.name === "password") {
     hideShowError(e, `Incorrect password`, passwordValidation)
   }
 }
}

const addEventsOnInputs = () => {
  for (const input of inputs) {
    input.addEventListener("input", (e) => {
      inputValidation(e.target)
    })
  
  }
}

addEventsOnInputs()

form.addEventListener("submit", (e) => {
  // e.preventDefault()

  for (const input of inputs) {
    const label = input.parentElement.firstElementChild
    const span = input.parentElement.children[1]
    inputValidation(input)


    if (label.classList.contains("error") || span.classList.contains("show")) {
      e.preventDefault()
    }
  }

})

// toggle for showing password

eyeButton.addEventListener("click", (e) => {
 const eyeShow = eyeButton.children[0]
 const eyeHide = eyeButton.children[1]
  if (password.getAttribute("type") === "password") {
    
    password.setAttribute("type", "text")
    eyeHide.classList.toggle("hide")
    eyeShow.classList.toggle("hide")
  } else {

    password.setAttribute("type", "password")
    eyeHide.classList.toggle("hide")
    eyeShow.classList.toggle("hide")
  }
})


// code from from for loop in case you want to change it ans use it later

// const checkIfaOrAn = input.name === "email" ? "an" : "a"
// hideShowError(
//   input,
//   `You have to enter ${checkIfaOrAn} ${input.name}`,
//   verifyIfInputEmpty
// )


// last version of code for adding functionality  just in case you need to reuse or change

  //  input.addEventListener("keyup", (e) => {
  //   //  console.log(target.e)
  //    if (e.target.name === "email") {
  //      hideShowError(
  //        e.target,
  //        `This email adress is not valid`,
  //        emailValidation
  //      )
  //    }
  //  })
  // if (e.target.name === "email") {
  //   hideShowError(
  //     e.target,
  //     `You have to enter ${e.target.name}`,
  //     emailValidation
  //   )
  // } else {
  //   hideShowError(e.target, "Password not safe", passwordValidation)
  // }

