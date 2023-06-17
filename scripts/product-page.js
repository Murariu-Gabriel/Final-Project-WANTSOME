// Loading cart

const existingCartProducts = localStorage.getItem("cart-products")
const parsedCartProducts = JSON.parse(existingCartProducts)
const cart = parsedCartProducts ? parsedCartProducts : []

// Nav toggle

const headerNav = document.getElementById("header-nav")
const buttons = document.querySelectorAll("header button")

const addToggleFunctionality = () => {
  for (const button of buttons) {
    if (button.classList.contains("display-none")) {
      button.classList.toggle("display-none")
      document.body.classList.toggle("stop-scroll")
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

// GOING BACK

const backButton = document.getElementById("go-back")

backButton.addEventListener("click", () => {
  history.back()
})

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
  const productDescription = document.body.querySelector(
    ".product-info p:not(.overline)"
  )
  const productPrice = document.body.querySelector(".product-info strong span")
  const productFeatures = document.body.querySelector("#features p")

  const boxItems = document.getElementById("box-items")

  const displayImages = document.body.querySelectorAll(
    ".product .presentation-images img"
  )

  // Loading product info in the page
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

// BUTTON Increment part

const productCounter = document.getElementById("product-counter")
const countButtons = document.body.querySelectorAll(
  "#counter-form button:not(.button-1)"
)

const addCountFunctionality = (list) => {
  for (let button of list) {
    button.addEventListener("click", (e) => {
      counter(e.target, productCounter)
    })
  }
}

addCountFunctionality(countButtons)

const counter = (element, counter) => {
  const id = element.getAttribute("id")
  const min = counter.getAttribute("min")
  const max = counter.getAttribute("max")
  const value = counter.value
  const currentNum = parseInt(value)
  const add = currentNum + 1
  const substract = currentNum - 1
  const newValue = id === "increment" ? add : substract

  if (newValue >= min && newValue <= max) {
    counter.setAttribute("value", newValue)
  }
}

// CART TOGGLE

const cartButton = document.getElementById("cart-button")
const cartContainer = document.getElementById("cart-container")

// Decided that I want to calculate total amount only when I open cart
cartButton.addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart")
  document.body.classList.toggle("stop-scroll")
  cartCounter.innerText = cartList.children.length
calculateTotal(cartList.children)
// console.log(cartList.children)
})

// CART FUNCTIONALITY

const cartList = document.getElementById("cart-list")
const cartCounter = document.getElementById("cart-counter") // car5 counter este lungimea listei de produse
const addToCart = document.getElementById("add-to-cart")
const counterForm = document.getElementById("counter-form")
const totalPrice = document.getElementById("total-price")

counterForm.addEventListener("submit", (e) => {
  // e.preventDefault()
})

console.log(product)

const verifyIfIdExists = (list, id) => {
  for (const el of list) {
    if (el.id.includes(id)) {
      return true
    }
  }
  return false
}

const addProductCount = (list, id) => {
  for (const el of list) {
    if (el.id.includes(id)) {
      const elInput = el.querySelector("input")
      let inputValue = parseInt(elInput.value)
      let addValue = parseInt(productCounter.value)
      if (inputValue + addValue < 100) {
        elInput.value = inputValue + addValue
      }
      break
    }
  }
}

const calculateTotal = (list) => {
  let total = 0
  for (const el of list) {
    const elInput = el.querySelector("input")
    const elPrice = el.querySelector("p span:nth-of-type(2)")
    const inputValue = parseInt(elInput.value)
    const productPrice = parseInt(elPrice.innerText)
    total = total + (inputValue * productPrice)
    console.log(inputValue)
  }
  totalPrice.innerText = total
}

//  cart.push("productInfo")
//  const newProducts = JSON.stringify(cart)
//  localStorage.setItem("cart-products", newProducts)

const addListEl = (
  productId,
  productImg,
  productAlt,
  productName,
  productPrice,
  productCount
) => {
  const li = document.createElement("li")
  li.setAttribute("id", `list-${productId}`)
  li.innerHTML = `<div class="img-container">
      <img src=${productImg} alt=${productAlt} />
    </div>

    <p>
      <strong>${productName}</strong>
      <span>$</span>
      <span>${productPrice}</span>
    </p>

    <div class="input-stepper">
      <button id="decrement" type="button">-</button>
      <input
        type="number"
        class="product-counter"
        value="${productCount}"
        min="1"
        max="100"
        readonly
      />
      <button id="increment" type="button">+</button>
    </div>`

  return li
}

console.log(cart)

const loadCart = () => {

  cart.forEach(cartEl => {
    const product = productList.find((element) => element.id === cartEl.id)

    const listEL = addListEl(
    product.id,
    product.images.display.first,
    product.name,
    product.slug,
    product.price,
    cartEl.count
  )
    cartList.appendChild(listEL)

  })
}

loadCart()

// pana acum ca sa adaug pe toate paginile load cart trebuie sa transfer load cart, cartList selector addListEL
// localStorage.removeItem("cart-products")

addToCart.addEventListener("click", () => {
  
  const listEl = addListEl(
    product.id,
    product.images.display.first,
    product.name,
    product.slug,
    product.price,
    productCounter.value
  )

  if (verifyIfIdExists(cartList.children, product.id)) {
    addProductCount(cartList.children, product.id)
  } else {
    cartList.appendChild(listEl)
  }

  const newCartProduct = {
    id: product.id,
    count: productCounter.value,
  }

  // cart.push(newCartProduct)
  // const newProducts = JSON.stringify(cart)
  // localStorage.setItem("cart-products", newProducts)
  addToLocalStorage(newCartProduct, product.id, productCounter.value)
})
// localStorage.removeItem("cart-products")


const returnEL = (list, id) => {
  for(const el of list){
    if(el.id === id){
      return el
    }
  }

}

const returnValue = (list, id) => {
  for (const el of list) {
    if (el.id === id) {
      return el.count
    }
  }
}

const addToLocalStorage = (object) => {
  if(cart.length === 0){
    cart.push(object)
  } else {
    if(verifyIfIdExists(cart, object.id)){
      const element = returnEL(cart, object.id)
      element.count = parseInt(returnValue(cart, object.id)) + parseInt(productCounter.value)
    } else {
       object.count = 1
        cart.push(object)
    }
  }
  const newProducts = JSON.stringify(cart)
  localStorage.setItem("cart-products", newProducts)
}

// console.log(addToLocalStorage())
// console.log(cartCounter)
// console.log(totalPrice)

// CART LIST ELEMENT FUNCTIONALITY 
//cartList

const cartInputs = cartList.querySelectorAll(".input-stepper")
// console.log(cartInputs)
for(const container of cartInputs){
  const containerButtons = container.querySelectorAll("button")
  const input = container.querySelector(".product-counter")
  for(const button of containerButtons){
    button.addEventListener("click", (e) => {
       counter(e.target, input)
       calculateTotal(cartList.children)
      //  console.log(input)
    })
  }
}

// console.log(cartInputs)

// const productCounter = document.getElementById("product-counter")
// const countButtons = document.body.querySelectorAll(
//   "#counter-form button:not(.button-1)"
// )

// const addCountFunctionality = (list) => {
//   for (let button of list) {
//     button.addEventListener("click", (e) => {
//       counter(e.target)
//     })
//   }
// }

// addCountFunctionality(countButtons)

// const counter = (element) => {
//   const id = element.getAttribute("id")
//   const min = productCounter.getAttribute("min")
//   const max = productCounter.getAttribute("max")
//   const value = productCounter.value
//   const currentNum = parseInt(value)
//   const add = currentNum + 1
//   const substract = currentNum - 1
//   const newValue = id === "increment" ? add : substract

//   if (newValue >= min && newValue <= max) {
//     productCounter.setAttribute("value", newValue)
//   }
// }

















// Back to top

const toTopBtn = document.getElementById("back-to-top")

// window.onscroll = () => {
//   if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10){
//     toTopBtn.classList.remove("hide")
//   } else {
//     toTopBtn.classList.add("hide")
//   }
// }

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 10) {
    // toTopBtn.classList.remove("hide")
    toTopBtn.style.display = "block"
  } else {
    // toTopBtn.classList.add("hide")
    toTopBtn.style.display = "none"
  }
})

// {top: 0, behavior: "smooth"} would look nicer but it s not supported on MAC
toTopBtn.addEventListener("click", () => {
  window.scrollTo(0, 0)
})

// In case I need increment button selectors

// const incrementBtn = document.getElementById("increment")
// const decrementBtn = document.getElementById("decrement")
// const form = document.querySelector("form")

// console.log(countButtons)

// form.addEventListener("submit", () => {
//   e.preventDefault()
// })
