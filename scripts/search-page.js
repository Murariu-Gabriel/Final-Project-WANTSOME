
const mainSection = document.body.querySelector(".generated-search-result")
const selectContainers = document.body.querySelectorAll(".select-box")
const filterButton = document.getElementById("filter-button")
const filtersContainer = document.getElementById("filters")
const displayResult = document.getElementById("display-result")
const changeStyleButton = document.getElementById("change-style-button")

const generatedProductsContainer = document.getElementById("generated-products")
const generatedProductsCount = document.getElementById("result-count")
const resultText = document.getElementById("result-text")
const searchBarInput = document.body.querySelector(".search-input")
const searchPageContainer = document.getElementById("search-page-container")
const plural = document.getElementById("plural")

const selectPagination = document.getElementById("select-pagination")
const selectOrder = document.getElementById("select-order")


const arrowForward = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></svg>`

const arrowBackwards = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></svg>`

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
  filtersContainer.classList.toggle("display")
  filtersContainer.classList.toggle("overlay")
  document.body.classList.add("stop-scroll")
  window.scrollTo(0, 0)
})

displayResult.addEventListener("click", () => {
  filtersContainer.classList.toggle("display")
  filtersContainer.classList.toggle("overlay")
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

// FILTER RANGE INTERACTIVE FUNCTIONALITY

const rangeInput = document.querySelectorAll(".range-input input")
const progress = document.querySelector(".range-slider .progress")

const priceInput = document.querySelectorAll(".price-input input")

const priceGap = 100

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    e.stopPropagation()
    let minVal = parseInt(priceInput[0].value)
    let maxVal = parseInt(priceInput[1].value)

    if (maxVal - minVal >= priceGap) {
      // (maxVal -minVal >= priceGap) && maxVal <= 10000
      if (e.target.className === "input-min") {
        rangeInput[0].value = minVal
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%"
      } else {
        rangeInput[1].value = maxVal
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"
      }
    }

    console.log(minVal, maxVal)
  })
})

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
      priceInput[0].value = minVal
      priceInput[1].value = maxVal
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%"
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"
    }

    console.log(minVal, maxVal)
  })
})



const updateFilterRange = (list) => {
//   const biggestPrice = Math.max(...list.map((product) => product.price))
//   const smallestPrice = Math.min(...list.map((product) => product.price))
//   const round = Math.ceil(biggestPrice / 50) * 50

}




// GENERATE LIST OF SEARCHED PRODUCTS

const searchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(searchParams.entries())
const retrievedSearch = params.search

