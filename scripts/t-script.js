// checking nav param window category

const searchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(searchParams.entries())

const paramsCategory = params.category


const categoryTitle = document.getElementById("page-category")
console.log(paramsCategory)

const updateCategoryTitle = (category) =>{
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

const productsContainer = document.body.querySelector(
  ".template-category .container"
)

const getCategoryProducts = (category) => {
  const data = localStorage.getItem("products")
  const products = JSON.parse(data)

  const categorySpecificProducts = products.filter(product => product.category.includes(category))

  return categorySpecificProducts


}


const loadProducts = (listOfProducts) => {
  listOfProducts.forEach(product => {
    // console.log(product.id)
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

  });

}

const categoryProducts = getCategoryProducts(paramsCategory)

if(categoryProducts.length > 0){
  loadProducts(categoryProducts)
} else {
  // aici trebuie sa faci putin css pt fara rezultate
  productsContainer.innerHTML = "<p>nimic</p>"
}

























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