const ITEMS_PER_PAGE = 4

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
  imgAlt
) => {
  const article = document.createElement("article")
  const ifNew = newProduct ? "<p class='overline'>new product</p>" : ""
  article.innerHTML = `
          
          <a href="/html-pages/product-page.html?productId=${id}" class="image-container">
            <img src=${imgSrc} alt="${imgAlt}">
          </a>
          <div>
            ${ifNew}
            <h2>${productTitle}</h2>
            <p>${productDescription}</p>
            <a href="/html-pages/product-page.html?productId=${id}" class="button-1">see product</a>
          </div>
          `

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

  return categorySpecificProducts
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
          product.name
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


const generatePagination = (list) => {
  let page = Math.floor(list.length / ITEMS_PER_PAGE)
  const pageRest = list.length % ITEMS_PER_PAGE
  if (pageRest > 0) {
    page = page + 1
  }

  const ol = document.createElement("ol")
  ol.classList.add("pagination-list")
  for (let i = 1; i <= page; i++) {
    const li = document.createElement("li")
    li.classList.add("pagination-element")
    li.textContent = i
    li.addEventListener("click", (event) => {
      productsContainer.innerHTML = ""
   
      const count = parseInt(event.target.textContent)

      const start = ITEMS_PER_PAGE * (count - 1)
      const end = ITEMS_PER_PAGE * count
      console.log(start, end)
      loadProducts(list, start, end - 1)
    })
    ol.appendChild(li)
  }

  return ol
}


const generateOl = generatePagination(categoryProducts)
pagination.appendChild(generateOl)

// aici generam lista dar in acelasi timp aceasta functie va fi folosita la search



















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
