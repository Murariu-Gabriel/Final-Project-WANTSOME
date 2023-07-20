
const mainSection = document.body.querySelector(".generated-search-result")
const selectContainers = document.body.querySelectorAll(".select-box")
const filterButton = document.getElementById("filter-button")
const filtersContainer = document.getElementById("filters")
const displayResult = document.getElementById("display-result")
const changeStyleButton = document.getElementById("change-style-button")

const generatedProductsContainer = document.getElementById("generated-products")
const generatedSearchProductsCount = document.getElementById("result-count")
const generatedProductsCountMobile = document.getElementById("products-counter")
const resultText = document.getElementById("result-text")
const searchBarInput = document.body.querySelector(".search-input")
const searchPageContainer = document.getElementById("search-page-container")
const plural = document.getElementById("plural")

const selectPagination = document.getElementById("select-pagination")
const selectOrder = document.getElementById("select-order")


const arrowForward = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></svg>`

const arrowBackwards = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></svg>`




const rangeButton = document.getElementById("range-button")

const allFilters = document.getElementById("all-filters")
const filters = allFilters.children
const priceFilter = filters[filters.length - 1]
const filterInputs = priceFilter.querySelectorAll("div input[type='checkbox']")

const intervalInput = filterInputs[filterInputs.length - 1]




// FILTER AND SELECT TOGGLES TOGGLES

const addSelectEvent = () => {
  selectContainers.forEach((element) => {
    const select = element.querySelector("p")
    const list = element.querySelector("ul")
    select.addEventListener("click", (e) => {
      e.stopPropagation()
      list.classList.toggle("hide")
    })
  })
}

addSelectEvent()

// WHEN USER CLICKS OUT OF SELECT BOXES

document.body.addEventListener("click", (e) => {
      
    if (!selectPagination.classList.contains("hide")) {
        selectPagination.classList.add("hide")
    }

    if (!selectOrder.classList.contains("hide")) {
      selectOrder.classList.add("hide")
    }
})



// FILTER BTN

filterButton.addEventListener("click", () => {
  filtersContainer.classList.add("display")
  filtersContainer.classList.add("overlay")
  document.body.classList.add("stop-scroll")
  window.scrollTo(0, 0)
})

displayResult.addEventListener("click", () => {
  filtersContainer.classList.remove("display")
  filtersContainer.classList.remove("overlay")
  document.body.classList.remove("stop-scroll")
})

// TOGGLE FOR VIEW STYLE

const buttonSvg = changeStyleButton.children 

const toggleBtnSvg = (svgs) => {
for (const svg of buttonSvg) {
  svg.classList.contains("hide")
    ? svg.classList.remove("hide")
    : svg.classList.add("hide")
}
}

changeStyleButton.addEventListener("click", (e) => {

    toggleBtnSvg(buttonSvg)
  

  if (generatedProductsContainer.classList.contains("generated-products")) {
    generatedProductsContainer.classList.remove("generated-products")
    generatedProductsContainer.classList.add("generated-products-line")
  } else {
    generatedProductsContainer.classList.remove("generated-products-line")
    generatedProductsContainer.classList.add("generated-products")
  }
})

// DISABLE FILTER OVERLAY IF VIEWPORT IS BIG

window.addEventListener("resize", () => {
  const screenWidth = window.innerWidth

  if (screenWidth > 770) {
    if (filtersContainer.classList.contains("overlay")) {
      document.body.classList.remove("stop-scroll")
    }
  } else {
    if (filtersContainer.classList.contains("overlay")) {
      document.body.classList.add("stop-scroll")
      window.scrollTo(0, 0)
    }
  }

  if (screenWidth < 550){
    if(generatedProductsContainer.classList.contains("generated-products-line")){
        generatedProductsContainer.setAttribute("class", "generated-products")
        toggleBtnSvg(buttonSvg)
    }
    
  }
})




// GENERATE LIST OF SEARCHED PRODUCTS

const searchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(searchParams.entries())
const retrievedSearch = params.search
document.title = `Search: ${retrievedSearch}`

const updateCount = (listCount) => {
  generatedSearchProductsCount.innerText = listCount
  generatedProductsCountMobile.innerText = listCount
}

const getSearchProducts = (search) => {
  const data = localStorage.getItem("products")
  const products = JSON.parse(data)

  const searchSpecificProducts = products.filter(
    (product) =>
      product.name.includes(search) || product.category.includes(search)
  )

  return searchSpecificProducts
}

// console.log(retrievedSearch)




// IMPORTANT VARIABLE CONTAINING SEARCH RESULT
const currentSearch = getSearchProducts(retrievedSearch)


// Function for obtaining all available products

const getAllProducts = () => {
    const allProducts = localStorage.getItem("products")
    const parsedProducts = JSON.parse(allProducts)

    const ifExist = parsedProducts.length !== 0 ? parsedProducts : currentSearch
    return ifExist
}



// FILTER RANGE INTERACTIVE FUNCTIONALITY

const rangeInput = document.querySelectorAll(".range-input input")
const progress = document.querySelector(".range-slider .progress")

const priceInput = document.querySelectorAll(".price-input input")

const priceGap = 50






priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    e.stopPropagation()
    let minVal = parseInt(priceInput[0].value)
    let maxVal = parseInt(priceInput[1].value)

    const inputMin = parseInt(e.target.min)

    if (maxVal - minVal >= priceGap && e.target.value <= maxVal) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minVal
        const range = rangeInput[0].max - rangeInput[0].min
        const progressLeft = ((minVal - rangeInput[0].min) / range) * 100 + "%"

        if (inputMin <= minVal && minVal !== NaN) {
          progress.style.left = progressLeft
        } else {
          progress.style.left = 0 + "%"
        }
      } else {
        rangeInput[1].value = maxVal
        const range = rangeInput[1].max - rangeInput[1].min
        const progressRight = ((maxVal - rangeInput[1].min) / range) * 100
        console.log(e.target.max, maxVal)

        if (parseInt(e.target.max) >= maxVal) {
          progress.style.right = 100 - parseFloat(progressRight) + "%"
        } else {
          progress.style.right = 0 + "%"
        }
      }
    }

    // console.log(minVal, maxVal)
  })
})

const rangeInputFunctionality = (minVal, maxVal) => {
    if (minVal !== maxVal) {
      priceInput[0].value = minVal
      priceInput[1].value = maxVal
      const range1 = rangeInput[0].max - rangeInput[0].min
      const range2 = rangeInput[1].max - rangeInput[1].min
      const progressLeft = ((minVal - rangeInput[0].min) / range1) * 100 + "%"
      const progressRight = ((maxVal - rangeInput[1].min) / range2) * 100
      progress.style.left = progressLeft
      progress.style.right = 100 - parseFloat(progressRight) + "%"

    } 
    else {
      progress.style.left = "0%"
      // progress.style.right = "0%"
      // priceInput[1].value = minVal
    }

}

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    e.stopPropagation()

     let minVal = parseInt(rangeInput[0].value)
     let maxVal = parseInt(rangeInput[1].value)

     if (maxVal - minVal < priceGap) {
       if (e.target.className === "range-min") {
         rangeInput[0].value = maxVal - priceGap
       } else {
         rangeInput[1].value = minVal + priceGap
       }
     } else {
       console.log(minVal)
       rangeInputFunctionality(minVal, maxVal)
   
     }

  })
})




const updatePriceValues = (list) => {
  const biggestPrice = Math.max(...list.map((product) => product.price))
  const smallestPrice = Math.min(...list.map((product) => product.price))
  

  priceInput[0].value = smallestPrice
  priceInput[1].value = biggestPrice

 

  rangeInput[0].value = smallestPrice
  rangeInput[1].value = biggestPrice

  progress.style.left = "0%"
  progress.style.right = "0%"

}

const updatePriceInterval = (list, updateValue) => {
  const biggestPrice = Math.max(...list.map((product) => product.price))
  const smallestPrice = Math.min(...list.map((product) => product.price))
  const priceRound = Math.ceil(biggestPrice / 50) * 50

  if(biggestPrice !== smallestPrice){
    priceInput[0].setAttribute("min", smallestPrice)
    priceInput[1].setAttribute("max", biggestPrice)

    priceInput[0].setAttribute("value", smallestPrice)
    priceInput[1].setAttribute("value", biggestPrice)

   

    if (updateValue) {
      rangeInputFunctionality(smallestPrice, biggestPrice)
    }

    rangeInput[0].setAttribute("value", smallestPrice)
    rangeInput[1].setAttribute("value", biggestPrice)

    rangeInput[0].setAttribute("min", smallestPrice)
    rangeInput[0].setAttribute("max", biggestPrice)

    rangeInput[1].setAttribute("min", smallestPrice)
    rangeInput[1].setAttribute("max", biggestPrice)
    
    updatePriceValues(list)
  } else {
    if (currentSearch.length === 1) {
      console.log("da")
      priceInput[0].value = 0
      rangeInput[0].value = 0
      priceInput[0].max = 0
      rangeInput[0].max = 0

      priceInput[1].value = biggestPrice
      rangeInput[1].value = biggestPrice
      priceInput[1].max = biggestPrice
      rangeInput[1].max = biggestPrice
    } else {
      priceInput[0].value = smallestPrice
      rangeInput[0].value = smallestPrice

      rangeInputFunctionality(smallestPrice, biggestPrice)
    }

  }
 
}

updatePriceInterval(currentSearch)


// SHOWING RESULT, FOR THE MOMENT NOT OPTIMAL BECAUSE IF SEARCH DOEST NOT EXIST IT LOADS ALL LOGIC THEN SHOW FAULTY RESULT

if (currentSearch.length === 0) {
  searchPageContainer.classList.remove("hide")

 searchPageContainer.innerHTML = `<h2 class="search-err"><span> 0 results for:</span> ${retrievedSearch}</h2>`
} else {
  searchPageContainer.classList.remove("hide")
}



// UPDATING SEARCH DATA ON LOAD
updateCount(currentSearch.length)
resultText.innerText = `"${retrievedSearch}"`
searchBarInput.value = retrievedSearch
plural.innerText = currentSearch.length > 1 ? "items" : "item"


// GENERATING PRODUCT AND PAGINATION

const getPaginationPrefrenceFromLocalStorage = () => {
  const paginationPreference = localStorage.getItem("pagination")
  const ifPaginationExists = paginationPreference ? paginationPreference : 8
  
  return ifPaginationExists  
}

const getPaginationPrefrence = () => {
  return parseInt(getPaginationPrefrenceFromLocalStorage())
}


const paginationText = selectPagination.parentNode.querySelector("p")

// const ITEMS_PER_PAGE = getPaginationPrefrence()
paginationText.innerText = `${getPaginationPrefrence() + 1} on page`

const pagination = document.getElementById("pagination")

const cartItems = document.getElementById("cart-list")


