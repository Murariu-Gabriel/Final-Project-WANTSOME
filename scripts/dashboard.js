// FETCHING DATA ADDING IT IN LOCAL STORAGE TO BE USED IN ALL PAGES

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


const firstResponse = (response) => {
  if (response.ok && response.status === 200) {
    return response.json()
  }
  
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

})
.catch(error)



// CAROUSEL


// - LOADING CAROUSEL ITEMS

const track = document.getElementById("carousel-track")

const createCarouselElement = (name, imagePath, description, id) => {
  const listElement = document.createElement("li")
  listElement.classList.add("carousel-slide")

  listElement.innerHTML = `
    <img
      class="category-image"
      src="${imagePath}"
      alt="${name}"
    />
    <div>
      <h2>${name}</h2>
      <p>
        ${description}
      </p>
      <a
        href="/html-pages/product-page.html?productId=${id}"
        class="button-2b"
        >see product</a
      >
    </div>
  `

  return listElement
}

const items = JSON.parse(localStorage.getItem("products"))
const newItems = items.filter((item) => item.new && item.slug !== "S1-Pro")


const loadCarousel = (items, parent) => {

  items.forEach((item, index) => {
    const {name, images, shortDescription, id} = item

    const element = createCarouselElement(
      name,
      images.productDisplay, 
      shortDescription,
      id
    )

    if(index === 0){
      element.classList.add("current-slide")
    }

    parent.appendChild(element)

  })
}

loadCarousel(newItems, track)


// CAROUSEL FUNCTIONALITY

const slides = Array.from(track.children)
const nextBtn = document.querySelector(".button-right")
const previousBtn = document.body.querySelector(".button-left")
const carouselNav = document.body.querySelector(".carousel-nav")
const navDots = Array.from(carouselNav.children)
const carouselButtons = carouselNav.children


const slideWidth = slides[0].getBoundingClientRect().width


const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`
}

slides.forEach(setSlidePosition)


const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`
  currentSlide.classList.remove("current-slide")
  targetSlide.classList.add("current-slide")
}

const updateDots = (selected, target) => {
  selected.classList.remove("current-slide")
  target.classList.add("current-slide")
}


let carouselTimeout

previousBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide")
  const previousSlide = currentSlide.previousElementSibling
  const currentDot = carouselNav.querySelector(".current-slide")
  const previousDot = currentDot.previousElementSibling

  resetAutomaticSwitch()
  
  if (carouselButtons[0].classList.contains("current-slide")) {
    carouselButtons[carouselButtons.length - 1].click()
    return
  }

  moveToSlide(track, currentSlide, previousSlide)
  updateDots(currentDot, previousDot)

})


nextBtn.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide")
  const nextSlide = currentSlide.nextElementSibling
  const currentDot = carouselNav.querySelector(".current-slide")
  const nextDot = currentDot.nextElementSibling

  resetAutomaticSwitch()

  if (carouselButtons[carouselButtons.length - 1].classList.contains("current-slide")) {
    carouselButtons[0].click()
    return
  }

  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
})


carouselNav.addEventListener("click", e => {
  const target = e.target.closest("button")

  if(!target) return

  resetAutomaticSwitch()

  const currentSlide = track.querySelector(".current-slide")
  const selected = carouselNav.querySelector(".current-slide")
  const index = navDots.findIndex(dot => dot === target)
  const targetSlide = slides[index]
  
  moveToSlide(track, currentSlide, targetSlide)

  updateDots(selected, target)
})


// TIMED SWIPE OF CAROUSEL


const setAutomaticSwitch = () => {
  
  carouselTimeout = setInterval(() => { nextBtn.click() }, 8000)

}

setAutomaticSwitch()

const resetAutomaticSwitch = () => {
  clearInterval(carouselTimeout)
  carouselTimeout = setInterval(() => { nextBtn.click() }, 8000)

}























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





// OLD CODE JUST IN CASE NAV NEEDS REWRITING

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
