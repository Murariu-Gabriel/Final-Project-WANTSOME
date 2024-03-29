const form = document.querySelector("form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const inputs = document.body.getElementsByTagName("input")
const eyeButton = document.getElementById("eye-button")


const users = localStorage.getItem("users")
const parsedUsers = JSON.parse(users)

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

// TOGGLE FOR SHOWING PASSWORD

const showHide = () => {
  const eyeShow = eyeButton.children[0]
  const eyeHide = eyeButton.children[1]

  eyeHide.classList.toggle("hide")
  eyeShow.classList.toggle("hide")
}

eyeButton.addEventListener("click", () => {

  if (password.getAttribute("type") === "password") {
    
    password.setAttribute("type", "text")
    showHide()
  } else {

    password.setAttribute("type", "password")
    showHide()
  }
})

// VALIDATION FUNCTIONS

const getUser = (email) => {

  if(!parsedUsers){
    return false
  }
  
  for (let user of parsedUsers) {
    const parsedUser = JSON.parse(user)
    if (parsedUser.email === email) {
      return parsedUser
    }
  }
}

const userExistenceValidation = (emailValidation) => {
  if (getUser(emailValidation)) {
    return !true
  }

  return !false
}

const checkUserPassword = (password) => {
  const user = getUser(email.value)
  // console.log(user.signup_password)
  console.log(user)
  if(user){
    if (user.signup_password === password) {
      return !true
    }
  } else {
    return !true
  }
  return !false
}


const emailValidation = (string) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const isValidEmail = emailRegex.test(string)

  return !isValidEmail
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
  hideShowError(e, `${name} is required`,verifyIfInputEmpty)

 if (e.value.length !== 0) {

  if(e.name === "email"){
    // if (e.value.includes(".") && e.value.includes("@")) {
      hideShowError(e, "This mail is not registered", userExistenceValidation)
    // }

  }
   if (e.name === "password") {
     hideShowError(e, `Incorrect password`, checkUserPassword)
   }
 }
}


const addEventsOnInputs = () => {
  for (const input of inputs) {
    input.addEventListener("blur", (e) => {
      inputValidation(e.target)
    })
  
  }
}

addEventsOnInputs()

form.addEventListener("submit", (e) => {
  e.preventDefault()
   let noError = false
   const errors = []

   const formData = new FormData(form)
   const email = formData.get("email")

  for (const input of inputs) {
    const label = input.parentElement.firstElementChild
    const span = input.parentElement.children[1]
    inputValidation(input)

    if (label.classList.contains("error") || span.classList.contains("show")) {
      errors.push("error")
      e.preventDefault()
      noError = false
    } else {
      errors.push("valid")
    }
  }

  if (!errors.includes("error")) {
  const rawUserInfo = {status: true, user: email }
  const userInfo = JSON.stringify(rawUserInfo)

    localStorage.setItem("isUserLoggedIn", userInfo)
    window.location.assign("http://127.0.0.1:5500/html-pages/dashboard.html")
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



// In case you want to use this password validation

// const passwordValidation = (string) => {
//   const specialCharsRegex = /^(?=.*[!@#$%^&*]).{8,}$/
//   const hasSpecialChars = specialCharsRegex.test(string)

//   console.log(hasSpecialChars)

//   return !hasSpecialChars
// }