// !!! CAUTION THE ADD TO CART FUNCTIONALITY SHARES FUNCTIONS WITH SHARED SCRIPT MEANING THAT SOME FUNCTION ARE NOT ON ThIS FILE THEY COME FROM SHARED SCRIPT

// returnEl, addListEl are functions from shared script

const verifyCartItemExistence = (list, id) => {
  for (const el of list) {
    if (el.id.includes(id)) {
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

const addCount = (list, id) => {
  for (const el of list) {
    if (el.id.slice(5, 12) === id) {
      const elInput = el.querySelector("input")
      let inputValue = parseInt(elInput.value)
      let addValue = 1
      if (inputValue + addValue < 100) {
        const sum = inputValue + addValue
        elInput.setAttribute("value", sum)
      }
      break
    }
  }
}


const addItemToLocalStorage = (productId, ProductValue, operation) => {
  const existingCartProducts = localStorage.getItem("cart-products")
  const parsedCartProducts = JSON.parse(existingCartProducts)
  const cart = parsedCartProducts ? parsedCartProducts : []

  const object = {
    id: productId,
    count: parseInt(ProductValue),
  }

  if (cart.length === 0) {
    cart.push(object)
  } else {
    if (verifyIfIdExistsForCart(cart, object.id)) {
      const element = returnEL(cart, object.id)
      const ifListIncrement =
        operation === "increment" ? 1 : 1
      element.count = parseInt(returnValue(cart, object.id)) + ifListIncrement
    } else {
      object.count = 1
      cart.push(object)
    }

    if (operation === "decrement") {
      console.log(cart, object.id)
      if (verifyCartItemExistence(cart, object.id)) {
        const element = returnEL(cart, object.id)
        element.count = parseInt(object.count)
      }
    }
  }

  const newProducts = JSON.stringify(cart)
  localStorage.setItem("cart-products", newProducts)
}




const generateProduct = (
  productImage,
  productName,
  ifNew,
  productPrice,
  productId,
  productSlug,
  ifDiscount
) => {
  const product = document.createElement("article")
  const isNew = ifNew ? "<span class='overline'>new</span>" : ""
  const discount = ifDiscount ? `<span class="discount">${ifDiscount}% OFF</span>` : ""
  const calcDiscount = productPrice * (ifDiscount / 100) 
  const priceDiscount = ifDiscount ? productPrice - calcDiscount : productPrice
  const strikedText = ifDiscount ? `<small>${productPrice}$</small>` : ""

  product.innerHTML = `
        <img
            class="category-image"
            src=${productImage}
            alt=${productName}
        />
        <div>
            ${isNew}
            ${discount}
            <h3 class="subtitle">${productName}</h3>
        
            <span>${strikedText}<strong>${priceDiscount}</strong> $</span>

            <button class="button">
                <svg width="2rem" height="100%"  viewBox="-3 0 30 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z"
                        fill-rule="nonzero"
                    />
                </svg>
                Add to cart
            </button>
        </div>
        <a  class="big-link" href="/html-pages/product-page.html?productId=${productId}"></a>
    
    `
   const addToCart = product.querySelector("button")

  addToCart.addEventListener("click", () => {
  
    if (verifyLocalAndCartId(cartItems.children, productId)) {
      addCount(cartItems.children, productId)
    } else {
      const listEl = addListEl(
        productId,
        productImage,
        productName,
        productSlug,
        productPrice,
        1,
        ifDiscount
      )

      cartListFunctionality(listEl)
      cartList.appendChild(listEl)
    }
  
    addItemToLocalStorage(productId, 1) 
     updateCounter()
  })



  return product
}

const loadProducts = (searchResult, start, end) => {
    searchResult.forEach((product, index) => {
        const { images, new: ifNew, name, price, id, slug, discount} = product
        
        if (index >= start && index <= end){
        generatedProductsContainer.appendChild(
          generateProduct(
            images.display.first,
            name,
            ifNew,
            price,
            id,
            slug,
            discount
          )
        )
    }
  })
}


// IMPORTANT
loadProducts(currentSearch, 0, getPaginationPrefrence())

const createButton = (id, btnClass, content) => {
    const btn = document.createElement("button")
    btn.setAttribute("id", id)
    btn.setAttribute("class", btnClass)
    btn.classList.add("pagination-element")
    btn.classList.add("button")
    btn.innerHTML = content

    return btn
}



// PAGINATION UPDATE ON CLICK

// The idea here is that when I click on the pagination navigation buttons it clicks the next element for me


const generatePagination = (list, itemsPerPage, pagStart, pagEnd) => {
  let page = Math.floor(list.length / itemsPerPage)

  const pageRest = list.length % itemsPerPage
  if (pageRest > 1) {
    page = page + 1
  }
 console.log(page, itemsPerPage)
  const ol = document.createElement("ol")
  ol.classList.add("pagination-list")
  ol.appendChild(createButton("page-backwards", "page-backwards", arrowBackwards))


  let i = pagStart
  do {

    if (i > pagEnd) {
      break
    }

    const li = document.createElement("li")
    li.classList.add("pagination-element")
    li.textContent = i

    li.addEventListener("click", (e) => {
      generatedProductsContainer.innerHTML = ""
      const count = parseInt(e.target.textContent)

      document.querySelector(".current-page").classList.remove("current-page")
      li.classList.add("current-page")

      const start = itemsPerPage * (count - 1)
      const end = itemsPerPage * count

      const ifStartZero = start === 0 ? start : start + 1

      console.log(ifStartZero, end)
      loadProducts(list, ifStartZero, end)
      window.scrollTo(0, 0)

      const currentPage = parseInt(e.target.innerText)

      if (currentPage === pagEnd) {
        updatePagination(list, getPaginationPrefrence(), pagStart + 4, pagEnd + 4)
      }

      if (currentPage === pagStart) {
        if (currentPage > 1) {
          updatePagination(list, getPaginationPrefrence(), pagStart - 4, pagEnd - 4)
          const olListElements = pagination.querySelectorAll("li")
          olListElements[olListElements.length - 1].classList.add(
            "current-page"
          )
          olListElements[0].classList.remove("current-page")
        }
      }

      localStorage.setItem("page", li.textContent)
    })

    ol.appendChild(li)
    i++
  } while (i <= page)


  const listElements = ol.querySelectorAll("li")
  listElements[0].classList.add("current-page")
  ol.appendChild(createButton("page-forward", "page-forward", arrowForward))
  

  
  const buttons = ol.querySelectorAll("button")
  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
    const listElements = pagination.querySelectorAll("li")
    const currentPage = pagination.querySelector(".current-page")
    const currentIndex = Array.prototype.indexOf.call(listElements, currentPage)
    let incrementDecrement =
    e.target.id === "page-forward" ? currentIndex + 1 : currentIndex - 1

   if(incrementDecrement < 0){
    incrementDecrement = 0
   }
   if(incrementDecrement >= 5){
    incrementDecrement = 4
   }

   console.log(currentIndex)
   console.log(incrementDecrement)

    if(incrementDecrement >= 0 && incrementDecrement <= listElements.length - 1)
     listElements[incrementDecrement].click()
    })
  })

  return ol
}


