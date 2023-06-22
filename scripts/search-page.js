const searchContainer = document.getElementById("search-container")
const inputContainer = document.getElementById("input-container")
const dummy = document.getElementById("dummy")
const searchInput = document.getElementById("search-input")
const formContent = document.getElementById("form-content")

// const dummies = formContent.querySelectorAll("span")
// console.log(dummies)

searchInput.addEventListener("click", (e) => {
    searchContainer.classList.toggle("overlay2")
    inputContainer.classList.toggle("top")
    inputContainer.classList.toggle("search-animation")
    formContent.classList.toggle("contend-width")
    dummy.classList.toggle("hide")
    // if (window.innerWidth > 550) {
    //   for (const dummy of dummies) {
    //     dummy.classList.toggle("hide")
    //     if (dummy.classList.contains("dummy-list")) {
    //       dummy.classList.toggle("flex")
    //     }
    //   }
    // }
    // const screenWidth = window.innerWidth
    // console.log(window.innerWidth > 550)

    // e.preventDefault()
    // if(searchContainer.classList.contains("overlay2")){
    // }
})

// console.log("da")






























