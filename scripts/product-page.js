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
  })
}

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
  console.log(currentNum)
  const add = currentNum + 1
  const substract = currentNum - 1
  console.log(substract)
  const newValue = id === "increment" ? add : substract
  if (newValue >= min && newValue <= max) {
    counter.setAttribute("value", newValue)
    console.log("da")
  }
}

// const liCounter = (element, counter) => {
//   const id = element.getAttribute("id")
//   const min = counter.getAttribute("min")
//   const max = counter.getAttribute("max")
//   const value = counter.value
//   const currentNum = parseInt(value)
//   const add = currentNum + 1
//   const substract = currentNum - 1
//   const newValue = id === "increment" ? add : substract
//   console.log(newValue)
//   if (newValue >= min && newValue <= max) {
//     counter.setAttribute("value", newValue)
//   }
// }

// CART TOGGLE

const cartButton = document.getElementById("cart-button")
const cartContainer = document.getElementById("cart-container")

const updateCounter = () => {
  cartCounter.innerText = cartList.children.length
}

// Decided that I want to calculate total amount only when I open cart
cartButton.addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart")
  document.body.classList.toggle("stop-scroll")
  updateCounter()
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

const verifyIfIdExistsForCart = (list, id) => {
  for (const el of list) {
    if (el.id === id) {
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
        const sum = inputValue + addValue
        elInput.setAttribute("value", sum)
      }
      console.log(elInput)
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
    // console.log(inputValue)
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
        min="0"
        max="100"
        readonly
      />
      <button id="increment" type="button">+</button>
    </div>`

  return li
}

console.log(cart)



// pana acum ca sa adaug pe toate paginile load cart trebuie sa transfer load cart, cartList selector addListEL
// localStorage.removeItem("cart-products")

addToCart.addEventListener("click", () => {
  
  if (verifyIfIdExists(cartList.children, product.id)) {
    addProductCount(cartList.children, product.id)
  } else {

    const listEl = addListEl(
      product.id,
      product.images.display.first,
      product.name,
      product.slug,
      product.price,
      productCounter.value
    )


    cartListFunctionality(listEl)
    cartList.appendChild(listEl)
  }
 
  addToLocalStorage(product.id, productCounter.value) 
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

//  addToLocalStorage(newCartProduct, product.id, productCounter.value)

// THIS IS WEIRD I HAVE TO ACCESS INDIVIDUALLY LOCAL STORAGE
const deleteFromStorage = (identification) => {
  const getLocal = localStorage.getItem("cart-products")
  const cartProducts = JSON.parse(getLocal)

  if (verifyIfIdExistsForCart(cartProducts, identification)) {
    const newCart = cartProducts.filter((el) => {
      return el.id !== identification
    })
    const newCartItems = JSON.stringify(newCart)
    localStorage.setItem("cart-products", newCartItems)
  }
}

// THIS IS WEIRD I HAVE TO ACCESS INDIVIDUALLY LOCAL STORAGE

const addToLocalStorage = (productId, ProductValue, operation) => {

const existingCartProducts = localStorage.getItem("cart-products")
const parsedCartProducts = JSON.parse(existingCartProducts)
const cart = parsedCartProducts ? parsedCartProducts : []

  const object = {
    id: productId,
    count: parseInt(ProductValue),
  }

  console.log(object.count)
   
    if(cart.length === 0){
      cart.push(object)
    } else {
     if (verifyIfIdExistsForCart(cart, object.id)) {
        console.log(verifyIfIdExistsForCart(cart, object.id))
        console.log(cart, object.id)
        const element = returnEL(cart, object.id)
        element.count =
          parseInt(returnValue(cart, object.id)) +
          parseInt(productCounter.value)
      } 
      else {
        object.count = 1
        cart.push(object)
      }

       if (operation === "decrement") {
        console.log(cart, object.id)
        if (verifyIfIdExists(cart, object.id)) {
          const element = returnEL(cart, object.id)
          element.count = parseInt(object.count)
        }
      } 
    }
  

  const newProducts = JSON.stringify(cart)
  localStorage.setItem("cart-products", newProducts)
}






// CART LIST ELEMENT FUNCTIONALITY 
// localStorage.removeItem("cart-products")


const cartButtonsEvent = (e) => {
      const id = e.target.parentNode.parentNode.id.slice(5,12)
      const input = e.target.parentNode.querySelector(".product-counter")
      if(parseInt(input.value) !== 0){
        console.log(input)
        counter(e.target, input)
        calculateTotal(cartList.children)
        addToLocalStorage(id, input.value, e.target.id)
      } else {
          deleteFromStorage(id)
      }
      if(parseInt(input.value) === 0){
        const otherButton = e.target.parentNode.querySelector("#increment")
        const listElement = e.target.parentNode.parentNode
        e.target.removeEventListener("click", cartButtonsEvent)
        otherButton.removeEventListener("click", cartButtonsEvent)
        listElement.remove()
        deleteFromStorage(id)
      }
      updateCounter()
}


const cartListFunctionality = (parent) => {
   const containerButtons = parent.querySelectorAll("button")
   console.log(containerButtons)
   for (const button of containerButtons) {
     button.addEventListener("click", cartButtonsEvent)
   }
}

const removeCartListFunctionality = (parent) => {
  const containerButtons = parent.querySelectorAll("button")
  console.log(containerButtons)
  for (const button of containerButtons) {
    button.removeEventListener("click", cartButtonsEvent)
  }
}

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
    cartListFunctionality(listEL)
    cartList.appendChild(listEL)
  })
}

loadCart()


const cartDeleteAll = document.getElementById("remove-cart-all")

cartDeleteAll.addEventListener("click", (e) => {
  e.preventDefault()
  const cartItems = cartList.children
 
  for(const item of cartItems){
    removeCartListFunctionality(item)
  }

  cartList.innerHTML = ""

  localStorage.removeItem("cart-products")
  calculateTotal(cartList.children)
  updateCounter()
})














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
