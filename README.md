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

## New method for sorting arrays

- OLD: array.sort()

- sorts strings alphabetically ascending by default

- Does not sort numbers by default it needs a callback function to do that

- It DOES NOT create a new array it returns a sorted reference 

``` JS 

array.sort((a, b) => a - b)
```

-NEW: array.toSorted()

- It does exactly the same thing as .sort()

- IT MAKES A NEW ARRAY of the initial array now sorted

- It needs the same solution for numbers

``` JS 

array.toSorted((a, b) => a - b)
```

### Alternative

```JS

const sortedArray = [...array].sort()


```














