exports.handler = async (event) => {
  const SUPPORTED_PATH = "/hello";
  const { requestContext } = event;
  const path = requestContext?.http?.path ?? event.rawPath;
  const method = requestContext?.http?.method;

  console.log("method and path", { method, path });

  const errorResponse = {
    statusCode: 400,
    message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`,
  };
  const successResponse = {
    statusCode: 200,
    message: "Hello from Lambda",
  };
  return path === SUPPORTED_PATH ? successResponse : errorResponse;
};
