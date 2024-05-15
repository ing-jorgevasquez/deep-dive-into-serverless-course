exports.handler = async (event) => {
  const { rawPath, requestContext } = event;
  const path = rawPath ?? requestContext?.http?.path;
  const method = requestContext?.http?.method;

  console.log("method and path", { method, path });
  const baseResponse = getBaseResponse(method, path);
  const finalResponse = getEnrichedResponse(baseResponse);
  console.log(finalResponse);

  return finalResponse;
};

function getBaseResponse(method, path) {
  const errorResponse = {
    statusCode: 400,
    message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`,
  };
  const successResponse = {
    statusCode: 200,
    message: "Hello from Lambda",
  };
  const SUPPORTED_PATH = "/hello";

  return path === SUPPORTED_PATH ? successResponse : errorResponse;
}

function getEnrichedResponse(handlerResponse) {
  return {
    body: JSON.stringify(handlerResponse),
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    statusCode: handlerResponse.statusCode,
  };
}
