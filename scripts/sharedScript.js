// Shared local storage loading

const loadInputs = (inputs) => {
  for (const input of inputs) {
    const inputName = input.getAttribute("name")
    const localStorageValue = localStorage.getItem(inputName)
    input.value = localStorageValue
  }
}

// Shared validation

const addInLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}