// IMPORTANT

const updatePagination = (
  list,
  end = getPaginationPrefrence(),
  listStart = 1,
  listEnd = 5
) => {
  const generateOl = generatePagination(list, end, listStart, listEnd)
  pagination.innerHTML = ""
  pagination.appendChild(generateOl)
}

updatePagination(currentSearch)

// RETURN TO THE LAST SELECTED PAGE FROM PAGINATION | REST OF CODE IN SHAREDSCRIPT

const currentPage = localStorage.getItem("page")

if(currentPage !== "1"){
  const pages = pagination.querySelectorAll("li")
  
  for(element of pages){
    if(element.innerText === currentPage){
      element.click()
    }
  }
}

const deleteEvents = (children) => {
  for (const child of children) {
    const clone = child.cloneNode(true)
    child.parentNode.replaceChild(clone, child)
  }
}


const selectPaginationFunctionality = (list) => {
    const listElements = selectPagination.children

    // deleteEvents(listElements)

    for(element of listElements){
        element.addEventListener("click", (e) => {
          paginationText.innerText = e.target.innerText
          const elementValue =
            parseInt(e.target.textContent.substring(0, 2)) - 1
          console.log(elementValue)

            generatedProductsContainer.innerHTML = ""

            loadProducts(list, 0, elementValue)
            updatePagination(list, elementValue)

          localStorage.setItem("pagination", elementValue)
        })
    }

}


// IMPORTANT
selectPaginationFunctionality(currentSearch)


// ORDER OPTIONS

// toSort might not be the best approach here, but since my data has a small number there is no need for now for a better sorting solution. In the future or on other projects there is a big probability this might not be optimal and be in need of a different approach.


// SORTING FUNCTION USING THE NEW SORT METHOD

const sort = (array, callback) => {
    const sort = array.toSorted(callback)

return sort
}

const ifDiscount = (element) => {
  if (element.discount) {
    const calcDiscount = element.price * (element.discount / 100)
    const discount = element.price - calcDiscount

    return discount
  }

  return element.price
}


const generateOrderEvents = (list, orderList) => {
   
    const text = selectOrder.parentNode.querySelector("p")

  for (const element of orderList) {
    element.addEventListener("click", (e) => {
      let sorted = []
      text.innerText = e.target.innerText

      if (orderList[0] === element) {
        sorted = sort(list, (a, b) => ifDiscount(a) - ifDiscount(b))
      } else if (orderList[1] === element) {
        sorted = sort(list, (a, b) => ifDiscount(b) - ifDiscount(a))
      } else if (orderList[2] === element) {
        sorted = sort(list, (a, b) => b.new - a.new)
      } else {
        sorted = sort(list, (a, b) => b.discount - a.discount)
      }

      generatedProductsContainer.innerHTML = ""

      selectPaginationFunctionality(sorted)
      loadProducts(sorted, 0, getPaginationPrefrence())
      updatePagination(sorted, getPaginationPrefrence())
      localStorage.setItem("order", e.target.innerText)
    })
  }
}



const selectOrderFunctionality = (list, order) => {
  const orderList = selectOrder.children
  const orderPreference = localStorage.getItem("order")
  const order2 = orderPreference
  

  deleteEvents(orderList)
  generateOrderEvents(list, orderList)


  for(const element of orderList){
    if(element.innerText === order2){
      element.click()
      
    }
  }

}

selectOrderFunctionality(currentSearch)




// !IMPORTANT 
const updatePaginationAndProducts = (
  items,
  itemsPerPage = getPaginationPrefrence(),
  order
) => {
  generatedProductsContainer.innerHTML = ""

  generatedSearchProductsCount.innerText = items.length
  generatedProductsCountMobile.innerText = items.length


  loadProducts(items, 0, itemsPerPage)
  updatePagination(items, itemsPerPage)
  selectPaginationFunctionality(items)
  selectOrderFunctionality(items, order)
}


