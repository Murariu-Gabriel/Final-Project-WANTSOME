// FETCHING DATA AN MAKING IT USABLE

const getProducts = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5500/products.json")
    const data = await response.json()
    const storableData = JSON.stringify(data)

    const existingData = storableData ? storableData : []

    localStorageLoadData("products", existingData)

  } catch (error) {
    console.log(error)
  }
 
}

const localStorageLoadData = (name, data) => {
  localStorage.setItem(name, data)
}

getProducts()


const users = localStorage.getItem("products")
const parsedProducts = JSON.parse(users)

console.log(parsedProducts)




const firstResponse = (response) => {
  if (response.ok && response.status === 200) {
    return response.json()
  }
  console.log(response)
  return Promise.reject("ERROR")
}

function error(error) {
  alert(error)
}

fetch("../ranges.json")
.then(firstResponse)
.then((response) => {

  const priceRanges = JSON.stringify(response)

  localStorageLoadData("price-ranges", priceRanges)
  console.log(response)


})
.catch(error)


// localStorage.removeItem("price-ranges")

/// Left this here so you just know 


// import { faker } from "https://cdn.skypack.dev/@faker-js/faker"

// console.log(faker.person.fullName())









































// LOADING CART

// const productListString = localStorage.getItem("products")
// const productList = JSON.parse(productListString)

// const cartList = document.getElementById("cart-list")
// console.log(cartList)

// const addListEl = (
//   productId,
//   productImg,
//   productAlt,
//   productName,
//   productPrice,
//   productCount
// ) => {
//   const li = document.createElement("li")
//   li.setAttribute("id", `list-${productId}`)
//   li.innerHTML = `<div class="img-container">
//       <img src=${productImg} alt=${productAlt} />
//     </div>

//     <p>
//       <strong>${productName}</strong>
//       <span>$</span>
//       <span>${productPrice}</span>
//     </p>

//     <div class="input-stepper">
//       <button id="decrement" type="button">-</button>
//       <input
//         type="number"
//         class="product-counter"
//         value="${productCount}"
//         min="1"
//         max="100"
//         readonly
//       />
//       <button id="increment" type="button">+</button>
//     </div>`

//   return li
// }

// // console.log(cart)

// const existingCartProducts = localStorage.getItem("cart-products")
// const parsedCartProducts = JSON.parse(existingCartProducts)
// const cart = parsedCartProducts ? parsedCartProducts : []


// const loadCart = () => {
//   cart.forEach((cartEl) => {
//     const product = productList.find((element) => element.id === cartEl.id)

//     const listEL = addListEl(
//       product.id,
//       product.images.display.first,
//       product.name,
//       product.slug,
//       product.price,
//       cartEl.count
//     )
//     cartList.appendChild(listEL)
//   })
// }

// loadCart()
// const totalPrice = document.getElementById("total-price")
// const calculateTotal = (list) => {
//   let total = 0
//   for (const el of list) {
//     const elInput = el.querySelector("input")
//     const elPrice = el.querySelector("p span:nth-of-type(2)")
//     const inputValue = parseInt(elInput.value)
//     const productPrice = parseInt(elPrice.innerText)
//     total = total + inputValue * productPrice
//     console.log(inputValue)
//   }
//   totalPrice.innerText = total
// }











// IN cazul in care te razgandesti la nav toggle

// if (hamburgerButton.classList.contains("toggle-close")) {
//   hamburgerButton.innerHTML = `
//     <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
//       <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z">
//       </path>
//     </svg>
//         `
// } else {
//   hamburgerButton.innerHTML = `
//     <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
//       <g fill-rule="evenodd">
//         <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
//       </g>
//     </svg>         `
// }
// })
