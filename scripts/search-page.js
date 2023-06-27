const selectContainers = document.body.querySelectorAll(".select-box")
const filterButton = document.getElementById("filter-button")
const filtersContainer = document.getElementById("filters")
const displayResult = document.getElementById("display-result")

// VA TREBUII SA FACI TOGGLE OFF PENTRU CAND DAI CLICK INAFARA LOR

const addSelectEvent = () => {
    selectContainers.forEach(element => {
        const select = element.querySelector("p")
        const list = element.querySelector("ul")
        select.addEventListener("click", () => {
            list.classList.toggle("hide")
        })
        // aici va trebuii sa ma gandesc cum sa adaug event listeners pe li-uri ca in momentul in care le apas sa se face toggle off si doar contanerul cu produse sa isi faca reload cu filtrarea ceruta
        // console.log(list.children)
    })
}

addSelectEvent()

filterButton.addEventListener("click", () => {
    filtersContainer.classList.toggle("display")
    filtersContainer.classList.toggle("overlay")
})

displayResult.addEventListener("click", () => {
     filtersContainer.classList.toggle("display")
     filtersContainer.classList.toggle("overlay")
})







