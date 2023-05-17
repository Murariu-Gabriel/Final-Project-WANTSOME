# Documentation of stuff I find interesting 

## Toggle alternatives for .toggle()

- Ternary operator

```JS
  headerNav.classList.contains("nav-toggle")
    ? headerNav.classList.remove("nav-toggle")
    : headerNav.classList.add("nav-toggle")
```

- If else statement 

```JS
  if (headerNav.classList.contains("nav-toggle")) {
    headerNav.classList.remove("nav-toggle")
  } else {
      headerNav.classList.add("nav-toggle")
  }
```