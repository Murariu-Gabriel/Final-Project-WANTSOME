const headerNav = document.getElementById("header-nav")
const buttons = document.querySelectorAll("header button")

const addToggleFunctionality = () => {
  for (const button of buttons) {
    if (button.classList.contains("display-none")) {
      button.classList.toggle("display-none")
    }
  }
}

const addButtonEvent = () => {
  for (const button of buttons) {
    const id = button.getAttribute("id")

    if (id) {
      button.addEventListener("click", (e) => {
        headerNav.classList.toggle("nav-toggle")
        const eventButton = e.target

        addToggleFunctionality()

        eventButton.classList.toggle("display-none")
      })
    }
  }
}

addButtonEvent()



// IN cazul in care te razgandesti la nav toggle

// if (hamburgerButton.classList.contains("toggle-close")) {
//   hamburgerButton.innerHTML = `
//     <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
//       <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z">
//       </path>
//     </svg>
//         `
// } else {
//   hamburgerButton.innerHTML = `
//     <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
//       <g fill-rule="evenodd">
//         <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
//       </g>
//     </svg>         `
// }
// })
