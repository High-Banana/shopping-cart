export default function errorHandler(error, request, response, next) {
  const statusCode = parseInt(error.message.slice(0, 4));
  if (!isNaN(statusCode)) response.status(statusCode).send(error.message);
  else response.status(503).send(error.message);
}
