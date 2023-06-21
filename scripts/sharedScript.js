// cart remove button

const cartDeleteAll = document.getElementById("remove-cart-all")

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

const closeButton = document.getElementById("x-button")
const popButton = document.getElementById("h-button")
const secondNav = document.getElementById("visual-nav")

headerNav.addEventListener("click", () => {
  closeButton.classList.toggle("display-none")
   popButton.classList.toggle("display-none")
   headerNav.classList.toggle("nav-toggle")
  document.body.classList.toggle("stop-scroll")
})

secondNav.addEventListener("click", (e) => {
  e.stopPropagation()
})

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
const cartForm = document.getElementById("count-form")

cartContainer.addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart")
  document.body.classList.toggle("stop-scroll")
})



cartForm.addEventListener("click", (e) => {
  e.stopPropagation()
})

const hideRemoveAll = (num) => {
  if(num === 0){
    cartDeleteAll.classList.toggle("hide")
  }
}

const updateCounter = () => {
  cartCounter.innerText = cartList.children.length

  hideRemoveAll(cartList.children.length)
}


cartButton.addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart")
  document.body.classList.toggle("stop-scroll")
  calculateTotal(cartList.children)
  updateCounter()
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
        min="0"
        max="100"
        readonly
      />
      <button id="increment" type="button">+</button>
    </div>`

  return li
}

const returnEL = (list, id) => {
  for (const el of list) {
    if (el.id === id) {
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

const existingCartProducts = localStorage.getItem("cart-products")
const parsedCartProducts = JSON.parse(existingCartProducts)
const cart = parsedCartProducts ? parsedCartProducts : []

const addToLocalStorage = (productId, ProductValue, operation) => {
  
const existingCartProducts = localStorage.getItem("cart-products")
const parsedCartProducts = JSON.parse(existingCartProducts)
const cart = parsedCartProducts ? parsedCartProducts : []

  const object = {
    id: productId,
    count: parseInt(ProductValue),
  }

  console.log(object.count)

  if (cart.length === 0) {
    cart.push(object)
  } else {
    if (verifyIfIdExistsForCart(cart, object.id) && object.count !== 0) {
      console.log(verifyIfIdExistsForCart(cart, object.id))
      console.log(cart, object.id)
      const element = returnEL(cart, object.id)
      element.count = parseInt(object.count)

      const newProducts = JSON.stringify(cart)
      localStorage.setItem("cart-products", newProducts)

     
    } 
   

    // else if (operation === "decrement") {
    //   console.log(cart, object.id)
    //   if (verifyIfIdExists(cart, object.id)) {
    //     const element = returnEL(cart, object.id)
    //     console.log(element)
    //     element.count = parseInt(object.count)
    //     return
    //   }
    // }

  }
    // const newProducts = JSON.stringify(cart)
    // localStorage.setItem("cart-products", newProducts)
  
}

 // else {
    //   console.log("ELSE")
    //   object.count = 1
    //   cart.push(object)
    // }


// const addToLocalStorage = (productId, ProductValue, operation) => {
//   const object = {
//     id: productId,
//     count: parseInt(ProductValue),
//   }

//   console.log(object.count)

//   if (cart.length === 0) {
//     cart.push(object)
//     console.log("bleah")
//   } else {
//     if (verifyIfIdExistsForCart(cart, object.id)) {
//       const element = returnEL(cart, object.id)
//       element.count = parseInt(object.count)
//     } 
//     else if (operation === "decrement") {
//       console.log(cart, object.id)
//       if (verifyIfIdExists(cart, object.id)) {
//         const element = returnEL(cart, object.id)
//         element.count = parseInt(object.count)
//       }
//     } 
//     else {
//        console.log("da")
//        object.count = 1
//        cart.push(object)
//     }
  
//   }

  
//   const newProducts = JSON.stringify(cart)
//   localStorage.setItem("cart-products", newProducts)
// }





// const addToLocalStorage = (productId, ProductValue, operation) => {
//   const object = {
//     id: productId,
//     count: parseInt(ProductValue),
//   }

//   if (cart.length === 0) {
//     cart.push(object)
//   } else {
//     if (operation === "decrement") {
//       if (verifyIfIdExists(cart, object.id) && parseInt(object.count)) {
//         const element = returnEL(cart, object.id)
//         element.count = parseInt(object.count)
//         return
//       }
//     } else if (verifyIfIdExistsForCart(cart, object.id)) {
//       const element = returnEL(cart, object.id)
//       element.count = parseInt(returnValue(cart, object.id)) + 1
//       return
//     } else {
//       object.count = 1
//       cart.push(object)
//     }
//   }

//   const newProducts = JSON.stringify(cart)
//   localStorage.setItem("cart-products", newProducts)
// }



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


const cartButtonsEvent = (e) => {
  const id = e.target.parentNode.parentNode.id.slice(5, 12)
  const input = e.target.parentNode.querySelector(".product-counter")

  counter(e.target, input)
  calculateTotal(cartList.children)
  addToLocalStorage(id, input.value, e.target.id)
  console.log("Da2123123")
    const value = parseInt(input.value)

  if (value === 0) {
    console.log(parseInt(input.value), "asdadjhashabsdpiu")
    const otherButton = e.target.parentNode.querySelector("#increment")
    const listElement = e.target.parentNode.parentNode
    e.target.removeEventListener("click", cartButtonsEvent)
    otherButton.removeEventListener("click", cartButtonsEvent)
    listElement.remove()
    deleteFromStorage(id)

    console.log(id, "ASDASDASD")
  }

  updateCounter()
}
//  localStorage.removeItem("cart-products")



const cartListFunctionality = (parent) => {
  const containerButtons = parent.querySelectorAll("button")
  // console.log(containerButtons)
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
// console.log(cart)


const totalPrice = document.getElementById("total-price")

const calculateTotal = (list) => {
  let total = 0
  for (const el of list) {
    const elInput = el.querySelector("input")
    const elPrice = el.querySelector("p span:nth-of-type(2)")
    const inputValue = parseInt(elInput.value)
    const productPrice = parseInt(elPrice.innerText)
    total = total + inputValue * productPrice
  }
  totalPrice.innerText = total
}








cartDeleteAll.addEventListener("click", (e) => {
  e.preventDefault()
  
  const cartItems = cartList.children

  for (const item of cartItems) {
    removeCartListFunctionality(item)
  }

  cartList.innerHTML = ""

  localStorage.removeItem("cart-products")
  calculateTotal(cartList.children)
  updateCounter()
})


const deleteFromStorage = (identification) => {
  const getLocal = localStorage.getItem("cart-products")
  const cartProducts = JSON.parse(getLocal)

  if (verifyIfIdExistsForCart(cartProducts, identification)) {
    // console.log(verifyIfIdExistsForCart(cart, identification))
    // console.log(cart)
    const newCart = cartProducts.filter((el) => {
      // console.log(el.id, identification)
      return el.id !== identification
    })
    console.log(newCart)
    const newCartItems = JSON.stringify(newCart)
    localStorage.setItem("cart-products", newCartItems)
  }
}

// console.log(cart)
//  const item = cart.filter(el => el.id != "item-2")
//  console.log(item)
//  const newCartItems = JSON.stringify(item)
//  localStorage.setItem("cart-products", newCartItems)

// console.log(localStorage.getItem("cart-products"))


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

