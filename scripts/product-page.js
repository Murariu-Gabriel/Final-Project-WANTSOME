// Loading cart

const existingCartProducts = localStorage.getItem("cart-products")
const parsedCartProducts = JSON.parse(existingCartProducts)
const cart = parsedCartProducts ? parsedCartProducts : []

// USER OPTIONS TOGGLE


const getUserStatus = () => {
  const storageStatus = localStorage.getItem("isUserLoggedIn")
  const userStatus = JSON.parse(storageStatus)

  return userStatus
}

const getLoggedUserName = (userEmail) => {

  const storageStatus = localStorage.getItem("users")
  const userStatus = JSON.parse(storageStatus)

  for(let user of userStatus){
    const currentUser = JSON.parse(user)

    console.log(currentUser)
    if (currentUser.email === userEmail) {
      return currentUser.first_name
    }
  }

}

console.log(getLoggedUserName())
console.log(getUserStatus())

const userIcon = document.getElementById("user-account")
const userContainer = document.getElementById("user-container")
const userOptionsContent = document.querySelectorAll(".user-options-content")

const secondNavUser = document.body.querySelector(".user-element")

console.log(secondNavUser)

userIcon.addEventListener("click", (e) => {
  if(userContainer.classList.contains("hide")){
    userContainer.classList.remove("hide")
    document.body.classList.add("stop-scroll")

  } 
  else {
    userContainer.classList.add("hide")
    document.body.classList.remove("stop-scroll")

  }

  if(cartContainer.classList.contains("show-cart")){
     cartContainer.classList.remove("show-cart")
    // document.body.classList.remove("stop-scroll")
  }

 
   if (headerNav.classList.contains("nav-toggle")) {
     closeButton.classList.add("display-none")
     popButton.classList.remove("display-none")
     headerNav.classList.remove("nav-toggle")
     document.body.classList.add("stop-scroll")
   }
  
})

userContainer.addEventListener("click", (e) => {
  userContainer.classList.add("hide")
  document.body.classList.remove("stop-scroll")

})



for(const container of userOptionsContent){
  container.addEventListener("click", (e) => {
    e.stopPropagation()
  })

}


const loginStatusContainer = document.body.querySelector(".user-options")
const userName = document.getElementById("user-name-after-login")
const mobileUserName = document.getElementById("mobile-nav-name")

console.log(loginStatusContainer.children[0])

if (getUserStatus()?.status) {
  loginStatusContainer.children[0].classList.add("hide")
  loginStatusContainer.children[1].classList.remove("hide")

  secondNavUser.children[0].classList.add("hide")
  secondNavUser.children[1].classList.remove("hide")

  userName.innerText = getLoggedUserName(getUserStatus().user)
  mobileUserName.innerText = getLoggedUserName(getUserStatus().user)

}  

const logout = document.getElementById("logout")

logout.addEventListener("click", () => {
  loginStatusContainer.children[1].classList.add("hide")
  loginStatusContainer.children[0].classList.remove("hide")

  secondNavUser.children[1].classList.add("hide")
  secondNavUser.children[0].classList.remove("hide")
  localStorage.removeItem("isUserLoggedIn")

})

