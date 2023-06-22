const searchContainer = document.getElementById("search-container")
const inputContainer = document.getElementById("input-container")
const dummy = document.getElementById("dummy")
const searchInput = document.getElementById("search-input")
const formContent = document.getElementById("form-content")
const searchResults = document.getElementById("search-results")

searchInput.addEventListener("click", (e) => {
    searchContainer.classList.toggle("overlay2")
    inputContainer.classList.toggle("top")
    inputContainer.classList.toggle("search-animation")
    formContent.classList.toggle("contend-width")
    dummy.classList.toggle("hide")
    searchResults.classList.toggle("hide")

    // e.preventDefault()
    // if(searchContainer.classList.contains("overlay2")){
    // }
})

// console.log("da")






























