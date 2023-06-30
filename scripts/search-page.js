

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

const selectPagination = document.getElementById("select-pagination")
const selectOrder = document.getElementById("select-order")


// FILTER AND SELECT TOGGLES TOGGLES

// VA TREBUII SA FACI TOGGLE OFF PENTRU CAND DAI CLICK INAFARA LOR

const addSelectEvent = () => {
  selectContainers.forEach((element) => {
    const select = element.querySelector("p")
    const list = element.querySelector("ul")
    select.addEventListener("click", (e) => {
      e.stopPropagation()
      list.classList.toggle("hide")
    })
    // aici va trebuii sa ma gandesc cum sa adaug event listeners pe li-uri ca in momentul in care le apas sa se face toggle off si doar contanerul cu produse sa isi faca reload cu filtrarea ceruta
    // console.log(list.children)
  })
}

addSelectEvent()

// WHEN USER CLICKS OUT OF SELECT BOXES

document.body.addEventListener("click", (e) => {
    console.log('DA')
      
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

changeStyleButton.addEventListener("click", (e) => {
  const svgs = e.target.children

  for (const svg of svgs) {
    svg.classList.contains("hide")
      ? svg.classList.remove("hide")
      : svg.classList.add("hide")
  }

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


// console.log(currentSearch.length)
if (currentSearch.length === 0) {
  searchPageContainer.innerHTML = `<h2 class="search-err"><span> 0 results for:</span> ${retrievedSearch}</h2>`
}

// UPDATING SEARCH DATA ON LOAD
updateCount(currentSearch.length)
resultText.innerText = `"${retrievedSearch}"`
searchBarInput.value = retrievedSearch


// GENERATING PRODUCT AND PAGINATION

 const  ITEMS_PER_PAGE = 9 - 1
 const pagination = document.getElementById("pagination")

const generateProduct = (
  productImage,
  productName,
  ifNew,
  productPrice,
  productId
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

  return product
}

const loadProducts = (searchResult, start, end) => {
  searchResult.forEach((product, index) => {
    const { images, new: ifNew, name, price, id } = product

    if (index >= start && index <= end){
        generatedProductsContainer.appendChild(
          generateProduct(images.display.first, name, ifNew, price, id)
        )
    }
  })
}


// IMPORTANT
loadProducts(currentSearch, 0, ITEMS_PER_PAGE)


const generatePagination = (list, itemsPerPage) => {
  let page = Math.floor(list.length / itemsPerPage)
  const pageRest = list.length % itemsPerPage
  if (pageRest > 0) {
    page = page + 1
  }

  const ol = document.createElement("ol")
  ol.classList.add("pagination-list")
  for (let i = 1; i <= page; i++) {
    const li = document.createElement("li")
    li.classList.add("pagination-element")
    li.textContent = i
    li.addEventListener("click", (e) => {
        generatedProductsContainer.innerHTML = ""
        const count = parseInt(e.target.textContent)
        
        const start = itemsPerPage * (count - 1) 
        const end = itemsPerPage * count
        
        const ifStartZero = start === 0 ? start  : start + 1
        
        console.log(ifStartZero, end)
        loadProducts(list, ifStartZero, end)
        window.scrollTo(0, 0)
    })
    ol.appendChild(li)
  }

  return ol
}


// IMPORTANT


const generateOl = generatePagination(currentSearch, ITEMS_PER_PAGE)
pagination.appendChild(generateOl)

// PAGINATION OPTIONS


const selectPaginationFunctionality = (list) => {
    const listElements = selectPagination.children

    for(element of listElements){
        element.addEventListener("click", (e) => {
            const elementValue =  parseInt(e.target.textContent.substring(0, 2)) - 1
            console.log(elementValue)

            const generateOl = generatePagination(list, elementValue)
            pagination.innerHTML = ""
            generatedProductsContainer.innerHTML = ""

            loadProducts(list, 0, elementValue)
            pagination.appendChild(generateOl)

        })
    }

}


// IMPORTANT
selectPaginationFunctionality(currentSearch)


/* ideea aici este asa, ca dupa primul array de la search se va modula tot dar dupa ce se apasa unul din butoanele din filtre va trebuii sa tot sa fie reincarcat dupa acel array */


// ORDER OPTIONS
// const selectOrder = document.getElementById("select-order")

const selectOrderFunctionality = () => {
    const orderList = selectOrder.children
    
    for (const element of orderList) {
      element.addEventListener("click", (e) => {
        console.log(e.target)
        loadProducts(sort(currentSearch), 0, ITEMS_PER_PAGE)
      })
    }
}

selectOrderFunctionality()



// PROBLEMA la event listener-urile de ordonnare acestea nu functioneaza cum trebuie desi am event-urile puse corect trebuie investigat


const sort = (array) => {
    
  const sort = array.sort((a, b) => b.price - a.price)

    return sort
}
console.log(sort(currentSearch))

