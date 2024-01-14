export async function fetchApi() {
  try {
    const response = await fetch("https://dummyjson.com/products/category/smartphones");
    if (!response.ok) throw new Error(`HTTP Error! Status ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Fetching finished");
  }
}
// fetchApi();
