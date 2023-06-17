// SHARED NAV TOGGLE

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


// CHECKING PAGE

const searchParameters = new URLSearchParams(window.location)
const parameters = Object.fromEntries(searchParameters.entries())




// Shared local storage loading

if(parameters.pathname !== "/html-pages/checkout.html"){

  const loadInputs = (inputs) => {
    for (const input of inputs) {
      const inputName = input.getAttribute("name")
      const localStorageValue = localStorage.getItem(inputName)
      input.value = localStorageValue
    }
  }
}
// Shared validation

const addInLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}


// SHARED CART FUNCTIONALITY

const cartButton = document.getElementById("cart-button")
const cartContainer = document.getElementById("cart-container")
const cartCounter = document.getElementById("cart-counter")

console.log(cartButton)

cartButton.addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart")
  document.body.classList.toggle("stop-scroll")
  calculateTotal(cartList.children)
  cartCounter.innerText = cartList.children.length
})


const productListString = localStorage.getItem("products")
const productList = JSON.parse(productListString)

const cartList = document.getElementById("cart-list")
console.log(cartList)

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

// console.log(cart)

const existingCartProducts = localStorage.getItem("cart-products")
const parsedCartProducts = JSON.parse(existingCartProducts)
const cart = parsedCartProducts ? parsedCartProducts : []

const loadCart = () => {
  cart.forEach((cartEl) => {
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

const totalPrice = document.getElementById("total-price")

const calculateTotal = (list) => {
  let total = 0
  for (const el of list) {
    const elInput = el.querySelector("input")
    const elPrice = el.querySelector("p span:nth-of-type(2)")
    const inputValue = parseInt(elInput.value)
    const productPrice = parseInt(elPrice.innerText)
    total = total + inputValue * productPrice
    console.log(inputValue)
  }
  totalPrice.innerText = total
}



// BACK TO TOP

if(parameters.pathname !== "/html-pages/checkout.html"){

  const toTopBtn = document.getElementById("back-to-top")
  
  // window.onscroll = () => {
  //   if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10){
  //     toTopBtn.classList.remove("hide")
  //   } else {
  //     toTopBtn.classList.add("hide")
  //   }
  // }
  
  window.addEventListener("scroll", (e) => {
    if(window.scrollY > 10){
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

}  