const selectAllProducts = document.getElementById("all-items")
const allProductsCount = document.getElementById("all-items-count")
allProductsCount.innerText = getAllProducts().length


selectAllProducts.addEventListener("click", (e) => {
  const products = getAllProducts()
  const inputParent = e.target.parentNode.parentNode.querySelector("span")
  
  
  if(e.target.checked){
    console.log(products)
    updatePaginationAndProducts(products)
    categoriesFunctionality(products, inputParent)
    updatePriceInterval(products)
    updatePriceValues(products)

  } else {
    updatePaginationAndProducts(currentSearch)
     categoriesFunctionality(currentSearch, inputParent, "category")
     updatePriceInterval(currentSearch)
     updatePriceValues(currentSearch)
  }


  if (checkInputs(reloadedFilters())) {
    console.log("nu")
    removeAllBtnParent.classList.remove("hide")
  } else {
    console.log("da")
    removeAllBtnParent.classList.add("hide")
  }

})


const filterContainers = document.body.querySelectorAll(".filter-container")

const returnFromSearch = (list, fromList) => {
  const uniqueCategories = list.reduce((accumulator, currentValue) => {

    if(fromList !== "price"){
      const value = accumulator.find(element => element.name === currentValue[fromList])
      if (!value) {
        accumulator.push({ name: currentValue[fromList], count: 0, products: [] })
      } 

      accumulator.forEach((element) => {
        if(element.name === currentValue[fromList]){
          element.count++
          element.products.push(currentValue)
        }
      
      })
    } else {
      const ranges = localStorage.getItem("price-ranges")
      const priceRanges = JSON.parse(ranges)
      
      const filter = priceRanges.find(
        (element) =>
        element.rangeMin <= currentValue[fromList] &&
        currentValue[fromList] < element.rangeMax
        )
        const rangeString = filter.priceRange
        const minRange = filter.rangeMin
        
        const value = accumulator.find((element) => element.name === rangeString)

      if(!value){

        accumulator.push({
          name: rangeString,
          count: 0,
          products: [],
          min: minRange,
        })
      }
      
       accumulator.forEach((element) => {
         if (element.name === rangeString) {
           element.count++
           element.products.push(currentValue)
         }
       })
      
    }
    
    return accumulator
  }, [])

  if (fromList === "price"){
    const sortedRanges = uniqueCategories.sort((a, b) => a.min - b.min)
    return sortedRanges
  } 
  return uniqueCategories
}

// console.log(returnFromSearch(currentSearch, "price"))



const checkIfOrderSelected = () => {
  const orderParent = selectOrder.parentNode.querySelector("p")
  const orders = selectOrder.querySelectorAll("li")
  const orderType = Array.from(orders).find(
    (element) => element.innerText.includes(orderParent.innerText.toLowerCase())
    
  )

  const orderText = orderType ? orderType.innerText : ""

  return orderText
}

// IN ORDER TO DESELECT WITH .CLICK() I NEED THEM TO BE CLICKED IN REVERSE

const deselectPriceFilters = (options, e, optional) => {


  if (optional === "select") {
    // const inputs = e.target.parentNode.parentNode.parentNode.querySelectorAll(
      //   "input[type='checkbox']"
      // )

      
    let filters = reloadedFilters()
    let restartLoop = true
    
    while(restartLoop){
      restartLoop = false

      filters.forEach((input) => {
        if (options.includes(input.id) && !input.checked && Array.from(reloadedFilters()).includes(input) && input.id !== "price-interval") {
          input.click()
          filters = reloadedFilters()
          restartLoop = true
        }
        if(options.includes("price-interval") && filters[filters.length - 1] === input){
          const constPriceValues = options[options.length - 1]
          let minPrice = parseInt(constPriceValues.min )
          let maxPrice = parseInt(constPriceValues.max)

          let minValue = parseInt(priceInput[0].min)
          let maxValue = parseInt(priceInput[1].max)


          
          console.log(minPrice, maxValue)
          // if(minPrice > maxPrice){
          //   minPrice = minValue
          //   // maxPrice = maxValue
          // }

          //  if (minPrice < maxPrice) {
          //    minPrice = minValue
          //    maxPrice = maxValue
          //  }




          if(maxPrice > maxValue){
            maxPrice = maxValue
          }

          if (maxPrice < minValue) {
            maxPrice = maxValue
          }

          if (minPrice < minValue) {
            minPrice = minValue
          }

          if (minPrice > maxValue) {
            minPrice = minValue
          }

          priceInput[0].value = minPrice
          priceInput[1].value = maxPrice

          rangeInput[0].value = minPrice
          rangeInput[1].value = maxPrice


          
          rangeInputFunctionality(minPrice, maxPrice)
          rangeButton.click()
        
        }
      })
    }
    return
  }
  
  if (optional) {
    const reversed = Array.from(options).reverse()

    reversed.forEach((input) => {
      if (input.checked) {
        input.click()
      }
    })

    return
  } 

  


  options.forEach((input) => {
    if (input !== e.target && input.checked) {
      console.log(e.target.checked)
      // console.log(input, e.target)
      input.click()
    } 
  })

}


const flattenArray = (array) => {
  const newArray = [].concat(...array)

  return newArray
}


let currentFilterItems = []

