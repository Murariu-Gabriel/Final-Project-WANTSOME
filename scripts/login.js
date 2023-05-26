const form = document.querySelector("form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const emailError = document.getElementById("email-error")
const passwordError = document.getElementById("password-error")


// Ideea este in mare ca probabil nu ai nevoie asa mare de validare la login ci mai mult la sign-in

// De notat este ca probabil voi folosi regex ca sa verific text-ul de caractere speciale cel putin la urmatorul form

form.addEventListener("submit", (e) => {
  
  if(email.value === ""){
    emailError.innerText = "Input is empty"
    e.preventDefault()

  }
})

email.addEventListener("keyup", () => {
   
})


//Probabil acest clip te ja ajuta la acest capito

// https://www.youtube.com/watch?v=D9JHizCAx8U
// https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation