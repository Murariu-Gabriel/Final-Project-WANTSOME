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

    if (id === "h-button" || id === "x-button") {
      button.addEventListener("click", (e) => {
        headerNav.classList.toggle("nav-toggle")
        const eventButton = e.target
        addToggleFunctionality()

          if (id === "h-button") {
            document.body.classList.add("stop-scroll")
            cartContainer.classList.remove("show-cart")
          } else {
            document.body.classList.remove("stop-scroll")
          }

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
  const overline = document.body.querySelector('.overline')

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
  overline.innerText = product.new ? "new product" : ""
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
    console.log(newValue)
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
const cartForm = document.getElementById("count-form")

cartContainer.addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart")
  document.body.classList.toggle("stop-scroll")
  //  cartContainer.classList.toggle.
})

cartForm.addEventListener("click", (e) => {
  e.stopPropagation()
})

const hideRemoveAll = (num) => {
  if (num === 0) {
    cartDeleteAll.classList.toggle("hide")
  }
}

const updateCounter = () => {
  cartCounter.innerText = cartList.children.length

  hideRemoveAll(cartList.children.length)
}
// Decided that I want to calculate total amount only when I open cart
cartButton.addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart")
  document.body.classList.toggle("stop-scroll")
  updateCounter()
  calculateTotal(cartList.children)

   if (headerNav.classList.contains("nav-toggle")) {
     closeButton.classList.add("display-none")
     popButton.classList.remove("display-none")
     headerNav.classList.remove("nav-toggle")
     document.body.classList.add("stop-scroll")
   }
})

// CART FUNCTIONALITY

const cartList = document.getElementById("cart-list")
const cartCounter = document.getElementById("cart-counter") 
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
        const element = returnEL(cart, object.id)
        const ifListIncrement = operation === "increment" ? 1 : parseInt(productCounter.value)
        element.count = parseInt(returnValue(cart, object.id)) + ifListIncrement
    
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
        console.log(input.value)
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

// YOU MAY ALSO LIKE

const recommendedProducts = document.getElementById("recommended-products")



const itemsWithoutCurrentOne = productList.filter((element) => element.id !== params.productId)



const recommendedProduct = (productImage, productName, productId, secondImage) => {
  const article = document.createElement("article")
  article.innerHTML = `
    <div>
      <div class="img-container">
        <img
          class="category-image image-1"
          src=${productImage}
          alt=${productName}
        />
      </div>
      <h3>${productName}</h3>
      <a href="/html-pages/product-page.html?productId=${productId}" class="button-1">see product</a>
    </div>
    <a href="/html-pages/product-page.html?productId=${productId}" class="big-link"></a> 
  `

  article.addEventListener("mouseenter", (e) => {
    const img = e.target.querySelector("img")
    img.setAttribute("src", secondImage)
    img.style.transform = " scale(1.1)"
  })
  
  article.addEventListener("mouseleave", (e) => {
      const img = e.target.querySelector("img")
      img.setAttribute("src", productImage)
      img.style.transform = " scale(1)"
  })
  
  return article
}



// itemsWithoutCurrentOne.length
const randomNum = (max) => {
  return Math.floor(Math.random() * max)
}

console.log(randomNum(itemsWithoutCurrentOne.length))


 

const addRecommended = () => {
  const itemsPositions = []

  for(let i = 0; i < 3; i++){
    const randNum = randomNum(itemsWithoutCurrentOne.length)
    const randomItem = itemsWithoutCurrentOne[randNum]
    

     if(itemsPositions.includes(randNum)){
      i--
      continue
    }

    const product = recommendedProduct(
      randomItem.images.display.first,
      randomItem.name,
      randomItem.id,
      randomItem.images.display.second
    )
    recommendedProducts.appendChild(product)

    itemsPositions.push(randNum)
  }

  return itemsPositions
}

console.log(addRecommended())






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

// SEARCH FUNCTIONALITY



