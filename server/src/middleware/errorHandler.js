export default function errorHandler(error, request, response, next) {
  if (error.message === "404 Error") response.status(404).send("Product not found");
  else response.status(400).send(error.message);
  console.log(error.message);
}
