// cart remove button

const cartDeleteAll = document.getElementById("remove-cart-all")



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

    if (currentUser.email === userEmail) {
      return currentUser.first_name
    }
  }

}


const userIcon = document.getElementById("user-account")
const userContainer = document.getElementById("user-container")
const userOptionsContent = document.querySelectorAll(".user-options-content")

const secondNavUser = document.body.querySelector(".user-element")


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



// SHARED NAV TOGGLE

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

        if(id === "h-button"){
          document.body.classList.add("stop-scroll")
          cartContainer.classList.remove("show-cart")

          if(!userContainer.classList.contains("hide")){
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
  document.body.classList.remove("stop-scroll")
})

secondNav.addEventListener("click", (e) => {
  e.stopPropagation()
})

// DISABLE NAV IF VIEWPORT IS BIG

window.addEventListener("resize", () => {
  const screenWidth = window.innerWidth

  if(screenWidth > 979){
      if (headerNav.classList.contains("nav-toggle")) {
        document.body.classList.remove("stop-scroll")
      }
    } else {
      if (headerNav.classList.contains("nav-toggle")){
        document.body.classList.add("stop-scroll")
        window.scrollTo({
          top: 0,
          // behavior: "smooth", // Add smooth scrolling animation
        })

        
      }

    }

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
    cartDeleteAll.classList.add("hide")
  } else {
    cartDeleteAll.classList.remove("hide")
  }

  // console.log(num)
}

const updateCounter = () => {
  const itemsCount = cartList.children.length
  cartCounter.innerText = itemsCount

  let cartOuterCount = cartButton.querySelector("span")
  
  if(cartOuterCount && itemsCount != 0){
    cartOuterCount.innerText = itemsCount
  } 
 

  if(itemsCount > 0 && cartOuterCount === null) {
    const outerCounter = document.createElement("span")    
    cartButton.appendChild(outerCounter)
    outerCounter.innerText = itemsCount
    
  } 
  if (itemsCount === 0 && cartButton.children.length > 1) {
    cartOuterCount.remove()
  }

  

  hideRemoveAll(itemsCount)
}


