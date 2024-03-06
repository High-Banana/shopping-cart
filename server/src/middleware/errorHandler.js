export default function errorHandler(error, request, response, next) {
  if (error.message === "404 Error") response.status(404).send("Item not found");
  console.log(error.message);
}