const searchContainer = document.getElementById("search-container")
const inputContainer = document.getElementById("input-container")
const dummy = document.getElementById("dummy")
const searchInput = document.getElementById("search-input")
const formContent = document.getElementById("form-content")
const searchResults = document.getElementById("search-results")
const closeSearch = document.getElementById("close-search")
const placeHolder = document.getElementById("place-holder")

const recentSearches = localStorage.getItem("recent-searches")
const parsedRecentSearches = JSON.parse(recentSearches)
const searches = parsedRecentSearches ? parsedRecentSearches : []
// const searches = recentSearches ? recentSearches : []

const getProductsData = () => {
  const allProducts = localStorage.getItem("products")
  const parsedAllProducts = JSON.parse(allProducts)
  const products = parsedAllProducts ? parsedAllProducts : []

  return products
}

const addSearchToggle = (e) => {
  if (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  searchContainer.classList.add("overlay2")
  inputContainer.classList.add("top")
  inputContainer.classList.add("search-animation")
  formContent.classList.add("contend-width")
  dummy.classList.remove("hide")
  searchResults.classList.remove("hide")
  closeSearch.classList.remove("hide")
  document.body.classList.add("stop-scroll")

  if (!cartContainer.classList.contains("hide")) {
    cartContainer.classList.remove("show-cart")
  }

  if (headerNav.classList.contains("nav-toggle")) {
    closeButton.classList.toggle("display-none")
    popButton.classList.toggle("display-none")
    headerNav.classList.toggle("nav-toggle")
  }

}


const removeSearchToggle = (e) => {
  if (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  searchContainer.classList.remove("overlay2")
  inputContainer.classList.remove("top")
  inputContainer.classList.remove("search-animation")
  formContent.classList.remove("contend-width")
  dummy.classList.add("hide")
  searchResults.classList.add("hide")
  closeSearch.classList.add("hide")
  document.body.classList.remove("stop-scroll")
}

searchInput.addEventListener("click", addSearchToggle)

closeSearch.addEventListener("click", (e) => {
  removeSearchToggle(e)
})

const listResults = searchResults.querySelector("ul")
const searchTitle = document.getElementById("search-title")
const searchButton = document.getElementById("search-button")

const searchValidation = (value) => {
  if (value.includes(" ") || value.length >= 2) {
    let letters = 0

    for (const letter of value) {
      if (letter !== " ") {
        letters++
      }
    }

    return letters >= 2
  }
}

const noMatterSearch = (windowKey) => {
  if (searchValidation(windowKey)) {
    searches.unshift(windowKey)

    window.location.assign(
      `http://127.0.0.1:5500/html-pages/search.html?search=${windowKey}"`
    )
  }

  const firstFourElements = searches.filter((element, index) => index < 4)

  console.log(firstFourElements)

  const stringSearches = JSON.stringify(firstFourElements)
  localStorage.setItem("recent-searches", stringSearches)
}

const placeHolderAssist = (text, value) => {
  const splitWord = text.split("")
  const wordStart = text.indexOf(value)
  const wordEnd = text.lastIndexOf(value)
  const whiteSpace = splitWord.splice(0, value.length, value)
  // const wordConversion = `<span class="highlight">${value}</span>`

  // splitWord.splice(wordStart, value.length,)
  //  const restOfSentence = text.substring(wordEnd, text.length)
  // console.log(restOfSentence)
  console.log(splitWord)
  console.log(text)
  // return whiteSpace + restOfSentence
  return splitWord.join("")
}

const cutBehindWord = (sentence, word) => {
  const startingWord = " " + word
  const start = sentence.indexOf(startingWord)
  // const whiteSpace = sentence.slice(0, start).replace(/./g, " ")
  if (start < 0) {
    return ""
  }
  const restOfSentence = sentence.substring(start, sentence.length)
  return restOfSentence
}

console.log(placeHolderAssist("garmin venu 2", "GARrmin venu"))

const highlight = (element, searchedWord) => {
  const span = element.querySelector("#list-text")
  const elementText = span.innerText

  const highlightAssist = () => {
    if (elementText.includes(searchedWord)) {
      const splitWord = elementText.split("")
      const wordStart = elementText.indexOf(searchedWord)
      const wordConversion = `<span class="highlight">${searchedWord}</span>`

      splitWord.splice(wordStart, searchedWord.length, wordConversion)

      console.log(splitWord)
      return splitWord.join("")
    }
  }
  span.innerHTML = highlightAssist()
}

searchInput.addEventListener("keyup", (e) => {
  const normalValue = e.target.value
  const value = e.target.value.toLowerCase()
  // e.target.value = value
  listResults.innerHTML = ""
  searchTitle.innerText = "Search suggestions"

  console.log(value.length)
  if (value.length < 2) {
    searchTitle.innerText = "Recent searches"
    fillListWithData(searches)
    placeHolder.classList.add("hide")
  }

  // console.log(e.key)
  // if(e.key === "Escape"){
  //     removeSearchToggle()
  // }
  if (e.key === "Enter") {
    e.preventDefault()
  }

  // NEXT

  const products = getProductsData()
  console.log(value)
  const inputSearchResult = products.filter((product) => {
    return product.name.includes(value) || product.category.includes(value)
    //  return product.name.startsWith(value) || product.category.startsWith(value)
  })
  const inputCategories = inputSearchResult.map((product) => product.category)
  const setCategories = new Set(inputCategories)
  const cleanCategories = [...setCategories]
  console.log(cleanCategories)

  placeHolder.innerText = ""

  if (value.length >= 2) {
    inputSearchResult.forEach((element, index) => {
      if (element.name.includes(value)) {
        const listElement = generateListElement(element.name)
        highlight(listElement, value)
        listResults.appendChild(listElement)
        const cutWord = cutBehindWord(inputSearchResult[0].name, value)

        placeHolder.innerText = inputSearchResult[0].name.startsWith(value)
          ? placeHolderAssist(inputSearchResult[0]?.name, normalValue) || ""
          : placeHolderAssist(cutWord.replace(" ", ""), normalValue)
        placeHolder.classList.remove("hide")
      } else if (index < cleanCategories.length) {
        const listElement = generateListElement(cleanCategories[index])
        highlight(listElement, value)
        listResults.appendChild(listElement)
        placeHolder.innerText = placeHolderAssist(
          cleanCategories[0],
          normalValue
        )
        placeHolder.classList.remove("hide")
      } else {
        return
      }
    })
  }
})

// localStorage.clear()
// localStorage.removeItem("recent-searches")

searchButton.addEventListener("click", (e) => {
  noMatterSearch(searchInput.value)
})

document.body.addEventListener("keydown", (e) => {
  //   console.log(e.key)
  if (e.key === "Enter") {
    noMatterSearch(searchInput.value)
    e.preventDefault()
  }

  if (e.key === "Escape") {
    searchInput.blur()
    removeSearchToggle()
    cartContainer.classList.remove("show-cart")

    closeButton.classList.add("display-none")
    popButton.classList.remove("display-none")
    headerNav.classList.remove("nav-toggle")


  }
})

const generateListElement = (content) => {
  const element = document.createElement("li")
  // console.log(content)
  element.innerHTML = `
        <a href="/html-pages/search.html?search=${content}">
            <svg
        stroke="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="20"
        width="30"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"
        >
        </path>
        </svg><span id="list-text">${content}</span></a>
    `

  return element
}

const fillListWithData = (array) => {
  searches.forEach((element) => {
    listResults.appendChild(generateListElement(element))
  })
}

fillListWithData(searches)




























// In case I need increment button selectors

// const incrementBtn = document.getElementById("increment")
// const decrementBtn = document.getElementById("decrement")
// const form = document.querySelector("form")

// console.log(countButtons)

// form.addEventListener("submit", () => {
//   e.preventDefault()
// })
