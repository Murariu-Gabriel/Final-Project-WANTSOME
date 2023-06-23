const searchContainer = document.getElementById("search-container")
const inputContainer = document.getElementById("input-container")
const dummy = document.getElementById("dummy")
const searchInput = document.getElementById("search-input")
const formContent = document.getElementById("form-content")
const searchResults = document.getElementById("search-results")
const closeSearch = document.getElementById("close-search")

const recentSearches = localStorage.getItem("recent-searches")
const parsedRecentSearches = JSON.parse(recentSearches)
const searches = parsedRecentSearches ? parsedRecentSearches : []
// const searches = recentSearches ? recentSearches : []




const addSearchToggle = (e,) =>{
    if(e){
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
}


searchInput.addEventListener("click", addSearchToggle)

closeSearch.addEventListener("click", (e) => {
    removeSearchToggle(e)
})


const listResults = searchResults.querySelector("ul")
const searchTitle = document.getElementById("search-title")
const searchButton = document.getElementById("search-button")

const searchValidation = (value) => {
  if (value.includes(" ") || value.length > 2) {
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

searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value
    listResults.innerHTML = ""
    searchTitle.innerText = "Search suggestions"

    console.log(value.length)
    if(value.length < 2){
        searchTitle.innerText = "Recent searches"
        fillRecentSearches()
    }

    console.log(e.key)
    if(e.key === "Escape"){
        removeSearchToggle()
    } 
    if (e.key === "Enter") {
      e.preventDefault()
   
    }

    // NEXT 

    // on key input verify if input exists in products.name || products.category
    // if any of them match return an array with the products
    // take that array and render in the ul the names

    // when you get search results you want your placeholder to have in it the first result as a placeholder that can be seen while writing

    // somehow each li inserted should contain the input words highlighted with irange

})



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
        </svg>${content}</a>
    `

    return element
}

const fillRecentSearches = () => {
  searches.forEach((element) => {
    listResults.appendChild(generateListElement(element))
  })
}

fillRecentSearches()