const currentListItems = (isChecked, list) => {
  if (isChecked) {
    currentFilterItems.push(list)

  
  } else {
    currentFilterItems = currentFilterItems.filter((array) => array !== list)
  }

  const items = flattenArray(currentFilterItems)
  console.log(items)
  return items
  
}


let currentFilterItems2 = []

const currentListItems2 = (isChecked, list) => {
  if (isChecked) {
    currentFilterItems2.push(list)

 
  } else {
    currentFilterItems2 = currentFilterItems2.filter((array) => array !== list)
  
  }

  const items = flattenArray(currentFilterItems2)

  return items
}



let lastUsedFilterArray = []



const generateFilterEvent = (e, list) => {
  const options = e.target.parentNode.parentNode.parentNode.querySelectorAll(
    "input[type='checkbox']"
    )
  
  const inputParent =
    e.target.parentNode.parentNode.parentNode.querySelector("span")
  const isChecked = e.target.checked

  const selectedOrder = checkIfOrderSelected()
  console.log(options)

  if (inputParent.innerText === "Category") {
    currentFilterItems2 = []
    const currentList = currentListItems(isChecked, list)
    lastUsedFilterArray = currentFilterItems

    if (isChecked) {
      updatePaginationAndProducts(
        currentList,
        getPaginationPrefrence(),
        selectedOrder
      )

      categoriesFunctionality(currentList, inputParent)
    } else {
      // console.log(selectAllProducts.checked, getAllProducts())

      console.log(currentList)

      if (selectAllProducts.checked && currentFilterItems.length === 0) {
        updatePaginationAndProducts(
          getAllProducts(),
          getPaginationPrefrence(),
          selectedOrder
        )
        categoriesFunctionality(getAllProducts(), inputParent)
        return
      }

      if (currentList.length === 0) {
        updatePaginationAndProducts(
          currentSearch,
          getPaginationPrefrence(),
          selectedOrder
        )
        categoriesFunctionality(currentSearch, inputParent)
        return
      } else {
        updatePaginationAndProducts(
          currentList,
          getPaginationPrefrence(),
          selectedOrder
        )
        categoriesFunctionality(currentList, inputParent)
      }

      // categoriesFunctionality(currentList, inputParent)
    }
  }

  if (inputParent.innerText === "Brand") {
    const currentList = currentListItems2(isChecked, list)
    const categoryFilters = flattenArray(currentFilterItems)
    lastUsedFilterArray = currentFilterItems2

    if (isChecked) {
      updatePaginationAndProducts(
        currentList,
        getPaginationPrefrence(),
        selectedOrder
      )

      categoriesFunctionality(currentList, inputParent)
    } else {
      if (selectAllProducts.checked && categoryFilters.length === 0) {
        updatePaginationAndProducts(
          getAllProducts(),
          getPaginationPrefrence(),
          selectedOrder
        )
        categoriesFunctionality(getAllProducts(), inputParent)
        return
      }

      console.log(currentList.length, categoryFilters.length)
      if (currentList.length === 0 && categoryFilters.length !== 0) {
        updatePaginationAndProducts(
          categoryFilters,
          getPaginationPrefrence(),
          selectedOrder
        )
        categoriesFunctionality(categoryFilters, inputParent)
        return
      } else {
        console.log("else", currentSearch)
        updatePaginationAndProducts(
          currentList,
          getPaginationPrefrence(),
          selectedOrder
        )
        categoriesFunctionality(currentList, inputParent)
      }

      if (currentList.length === 0 && categoryFilters.length === 0) {
        updatePaginationAndProducts(
          currentSearch,
          getPaginationPrefrence(),
          selectedOrder
        )
        categoriesFunctionality(currentSearch, inputParent)
      }
    }
  }

  if (inputParent.innerText === "Price") {
     
    if (isChecked) {
      console.log(options)
      deselectPriceFilters(options, e)
      

      updatePaginationAndProducts(list, getPaginationPrefrence(), selectedOrder)

      // categoriesFunctionality(currentList, inputParent)
    } else {
      const categoryFilters = flattenArray(currentFilterItems)

      if (selectAllProducts.checked && categoryFilters.length === 0) {
        updatePaginationAndProducts(
          getAllProducts(),
          getPaginationPrefrence(),
          selectedOrder
        )
        categoriesFunctionality(getAllProducts(), inputParent)
        return
      }

      const whichToRender =
        lastUsedFilterArray.length !== 0
          ? flattenArray(lastUsedFilterArray)
          : currentSearch

      updatePaginationAndProducts(
        whichToRender,
        getPaginationPrefrence(),
        selectedOrder
      )
    }
  }
}


const getCheckedInputs = (inputs) => {
  const listOfChecked = []
  
  for (const input of inputs) {
    if (input.checked) {
      const inputId = input.id

      if (inputId === "price-interval") {
        const min = document.querySelector(".input-min")
        const max = document.querySelector(".input-max")

        const minVal = min.value
        const maxVal = max.value


        listOfChecked.push(  inputId ,{id: inputId, min: minVal, max: maxVal })
      } else {

       
        listOfChecked.push(inputId)
      }
    }
  }
  
  return listOfChecked
}

// FILTER LOADING / FILTER ADDING TO LOCAL STORAGE

const removeFiltersBtn = document.getElementById("remove-all-filters")
const removeAllBtnParent = document.getElementById("remove-all-filters-parent")






const storeCurrentFilters = () => {
  const currentFilters = []

  for(const container of filters){
    const inputs = container.querySelectorAll("input[type='checkbox']")
    
    const selectedFilters = getCheckedInputs(inputs)

    currentFilters.push(selectedFilters)
    
  }

  return flattenArray(currentFilters)
  
}



