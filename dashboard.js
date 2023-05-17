const headerNav = document.getElementById("header-nav")
const hamburgerButton = document.getElementById("h-button")

hamburgerButton.addEventListener("click", () => {
  headerNav.classList.toggle("nav-toggle")

  hamburgerButton.classList.toggle("toggle-close")

  if (hamburgerButton.classList.contains("toggle-close")) {
    hamburgerButton.innerHTML = `
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
          `
  } else {
    hamburgerButton.innerHTML = `
         <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
              <g fill-rule="evenodd">
                <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
              </g>
            </svg>         `
  }
})
