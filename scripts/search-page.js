const selectContainers = document.body.querySelectorAll(".select-box")
const filterButton = document.getElementById("filter-button")
const filtersContainer = document.getElementById("filters")
const displayResult = document.getElementById("display-result")
const changeStyleButton = document.getElementById("change-style-button")

// FILTER AND SELECT TOGGLES TOGGLES

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
    document.body.classList.add("stop-scroll")
})

displayResult.addEventListener("click", () => {
     filtersContainer.classList.toggle("display")
     filtersContainer.classList.toggle("overlay")
     document.body.classList.remove("stop-scroll")
})


// TOGGLE FOR VIEW STYLE

changeStyleButton.addEventListener("click", (e) => {
    const svgs = e.target.children

    for(const svg of svgs){
        svg.classList.contains("hide")
          ? svg.classList.remove("hide")
          : svg.classList.add("hide")
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
      window.scrollTo({
        top: 0,
        // behavior: "smooth", // Add smooth scrolling animation
      })
    }
  }
})





// FILTER RANGE FUNCTIONALITY

const rangeInput = document.querySelectorAll(".range-input input")
const progress = document.querySelector(".range-slider .progress")

const priceInput = document.querySelectorAll(".price-input input")

const priceGap = 100


priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    e.stopPropagation()
    let minVal = parseInt(priceInput[0].value)
    let maxVal = parseInt(priceInput[1].value)

    if (maxVal - minVal >= priceGap) { // (maxVal -minVal >= priceGap) && maxVal <= 10000
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



rangeInput.forEach(input => {
    input.addEventListener("input", (e) => {
        e.stopPropagation()
        let minVal = parseInt(rangeInput[0].value)
        let maxVal = parseInt(rangeInput[1].value)

        if(maxVal - minVal < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap 
            } else {
                rangeInput[1].value = minVal + priceGap 
            }
        }else{
            priceInput[0].value = minVal
            priceInput[1].value = maxVal
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%"
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"
        }

        console.log(minVal, maxVal)
    })
})