const updateCount = (listCount) => {
  generatedProductsCount.innerText = listCount
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

const paginationText = selectPagination.parentNode.querySelector("p")
const paginationPreference = localStorage.getItem("pagination")
const ifPaginationExists = paginationPreference ? paginationPreference : 8



const  ITEMS_PER_PAGE = parseInt(ifPaginationExists)
paginationText.innerText = `${ITEMS_PER_PAGE + 1} on page`

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

const addCount = (list, id) => {
  for (const el of list) {
    if (el.id.includes(id)) {
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
  productSlug
) => {
  const product = document.createElement("article")
  const isNew = ifNew ? "<p class='overline'>new</p>" : ""
  product.innerHTML = `
        <img
            class="category-image"
            src=${productImage}
            alt=${productName}
        />
        <div>
            ${isNew}
            <h3 class="subtitle">${productName}</h3>
        
            <span><strong>${productPrice}</strong> euro</span>

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
  
  if (verifyCartItemExistence(cartItems.children, productId)) {
    addCount(cartItems.children, productId)
  } else {
    const listEl = addListEl(
      productId,
      productImage,
      productName,
      productSlug,
      productPrice,
      1
    )

    cartListFunctionality(listEl)
    cartList.appendChild(listEl)
  }
 
  addItemToLocalStorage(productId, 1) 
})



  return product
}

const loadProducts = (searchResult, start, end) => {
    searchResult.forEach((product, index) => {
        const { images, new: ifNew, name, price, id, slug} = product
        
        if (index >= start && index <= end){
        generatedProductsContainer.appendChild(
          generateProduct(images.display.first, name, ifNew, price, id, slug)
        )
    }
  })
}


// IMPORTANT
loadProducts(currentSearch, 0, ITEMS_PER_PAGE)

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
        updatePagination(list, ITEMS_PER_PAGE, pagStart + 4, pagEnd + 4)
      }

      if (currentPage === pagStart) {
        if (currentPage > 1) {
          updatePagination(list, ITEMS_PER_PAGE, pagStart - 4, pagEnd - 4)
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

const updatePagination = (list, end = 8, listStart = 1, listEnd = 5) => {
    const generateOl = generatePagination(list, end, listStart, listEnd)
    pagination.innerHTML = ""
    pagination.appendChild(generateOl)

}

updatePagination(currentSearch, ITEMS_PER_PAGE)

// RETURN TO THE LAST PAGE REST OF CODE IN SHAREDSCRIPT

const currentPage = localStorage.getItem("page")

if(currentPage !== "1"){
  const pages = pagination.querySelectorAll("li")
  
  for(element of pages){
    if(element.innerText === currentPage){
      element.click()
    }
  }
}




const selectPaginationFunctionality = (list) => {
    const listElements = selectPagination.children

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

const selectOrderFunctionality = (list, order) => {
  const orderList = selectOrder.children

  const text = selectOrder.parentNode.querySelector("p")



  for (const element of orderList) {
  element.addEventListener("click", (e) => {
    let sorted = []
    text.innerText = e.target.innerText
    
    if(orderList[0] === element){
      sorted = sort(list, (a, b) => a.price - b.price)
    }else if (orderList[1] === element) {
      sorted = sort(list, (a, b) => b.price - a.price)
    } else {
      sorted = sort(list, (a, b) => b.new - a.new)
    }


    generatedProductsContainer.innerHTML = ""

  

    selectPaginationFunctionality(sorted)
    loadProducts(sorted, 0, ITEMS_PER_PAGE)
    updatePagination(sorted)
  
    })
  }

  for(const element of orderList){
    if(element.innerText === order){
      element.click()
    }
  }

}

selectOrderFunctionality(currentSearch)


// toSort might not be the best approach here, but since my data has a small number there is no need for now for a better sorting solution. In the future or on other projects there is a big probability this might not be optimal and be in need of a different approach.


// SORTING FUNCTION USING THE NEW SORT METHOD

const sort = (array, callback) => {
    const sort = array.toSorted(callback)

return sort
}


const getAllProducts = () => {
    const allProducts = localStorage.getItem("products")
    const parsedProducts = JSON.parse(allProducts)

    return parsedProducts
}


// !IMPORTANT 
const updatePaginationAndProducts = (items, itemsPerPage, order) => {
  generatedProductsContainer.innerHTML = ""

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
  const inputParent =
    e.target.parentNode.parentNode.querySelector("span")

  if(e.target.checked){
    updatePaginationAndProducts(products, ITEMS_PER_PAGE)
    categoriesFunctionality(products, inputParent)
  } else {
    updatePaginationAndProducts(currentSearch, ITEMS_PER_PAGE)
     categoriesFunctionality(currentSearch, inputParent)
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



const deselectPriceFilters = (inputParent, options, e) => {
    if (inputParent.innerText === "Price") {
      options.forEach((input) => {
        if (input !== e.target && input.checked) {
          input.click()
        }
      })
    }
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

return items
  
}


let currentFilterItems2 = []

const currentListItems2 = (isChecked, list) => {
  if (isChecked) {
    // const newList = currentFilterItems2.filter(newList => newList !== list)
    currentFilterItems2.push(list)

 
  } else {
    currentFilterItems2 = currentFilterItems2.filter((array) => array !== list)
  
  }

  const items = [].concat(...currentFilterItems2)

  return items
}



let lastUsedFilterArray = []


const generateFilterFunctionality = (element, list) => {

  const input = element.querySelector("input")

  input.addEventListener("click", (e) => {
    const options = e.target.parentNode.parentNode.querySelectorAll("input")
    const inputParent = e.target.parentNode.parentNode.parentNode.querySelector("span")
    const isChecked = e.target.checked

    const selected = Array.from(options).filter((input) => input.checked)

    const selectedOrder = checkIfOrderSelected()
    // console.log(options)

    deselectPriceFilters(inputParent, options, e)

    if(inputParent.innerText === "Category"){
      currentFilterItems2 = []
      const currentList = currentListItems(isChecked, list)
      lastUsedFilterArray = currentFilterItems
  
      if (isChecked) {
        updatePaginationAndProducts(
          currentList,
          ITEMS_PER_PAGE,
          selectedOrder
        )
  
        categoriesFunctionality(currentList, inputParent)
      }
       else {
          // console.log(selectAllProducts.checked, getAllProducts())
  
            console.log(currentList)

        if (selectAllProducts.checked) {
          updatePaginationAndProducts(
            getAllProducts(),
            ITEMS_PER_PAGE,
            selectedOrder
          )
          categoriesFunctionality(getAllProducts(), inputParent)
          return
        }


        if (currentList.length === 0) {
          updatePaginationAndProducts(
            currentSearch,
            ITEMS_PER_PAGE,
            selectedOrder
          )
          categoriesFunctionality(currentSearch, inputParent)
          return
        } else {
          updatePaginationAndProducts(
            currentList,
            ITEMS_PER_PAGE,
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
          ITEMS_PER_PAGE,
          selectedOrder
        )

        categoriesFunctionality(currentList, inputParent)
      } else {

        if (selectAllProducts.checked && categoryFilters.length === 0) {
          updatePaginationAndProducts(
            getAllProducts(),
            ITEMS_PER_PAGE,
            selectedOrder
          )
          categoriesFunctionality(getAllProducts(), inputParent)
          return
        }

          console.log(currentList.length, categoryFilters.length)
        if (currentList.length === 0 && categoryFilters.length !== 0) {
          updatePaginationAndProducts(
            categoryFilters,
            ITEMS_PER_PAGE,
            selectedOrder
          )
          categoriesFunctionality(categoryFilters, inputParent)
          return
        } 
        else {
          console.log("else", currentSearch)
          updatePaginationAndProducts(
            currentList,
            ITEMS_PER_PAGE,
            selectedOrder
          )
          categoriesFunctionality(currentList, inputParent)
        }

        if(currentList.length === 0 && categoryFilters.length === 0){

          updatePaginationAndProducts(
            currentSearch,
            ITEMS_PER_PAGE,
            selectedOrder
          )
          categoriesFunctionality(currentSearch, inputParent)
        }
      }
    }

    if(inputParent.innerText === "Price"){
      if (isChecked) {
        updatePaginationAndProducts(
          list,
          ITEMS_PER_PAGE,
          selectedOrder
        )
  
        // categoriesFunctionality(currentList, inputParent)
      }
       else {
        const categoryFilters = flattenArray(currentFilterItems2)

         if (selectAllProducts.checked && categoryFilters.length === 0) {
           updatePaginationAndProducts(
             getAllProducts(),
             ITEMS_PER_PAGE,
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
          ITEMS_PER_PAGE,
          selectedOrder
        )

      }
    }
  })
}






const generateFilter = (name, count, list) => {
  const editName = name.replace(" ", "-")

  const container = document.createElement("div")
  container.innerHTML = `
  <input id=${editName} type="checkbox" />
  <label for=${editName} name=${editName}>
    ${editName}
    <span>(${count})</span> 
  </label>
  `
 
  generateFilterFunctionality(container, list)

 
  return container
}


const filterType = (list, type, parent) => {
   const containerResults = returnFromSearch(list, type)
   parent.innerHTML = ""

   containerResults.forEach((element) => {
     const { name, count, products } = element
     const filter = generateFilter(name, count, products)
     parent.appendChild(filter)
   })
}



// On initial render brand and price update after the search that has been made 

let isInitialRender = true

const categoriesFunctionality = (list, category) => {
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
        // console.log(category)

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
  }

  isInitialRender = false
}


// On load the category will be generated considering all products first

categoriesFunctionality(getAllProducts())


//STEPS LEFT TO MAKE


// unique selection between price ranges and slide range needed


// line 573 the prefrence for  order need to remain valid while changing filters
// only when i go for product page or refresh
























































































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