secondNavUser.children[1]. addEventListener("click", () => {
  secondNavUser.children[1].classList.add("hide")
  secondNavUser.children[0].classList.remove("hide")
  localStorage.removeItem("isUserLoggedIn")
})

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

    if (id === "h-button" || id === "x-button") {
      button.addEventListener("click", (e) => {
        headerNav.classList.toggle("nav-toggle")
        const eventButton = e.target
        addToggleFunctionality()

        if (id === "h-button") {
          document.body.classList.add("stop-scroll")
          cartContainer.classList.remove("show-cart")

          if (!userContainer.classList.contains("hide")) {
            userContainer.classList.add("hide")
            
          }
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

console.log(params)

const productListString = localStorage.getItem("products")

// Guard IF
if (!productListString) {
  // aici trebuie sa afisezi pe pagina ceva eroare
  alert("Ceva s-a intamplat, trebuie vazut in localStorage")
}

const productList = JSON.parse(productListString)

const product = productList.find((element) => element.id === params.productId)


// SETTING TITLE

const capitalize = (name) => {
  return  name.replace(/\b\w/g, char => char.toUpperCase());
}

document.title = capitalize(product.name)

console.log(product)

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
  if (!product.new && !product.discount) {
    newProduct.classList.add("hide")
  }

  productImg.setAttribute("src", product.images.display.second)
  productImg.setAttribute("atl", product.name)
  productTitle.innerText = product.name
  productDescription.innerText = product.description

  if(product.discount){
     overline.innerText = product.discount ? `discount: ${product.discount}% off` : ""
     overline.style.color = "rgb(99, 129, 250)"
  }

  const calcDiscount = product.price * (product.discount / 100)
  const priceDiscount = product.discount ? product.price - calcDiscount : product.price
  const strikedText = product.discount ? `<small>${product.price}$</small>`: ""
 

  productPrice.innerHTML = `${strikedText} ${priceDiscount}$`
  productFeatures.innerText = product.features

  
  if (product.new) {
    overline.innerText = product.new ? "new product" : ""
  }
  

  
  // IN THE BOX
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

// BUTTON INCREMENT

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
const cartDeleteAll = document.getElementById("remove-cart-all")


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
    cartDeleteAll.classList.add("hide")
  } else {
    cartDeleteAll.classList.remove("hide")
  }
}

const updateCounter = () => {
  const itemsCount = cartList.children.length
  cartCounter.innerText = itemsCount

  let cartOuterCount = cartButton.querySelector("span")

  if (cartOuterCount && itemsCount != 0) {
    cartOuterCount.innerText = itemsCount
  }

  if (itemsCount > 0 && cartOuterCount === null) {
    const outerCounter = document.createElement("span")
    cartButton.appendChild(outerCounter)
    outerCounter.innerText = itemsCount
  }
  if (itemsCount === 0 && cartButton.children.length > 1) {
    cartOuterCount.remove()
  }

  hideRemoveAll(itemsCount)
}



// Decided that I want to calculate total amount only when I open cart
cartButton.addEventListener("click", () => {
  if (!cartContainer.classList.contains("show-cart")) {
    cartContainer.classList.add("show-cart")
    document.body.classList.add("stop-scroll")
  } else {
    cartContainer.classList.remove("show-cart")
    document.body.classList.remove("stop-scroll")
  }
  calculateTotal(cartList.children)
  updateCounter()

   if (headerNav.classList.contains("nav-toggle")) {
     closeButton.classList.add("display-none")
     popButton.classList.remove("display-none")
     headerNav.classList.remove("nav-toggle")
     document.body.classList.add("stop-scroll")
   }

    if (!userContainer.classList.contains("hide")) {
      userContainer.classList.add("hide")
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
    console.log(el.id, id)
    if (el.id === id) {
      return true
    }
  }
  return false
}

const verifyLocalAndCartId = (list, id) => {
  for (const el of list) {
    console.log(el.id.slice(5, 12), id)
    if (el.id.slice(5, 12) === id) {
      return true
    }
  }
  return false
}


const addProductCount = (list, id) => {
  for (const el of list) {
    console.log(el.id, id)
    if (el.id.slice(5, 12) === id) {
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


const addListEl = (
  productId,
  productImg,
  productAlt,
  productName,
  productPrice,
  productCount,
  ifDiscount
) => {
  const li = document.createElement("li")
  li.setAttribute("id", `list-${productId}`)

  const calcDiscount = productPrice * (ifDiscount / 100)
  const priceDiscount = ifDiscount ? productPrice - calcDiscount : productPrice

  li.innerHTML = `<div class="img-container">
      <img src=${productImg} alt=${productAlt} />
    </div>

    <p>
      <strong>${productName}</strong>
      <span>$</span>
      <span>${priceDiscount}</span>
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
  
    console.log(verifyLocalAndCartId(cartList.children, product.id))
  if (verifyLocalAndCartId(cartList.children, product.id)) {
    addProductCount(cartList.children, product.id)
    
  } else {

    const listEl = addListEl(
      product.id,
      product.images.display.first,
      product.name,
      product.slug,
      product.price,
      productCounter.value,
      product.discount
    )


    cartListFunctionality(listEl)
    cartList.appendChild(listEl)
  }
 
  addToLocalStorage(product.id, productCounter.value) 
  updateCounter()
})
// localStorage.removeItem("cart-products")


const returnEl = (list, id) => {
  const findElement = list.find((element) => element.id === id)

  return findElement
}

const returnValue = (list, id) => {
  const foundElement = returnEl(list, id)

  return foundElement ? foundElement.count : undefined
}

//  addToLocalStorage(newCartProduct, product.id, productCounter.value)

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

      console.log(verifyIfIdExistsForCart(cart, object.id), object.id)
     if (verifyIfIdExistsForCart(cart, object.id)) {
        const element = returnEL(cart, object.id)
        const ifListIncrement = operation === "increment" ? 1 : parseInt(productCounter.value)
        element.count = parseInt(returnValue(cart, object.id)) + ifListIncrement
    
      } else {
        object.count = 1
        cart.push(object)
        console.log(object)
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

const cartButtonsEvent = (e) => {
  const id = e.target.parentNode.parentNode.id.slice(5,12)
  const input = e.target.parentNode.querySelector(".product-counter")
  console.log(id)
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
      cartEl.count,
      product.discount
    )
    cartListFunctionality(listEL)
    cartList.appendChild(listEL)
  })

  updateCounter()
}

loadCart()




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

const getProductsData = () => {
  const allProducts = localStorage.getItem("products")
  const parsedAllProducts = JSON.parse(allProducts)
  const products = parsedAllProducts ? parsedAllProducts : []

  return products
}

const addSearchToggle = (e) => {
 
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

  
  if (!userContainer.classList.contains("hide")) {
    userContainer.classList.add("hide")
    
  }

}


const removeSearchToggle = (e) => {
  searchInput.value = ""
  listResults.innerHTML = ""
  showSearchResults(searchInput.value)

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

searchInput.addEventListener("mousedown", addSearchToggle)

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
      `http://127.0.0.1:5500/html-pages/search.html?search=${windowKey}`
    )
  }

  const firstFourElements = searches.filter((element, index) => index < 4)

  console.log(firstFourElements)

  const stringSearches = JSON.stringify(firstFourElements)
  localStorage.setItem("recent-searches", stringSearches)
}

const placeHolderAssist = (text, value) => {
  const splitWord = text.split("")
  splitWord.splice(0, value.length, value)

  return splitWord.join("")
}

const cutBehindWord = (sentence, word) => {
  const startingWord = " " + word
  const start = sentence.indexOf(startingWord)
  
  if (start < 0) {
    return ""
  }
  const restOfSentence = sentence.substring(start, sentence.length)
  return restOfSentence
}

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

const showSearchResults = (value) => {
  if (value.length < 2) {
    searchTitle.innerText = "Recent searches"
    fillListWithData(searches)
    placeHolder.classList.add("hide")
  }
}

const checkIfResultRepeats = (domList, value) => {
  return Array.from(domList).some((element) => element.innerText === value)
}

searchInput.addEventListener("keyup", (e) => {
  const normalValue = e.target.value
  const value = e.target.value.toLowerCase()

  listResults.innerHTML = ""
  searchTitle.innerText = "Search suggestions"

  showSearchResults(value)

  if (e.key === "Enter") {
    e.preventDefault()
  }


  const products = getProductsData()
  console.log(value)
  const inputSearchResult = products.filter((product) => {
    return product.name.includes(value) || product.category.includes(value)
   
  })
  const inputCategories = inputSearchResult.map((product) => product.category)
  const setCategories = new Set(inputCategories)
  const cleanCategories = [...setCategories]

  placeHolder.innerText = ""

  const currentListResults = searchResults.querySelector("ul")

  let isRepeating = false

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

        if (element.category.includes(value) && !isRepeating) {
          const listElement2 = generateListElement(element.category)
          highlight(listElement2, value)
          listResults.appendChild(listElement2)

          isRepeating = checkIfResultRepeats(
            currentListResults.children,
            element.category
          )
        }
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

  if (listResults.children.length === 0) {
    const noResult = generateListElement(value)
    listResults.appendChild(noResult)
  }
})

searchButton.addEventListener("click", (e) => {
  noMatterSearch(searchInput.value)
  
})

document.body.addEventListener("keydown", (e) => {
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

    if (!userContainer.classList.contains("hide")) {
      userContainer.classList.add("hide")
      
    }


  }
})

const generateListElement = (content) => {
  const element = document.createElement("li")

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


// BACK TO TOP

const toTopBtn = document.getElementById("back-to-top")
const footer = document.body.querySelector("footer")

window.addEventListener("scroll", (e) => {

  let isButtonOnTop = false

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      console.log(entry.target && entry.isIntersecting)
      if (entry.target === footer && entry.isIntersecting) {
        isButtonOnTop = true
        toTopBtn.style.bottom = "80px"
      } else {
        toTopBtn.style.bottom = "1%"
      }
    })
  }, {rootMargin: "300px 0px 0px 0px"})

  observer.observe(footer)  


  if(window.scrollY > 100){
    toTopBtn.style.display = "block"

  } else {
    toTopBtn.style.display = "none"
  }


})