cartButton.addEventListener("click", () => {

  if (!cartContainer.classList.contains("show-cart")){
    cartContainer.classList.add("show-cart")
    document.body.classList.add("stop-scroll")

  } else{
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



const productListString = localStorage.getItem("products")
const productList = JSON.parse(productListString)

const cartList = document.getElementById("cart-list")
// console.log(cartList)

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


// I m sure most of these can be made info filters or find functions

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
  }
 
}

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
  const value = parseInt(input.value)

  if (value === 0) {
    console.log(parseInt(input.value))
    const otherButton = e.target.parentNode.querySelector("#increment")
    const listElement = e.target.parentNode.parentNode
    e.target.removeEventListener("click", cartButtonsEvent)
    otherButton.removeEventListener("click", cartButtonsEvent)
    listElement.remove()
    deleteFromStorage(id)

    console.log(id)
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
  updateCounter()
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
    // e.stopPropagation()
  }
  searchContainer.classList.add("overlay2")
  inputContainer.classList.add("top")
  inputContainer.classList.add("search-animation")
  formContent.classList.add("contend-width")
  dummy.classList.remove("hide")
  searchResults.classList.remove("hide")
  closeSearch.classList.remove("hide")
  document.body.classList.add("stop-scroll")

  if(!cartContainer.classList.contains("hide")){
    cartContainer.classList.remove("show-cart")
  }

  if (headerNav.classList.contains("nav-toggle")){
    closeButton.classList.toggle("display-none")
   popButton.classList.toggle("display-none")
   headerNav.classList.toggle("nav-toggle")
  }

  if(!userContainer.classList.contains("hide")){
    userContainer.classList.add("hide")
  }
}
// console.log(headerNav.classList.contains("nav-toggle"))

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

    const lowerCased = windowKey.toLowerCase()
    window.location.assign(
      `http://127.0.0.1:5500/html-pages/search.html?search=${lowerCased}`
    )
  }

  const firstFourElements = searches.filter((element, index) => index < 4)
  const set = new Set(firstFourElements)
  const newArray = Array.from(set)

  console.log(newArray)

  const stringSearches = JSON.stringify(newArray)
  localStorage.setItem("recent-searches", stringSearches)
  localStorage.removeItem("page")
  localStorage.removeItem("filters")
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
  const inputSearchResult = products.filter(
    (product) => {

     return product.name.includes(value) || product.category.includes(value)
     //  return product.name.startsWith(value) || product.category.startsWith(value)
    }
  )
  const inputCategories = inputSearchResult.map(product => product.category)
  const setCategories = new Set(inputCategories)
  const cleanCategories = [...setCategories]

  placeHolder.innerText = ""
  

  if (value.length >= 2) {
    inputSearchResult.forEach((element, index) =>{
      if(element.name.includes(value)){
        const listElement = generateListElement(element.name)
        highlight(listElement, value)
        listResults.appendChild(listElement)
        const cutWord = cutBehindWord(inputSearchResult[0].name, value)

        placeHolder.innerText = inputSearchResult[0].name.startsWith(value)
          ? placeHolderAssist(inputSearchResult[0]?.name, normalValue) || ""
          : placeHolderAssist(cutWord.replace(" ", ""), normalValue)
        placeHolder.classList.remove("hide")

      } else if(index < cleanCategories.length){
            
        const listElement = generateListElement(cleanCategories[index])
        highlight(listElement, value)
        listResults.appendChild(listElement)
        placeHolder.innerText = placeHolderAssist(cleanCategories[0], normalValue)
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

    if (typeof filtersContainer !== "undefined" ){

      filtersContainer.classList.remove("display")
      filtersContainer.classList.remove("overlay")
      document.body.classList.remove("stop-scroll")
    }

     if (!userContainer.classList.contains("hide")) {
       userContainer.classList.add("hide")
       document.body.classList.remove("stop-scroll")
     }
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
// console.log(searches)


// REMOVE CURRENT PAGE AND ORDER PREFRENCE FROM SEARCH PAGE

if(!parameters.pathname.includes("search")){
  localStorage.removeItem("page")
  localStorage.removeItem("order")
  localStorage.removeItem("filters")
}



// BACK TO TOP

if(parameters.pathname !== "/html-pages/checkout.html"){

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
      // behavior: "smooth", // Add smooth scrolling animation
    })
  })

}  


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

}, {rootMargin: "300px 0px 0px 0px"})


navObserver.observe(scrollWatcher)




// NEXT THERE IS NEEDED TO BE FOOL PROOF FOR CLICKING MULTIPLE TOGGLES

// YOU NEED TO COPY PASTE THIS IN PRODUCT PAGE AND ALSO THE HTML IN ALL PAGES







// OLD VERSION FOR HIGHLIGHTING TEXT JUST IN CASE YOU WILL NEED IT AT SOME POINT


// const highlight = (element, searchedWord) => {
//   console.log(searchedWord)
//   const span = element.querySelector("#list-text")
//   const elementText = span.innerText
//   // const wordStart = elementText.indexOf(word)
//   const textArray = elementText.split(/\s+/g)
//   const highlightedText = textArray.map((word) => {
//     console.log(word.includes(searchedWord))
//     if (word.includes(searchedWord)) {
//       const splitWord = word.split("")
//       const wordStart = word.indexOf(searchedWord) // searchedWord.length
//       const wordConversion2 = `<span class="highlight">${searchedWord}</span>`

//       const splicedWord = splitWord.splice(
//         wordStart,
//         searchedWord.length,
//         `<span class="highlight" >${searchedWord}</span>`
//       )
//       // const wordConversion = `<span class="highlight" >${splicedWord.join("")}</span>`
//       // splitWord.splice(wordStart, 0, wordConversion)

//       console.log(splitWord)
//       return splitWord.join("")
//     }

//     return word
//   })

//   const text = highlightedText.join(" ")
//   console.log(text)
//   span.innerHTML = text
//   console.log(span)

//   return text
// }