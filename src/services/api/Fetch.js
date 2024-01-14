async function fetchApi() {
  fetch("https://dummyjson.com/products/1")
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
}

export { fetchApi };