// {top: 0, behavior: "smooth"}  not supported on MAC
toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  })
})


// NAVIGATION STICKY FUNCTIONALITY

window.addEventListener("resize", () => {
  const screenWidth = window.innerWidth

  if (screenWidth > 550) {
    if (navigation.classList.contains("slimmer-nav")) {
      navigation.classList.remove("slimmer-nav")
    }
  } else {
    if(navigation.classList.contains("sticky")){
    navigation.classList.add("slimmer-nav")
    }

     userContainer.classList.add("hide")
  }
})


const navigation = document.querySelector(".navigation")
const scrollWatcher = document.createElement("div")

scrollWatcher.setAttribute("data-scroll-watcher", '')

navigation.before(scrollWatcher)

const navObserver = new IntersectionObserver((entries) => {
  navigation.classList.toggle("sticky", !entries[0].isIntersecting)

  const mediaQuery = window.matchMedia("(max-width: 550px)")
  if(mediaQuery.matches){
    navigation.classList.toggle("slimmer-nav", !entries[0].isIntersecting)

  } else {
    navigation.classList.remove("slimmer-nav")
  }

}, {rootMargin: "400px 0px 0px 0px"})


navObserver.observe(scrollWatcher)


























// In case I need increment button selectors

// const incrementBtn = document.getElementById("increment")
// const decrementBtn = document.getElementById("decrement")
// const form = document.querySelector("form")

// console.log(countButtons)

// form.addEventListener("submit", () => {
//   e.preventDefault()
// })
