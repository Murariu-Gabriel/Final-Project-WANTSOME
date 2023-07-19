const ITEMS_PER_PAGE = 4

const arrowForward = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></svg>`
const arrowBackwards = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></svg>`


// checking nav param window category

const searchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(searchParams.entries())

const paramsCategory = params.category.replace("-", " ")

const categoryTitle = document.getElementById("page-category")
console.log(paramsCategory)

const updateCategoryTitle = (category) => {
  if (category.includes("strap")) {
    categoryTitle.innerText = "smart straps"
  } else if (category.includes("watch")) {
    categoryTitle.innerText = "smart watches"
  } else if (category.includes("band")) {
    categoryTitle.innerText = "smart bands"
  }
}

updateCategoryTitle(paramsCategory)

// const category = productList.find(function (element) {
//   return element.id === params.productId
// })

// Adding product on page
const addProduct = (
  id,
  newProduct,
  productTitle,
  productDescription,
  imgSrc,
  imgAlt,
  discount
) => {
  const article = document.createElement("article")
  const ifNew = newProduct ? "<p class='overline'>new product</p>" : ""
  const ifDiscount = discount ? `<p class='overline'>Discount: ${discount}% OFF</p>` : ""
  

  article.innerHTML = `
          
    <a href="/html-pages/product-page.html?productId=${id}" class="image-container">
      <img src=${imgSrc} alt="${imgAlt}">
    </a>
    <div>
      ${ifNew}
      ${ifDiscount}
      <h2>${productTitle}</h2>
      <p>${productDescription}</p>
      <a href="/html-pages/product-page.html?productId=${id}" class="button-1">see product</a>
    </div>
    `

    
  if (discount) {
    const overline = article.querySelector(".overline")
    overline.style.color = "rgb(99, 129, 250)"
  }

  return article
}

const productsContainer = document.getElementById("generated-items")
const pagination = document.getElementById("pagination")

const getCategoryProducts = (category) => {
  const data = localStorage.getItem("products")
  const products = JSON.parse(data)

  const categorySpecificProducts = products.filter((product) =>
    product.category.includes(category)
  )

  const sortedByNew = categorySpecificProducts.sort((a,b) => b.new - a.new)

  return sortedByNew
}




const loadProducts = (listOfProducts, start, end) => {
  listOfProducts.forEach((product, index) => {
    
    if(index >= start && index <= end){
      productsContainer.appendChild(
        addProduct(
          product.id,
          product.new,
          product.name,
          product.description,
          product.images.display.first,
          product.name,
          product.discount
        )
      )
    }
  })
}

const categoryProducts = getCategoryProducts(paramsCategory)

if (categoryProducts.length === 0) {
  productsContainer.innerHTML = "<h2>Sorry, something went wrong</h2>"
} 

loadProducts(categoryProducts, 0, ITEMS_PER_PAGE - 1)


const createButton = (id, btnClass, content) => {
  const btn = document.createElement("button")
  btn.setAttribute("id", id)
  btn.setAttribute("class", btnClass)
  btn.classList.add("pagination-element")
  btn.classList.add("button")
  btn.innerHTML = content

  return btn
}


const generatePagination = (list, itemsPerPage, pagStart, pagEnd) => {
  let page = Math.floor(list.length / itemsPerPage)

  const pageRest = list.length % itemsPerPage
  if (pageRest > 1) {
    page = page + 1
  }

  const ol = document.createElement("ol")
  ol.classList.add("pagination-list")
  ol.appendChild(
    createButton("page-backwards", "page-backwards", arrowBackwards)
  )

  let i = pagStart
  do {
    if (i > pagEnd) {
      break
    }

    const li = document.createElement("li")
    li.classList.add("pagination-element")
    li.textContent = i

    li.addEventListener("click", (e) => {
      productsContainer.innerHTML = ""
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
        updatePagination(
          list,
          ITEMS_PER_PAGE,
          pagStart + 4,
          pagEnd + 4
        )
      }

      if (currentPage === pagStart) {
        if (currentPage > 1) {
          updatePagination(
            list,
            ITEMS_PER_PAGE,
            pagStart - 4,
            pagEnd - 4
          )
          const olListElements = pagination.querySelectorAll("li")
          olListElements[olListElements.length - 1].classList.add(
            "current-page"
          )
          olListElements[0].classList.remove("current-page")
        }
      }

      // localStorage.setItem("page", li.textContent)
    })

    ol.appendChild(li)
    i++
  } while (i <= page)

  const listElements = ol.querySelectorAll("li")
  listElements[0].classList.add("current-page")
  ol.appendChild(createButton("page-forward", "page-forward", arrowForward))

  const buttons = ol.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const listElements = pagination.querySelectorAll("li")
      const currentPage = pagination.querySelector(".current-page")
      const currentIndex = Array.prototype.indexOf.call(
        listElements,
        currentPage
      )
      let incrementDecrement =
        e.target.id === "page-forward" ? currentIndex + 1 : currentIndex - 1

      if (incrementDecrement < 0) {
        incrementDecrement = 0
      }
      if (incrementDecrement >= 5) {
        incrementDecrement = 4
      }

      console.log(currentIndex)
      console.log(incrementDecrement)

      if (
        incrementDecrement >= 0 &&
        incrementDecrement <= listElements.length - 1
      )
        listElements[incrementDecrement].click()
    })
  })

  return ol
}

const updatePagination = (
  list,
  end = ITEMS_PER_PAGE,
  listStart = 1,
  listEnd = 5
) => {
  const generateOl = generatePagination(list, end, listStart, listEnd)
  pagination.innerHTML = ""
  pagination.appendChild(generateOl)
}

updatePagination(categoryProducts)






// GENERATE PRODUCTS 1.0

// const generatePagination = (list) => {
//   let page = Math.floor(list.length / ITEMS_PER_PAGE)
//   const pageRest = list.length % ITEMS_PER_PAGE
//   if (pageRest > 0) {
//     page = page + 1
//   }

//   const ol = document.createElement("ol")
//   ol.classList.add("pagination-list")
//   for (let i = 1; i <= page; i++) {
//     const li = document.createElement("li")
//     li.classList.add("pagination-element")
//     li.textContent = i
//     li.addEventListener("click", (e) => {
//       productsContainer.innerHTML = ""
   
//       const count = parseInt(e.target.textContent)

//       const start = ITEMS_PER_PAGE * (count - 1)
//       const end = ITEMS_PER_PAGE * count
//       console.log(start, end)
//       loadProducts(list, start, end - 1)
//       window.scrollTo(0, 0)
//     })
//     ol.appendChild(li)
//   }

//   return ol
// }

// const generateOl = generatePagination(categoryProducts)
// pagination.appendChild(generateOl)




// console.log(loadProducts())

// const users = localStorage.getItem("products")
// const parsedProducts = JSON.parse(users)

// console.log(parsedProducts[0])
//  const product = parsedProducts[0]
// console.log(product.name)
// productsContainer.appendChild(
//   addProduct(
//     product.id,
//     product.new,
//     product.name,
//     product.description,
//     product.images.display.first,
//     product.name
//   )
// )

// newProduct, productTitle, productDescription, imgSrc, imgAlt
