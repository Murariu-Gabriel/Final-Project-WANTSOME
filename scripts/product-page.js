// Nav toggle

const headerNav = document.getElementById("header-nav")
const buttons = document.querySelectorAll("header button")

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

    if (id !== "cart-button") {
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


// CART TOGGLE

const cartButton = document.getElementById("cart-button")
const cartContainer = document.getElementById("cart-container")

console.log(cartButton)

cartButton.addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart")
  document.body.classList.toggle("stop-scroll")
})

// GOING BACK

const backButton = document.getElementById("go-back")

  backButton.addEventListener("click", () => {
    history.back()
  })

// BUTTON Increment part

const productCounter = document.getElementById("product-counter")
const countButtons = document.body.querySelectorAll(
  "#count-form button:not(.button-1)"
)

const addCountFunctionality = () => {
  for (let button of countButtons) {
    button.addEventListener("click", (e) => {
      counter(e.target)
    })
  }
}

addCountFunctionality()

const counter = (element) => {
  const id = element.getAttribute("id")
  const min = productCounter.getAttribute("min")
  const max = productCounter.getAttribute("max")
  const value = productCounter.value
  const currentNum = parseInt(value)
  const add = currentNum + 1
  const substract = currentNum - 1
  const newValue = id === "increment" ? add : substract

  if (newValue >= min && newValue <= max) {
    productCounter.setAttribute("value", newValue)
  }
}



// getting id from window and then searching the item in products
const searchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(searchParams.entries())

const productListString = localStorage.getItem("products")


// Guard IF
if (!productListString) {
  // aici trebuie sa afisezi pe pagina ceva eroare
  alert("Ceva s-a intamplat, trebuie vazut in localStorage")
}

const productList = JSON.parse(productListString)

const product = productList.find((element) => element.id === params.productId)

if (!product) {
  // Aici trebuie sa faci ceva eroare sa apara pe ecran
} else {
  // Displaying the product information
  const productImg = document.body.querySelector(".image-container img")
  const newProduct = document.body.querySelector(".product-info p.overline")
  const productTitle = document.getElementById("title")
  const productDescription = document.body.querySelector(".product-info p:not(.overline)")
  const productPrice = document.body.querySelector(".product-info strong span")
  const productFeatures = document.body.querySelector("#features p")

  const boxItems = document.getElementById("box-items")

  const displayImages = document.body.querySelectorAll(
    ".product .presentation-images img"
  )

  // Loading product info in the page
  console.log(product)
  if (!product.new) {
    newProduct.classList.add("hide")
  }

  productImg.setAttribute("src", product.images.display.second)
  productImg.setAttribute("atl", product.name)
  productTitle.innerText = product.name
  productDescription.innerText = product.description
  productPrice.innerText = product.price
  productFeatures.innerText = product.features

  // in the box
  const productItems = product.includes
  productItems.forEach((productItem) => {
    const boxItem = document.createElement("p")
    boxItem.innerHTML = `<span>x${productItem.quantity}</span> ${productItem.item}`

    boxItems.appendChild(boxItem)
  })

  // display presentation images

  const productPresentation = product.images.gallery
  displayImages.forEach((img, index) => {
    img.setAttribute("src", productPresentation[index].img)
    // img
  })



}

// localStorage.clear()































// In case I need increment button selectors

// const incrementBtn = document.getElementById("increment")
// const decrementBtn = document.getElementById("decrement")
// const form = document.querySelector("form")

// console.log(countButtons)

// form.addEventListener("submit", () => {
//   e.preventDefault()
// })