window.addEventListener("beforeunload", (e) => {

  const filters = JSON.stringify(storeCurrentFilters())
  
  localStorage.setItem('filters', filters)


})




const generateFilterFunctionality = (element, list ) => {
  const input = element.querySelector("input") 
  
  input.addEventListener("click", (e) => {
 
    generateFilterEvent(e, list)

    if (checkInputs(reloadedFilters())) {
      removeAllBtnParent.classList.remove("hide")
    } else {
      removeAllBtnParent.classList.add("hide")
    }

  })
 
}


removeFiltersBtn.addEventListener("click", (e) => {

  deselectPriceFilters(reloadedFilters(), "empty", "reverse")

  removeAllBtnParent.classList.add("hide")

})





const generateFilter = (name, count, list) => {
  const editName = name.replace(/ /g, "-")

  const container = document.createElement("div")
  container.innerHTML = `
  <input id='${editName}' type="checkbox" autocomplete="off" />
  <label for='${editName}' name=${editName}>
    ${name}
    <span>(${count})</span> 
  </label>
  `
 
  generateFilterFunctionality(container, list)

 
  return container
}


const filterType = (list, type, parent) => {
  const containerResults = returnFromSearch(list, type)
  const inputs = parent.querySelectorAll("div input")
  console.log(list)
  deleteEvents(inputs)
    
    parent.innerHTML = ""
    
    containerResults.forEach((element) => {
      const { name, count, products } = element
      const filter = generateFilter(name, count, products)
      parent.appendChild(filter)
    })
  
}


// On initial render brand and price update after the search that has been made 

let isInitialRender = true

const categoriesFunctionality = (list, category, individualUpdate) => {
  if(intervalInput.checked){
    intervalInput.checked = false
  }

  for (const container of filterContainers) {
    // if (index !== 0) {
      const containerType = container.querySelector("span").innerText.toLowerCase()
      const filterContainer = container.querySelector("aside") 

    //  console.log(container.innerText)

    if (isInitialRender) {
      console.log("INITIAL RENDER")
      if (containerType === "brand") {
        filterType(currentSearch, "brand", filterContainer)
      }

      if (containerType === "price") {
        filterType(currentSearch, "price", filterContainer)
      }

      if (containerType === "category") {
        filterType(list, "category", filterContainer)
      }
    } else if (category.innerText === "All Available Products"){
      currentFilterItems = []
      

      if (containerType === "brand") {
        filterType(list, "brand", filterContainer)
      }

      if (containerType === "price") {
        filterType(list, "price", filterContainer)
      }

      if (containerType === "category") {
        filterType(list, "category", filterContainer)
      }

    } else {
      updatePriceInterval(list, true)
      if (category.innerText === "Category") {
        if (containerType === "brand") {
          filterType(list, "brand", filterContainer)
        }

        if (containerType === "price") {
          filterType(list, "price", filterContainer)
        }
      }

      if (category.innerText === "Brand") {
        if (containerType === "price") {
          filterType(list, "price", filterContainer)
        }
      }

      // }
    }
   
    if(individualUpdate){
      if (containerType === individualUpdate) {
         
        filterType(getAllProducts(), individualUpdate, filterContainer)
      }

    }
  }

  isInitialRender = false
}


// On load the category will be generated considering all products first

categoriesFunctionality(getAllProducts())





intervalInput.addEventListener("click", (e) => {
  const allFilters = document.getElementById("all-filters")
  const filters = allFilters.children
  const filterInputs = filters[filters.length - 1].querySelectorAll(
    "div input[type='checkbox']"
  )

  const inputs =
    e.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll(
      "input[type='checkbox']"
    )
 
  
  if (intervalInput.checked) {
    removeAllBtnParent.classList.remove("hide")
    deselectPriceFilters(filterInputs, e)

    rangeButton.click()

  } else {
    if (!checkInputs(inputs)) {
      removeAllBtnParent.classList.add("hide")
    }


    updatePaginationAndProducts(
      getElementsFromLastArrayUsed(),
      getPaginationPrefrence(),
      checkIfOrderSelected()
    )
  }
  
})

// currentFilterItems
// currentFilterItems2

const rangePricesFromList = (list, min, max) => {

  const filter = list.filter(
    (element) =>
      ifDiscount(element) >= min && ifDiscount(element) <= max
  )
    console.log(filter)
  return filter
}

const checkInputs = (inputs) => {
  for (const input of inputs) {
    if (input.checked) {
      
      return true
    }
  }

  return false
}



const getElementsFromLastArrayUsed = () => {
  // filters
  let lastFilter = null
  for(const container of filters){
    // const type = container.querySelector("span")
    // console.log(type)
    

    if (container !== filters[filters.length - 1]) {

      const inputs = container.querySelectorAll("input[type='checkbox']")

      // console.log(inputs)
      if(container === filters[1] && checkInputs(inputs)){
        lastFilter = getAllProducts()
      }

      if(container === filters[2] && checkInputs(inputs)){
        lastFilter = currentFilterItems
      }

      if(container === filters[3] && checkInputs(inputs)){
        lastFilter = currentFilterItems2
      }
    }
  } 

  const result = lastFilter !== null ? flattenArray(lastFilter) : currentSearch
  console.log(result)
  return result
   
}





rangeButton.addEventListener('click', (e) => {
  console.log(getElementsFromLastArrayUsed())

  const inputs = e.target.parentNode.querySelectorAll("input")

  let min = parseInt(inputs[0].value)
  let max = parseInt(inputs[1].value)

 


  if(min === max){
    max = max + priceGap
  
  }

  if(min > max){
    
    // e.preventDefault()
    return
  }

  intervalInput.checked = true
  console.log(min, max)
  

  const ranges = rangePricesFromList(
    getElementsFromLastArrayUsed(),
    min,
    max
  )

  
  if(ranges.length !== 0){
    updatePaginationAndProducts(
      ranges,
      getPaginationPrefrence(),
      checkIfOrderSelected()
    )

  } else {
    updatePaginationAndProducts(
      getElementsFromLastArrayUsed(),
      getPaginationPrefrence(),
      checkIfOrderSelected()
    )

    intervalInput.click()

    }
    
})



const allFiltersLoaded = document.getElementById("all-filters").querySelectorAll("div input[type='checkbox']")

const reloadedFilters = () => {
 const allFiltersLoaded = document
   .getElementById("all-filters")
   .querySelectorAll("div input[type='checkbox']")

   return allFiltersLoaded
}

// LOAD FILTERS 

// MUST FIND A WAY TO OVERCOME THE FACT THAT WHEN I LOAD FILTERS IT GIVES ERROR

const loadFilters = () => {

  const getFilters = localStorage.getItem("filters")
  const lastUsedFilters = JSON.parse(getFilters)
  if(lastUsedFilters !== null){

    deselectPriceFilters(lastUsedFilters, "empty", "select")
  }

}

loadFilters()

  
// rangeInputFunctionality

// const customEvent = new Event("loaded")

// document.dispatchEvent(customEvent)

// allFilters.addEventListener("loaded", loadFilters)


// after that all selected filters to to show on mobile and tablet, the pc version needs to generate a button that removes all filters made

//




































































// OLD PRICE RANGE VISUAL FUNCTIONALITY, NOT FUNCTIONAL

// priceInput.forEach((input) => {
//   input.addEventListener("input", (e) => {
//     let minPrice = parseInt(priceInput[0].value),
//       maxPrice = parseInt(priceInput[1].value)

//     if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
//       if (e.target.className === "input-min") {
//         rangeInput[0].value = minPrice
//         range.style.left = (minPrice / rangeInput[0].max) * 100 + "%"
//       } else {
//         rangeInput[1].value = maxPrice
//         range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%"
//       }
//     }
//   })
// })
// rangeInput.forEach((input) => {
//   input.addEventListener("input", (e) => {
//     let minVal = parseInt(rangeInput[0].value),
//       maxVal = parseInt(rangeInput[1].value)
//     if (maxVal - minVal < priceGap) {
//       if (e.target.className === "range-min") {
//         rangeInput[0].value = maxVal - priceGap
//       } else {
//         rangeInput[1].value = minVal + priceGap
//       }
//     } else {
//       priceInput[0].value = minVal
//       priceInput[1].value = maxVal
//       range.style.left = (minVal / rangeInput[0].max) * 100 + "%"
//       range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"
//     }
//   })
// })



// FAILED REPLACEMENT FOR CATEGORY AND BRAND DUPLICATE FUNCTIONS IF THERE IS NEED LATER

// const ListItems = (isChecked, list, name) => {

//   const items = localStorage.getItem(name)
//   const parsedItems = JSON.parse(items)
//   let ifItemsExist = parsedItems ? parsedItems : []



  
//   if (isChecked) {
//     ifItemsExist.push(list)
    
//   } else {

//     const filter = ifItemsExist.filter((array) => array !== list)

//     ifItemsExist = filter
    
//     console.log(ifItemsExist.filter((array) => array !== list))
//   }

//   console.log(ifItemsExist)

//   const flatArray = [].concat(...ifItemsExist)

//   const stringifyList = JSON.stringify(ifItemsExist)
//   localStorage.setItem(name, stringifyList)

//   return flatArray


// }






// A FAILED TRY TO GET PRICE RANGES FROM AN ARRAY JUSt iN CASE YOU NEED IT

// const getPriceRanges = (list) => {
//   const biggestPrice = Math.max(...list.map((product) => product.price))
//   const smallestPrice = Math.min(...list.map((product) => product.price))
//   const round = Math.ceil(biggestPrice / 50) * 50

//   const ranges = localStorage.getItem("price-ranges")
//   const priceRanges = JSON.parse(ranges)

//   const filter = priceRanges.filter(element => element.rangeMin > smallestPrice && element.rangeMax < round)

//  return priceRanges

// }

// console.log(getPriceRanges(currentSearch))




// PAGINATION GENERATION FOR MULTIPLE PAGES OLD BROKEN VERSION IN CASE YOU NEED IT

//    const listElements = ol.querySelectorAll("li")
//    const currentPage = ol.querySelector(".current-page")
//    const currentIndex = Array.prototype.indexOf.call(listElements, currentPage)
//    const nextPage = currentIndex ? currentIndex + 1 : currentIndex - 1

//    if (nextPage === listElements.length) {
//      console.log("Da")
//      updatePagination(
//        currentSearch,
//        end,
//        listElements.length,
//        listElements.length + 4
//      )
//      //   console.log(listElements[0])
//      //   listElements[0].classList.add("current-page")
//    }

//    if (currentIndex === 0) {
//      updatePagination(
//        currentSearch,
//        end,
//        listElements.length - 5,
//        listElements.length
//      )
//    }
