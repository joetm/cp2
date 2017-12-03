
const Msgs = {
  // 300: "Multiple Choices",
  // 301: "Moved Permanently",
  // 302: "Found",
  // 303: "See Other",
  // 304: "Not Modified",
  // 305: "Use Proxy",
  // 306: "Switch Proxy",
  // 307: "Temporary Redirect",
  // 308: "Permanent Redirect",
  400: {
    msg: "Bad Request",
    description: "The server cannot or will not process the request due to an apparent error on your side." },
  401: {
    msg: "Unauthorized",
    description: "Authentication is required and has failed or has not yet been provided."
  },
  402: {
    msg: "Payment Required",
    description: "Reserved for future use."
  },
  403: {
    msg: "Forbidden",
    description: "You do not have the necessary permissions."
  },
  404: {
    msg: "Not Found",
    description: "We could not find what you were looking for."
  },
  405: {
    msg: "Method Not Allowed",
    description: "The request method is not supported for the requested resource."
  },
  406: {
    msg: "Not Acceptable",
    description: "The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request."
  },
  408: {
    msg: "Request Timeout",
    description: "The server timed out waiting for the request."
  },
  // 409: { msg: "Conflict", description: "" },
  410: {
    msg: "Gone",
    description: "The resource requested is no longer available and will not be available again."
  },
  415: {
    msg: "Unsupported Media Type",
    description: "The request entity has a media type which the server or resource does not support. "
  },
  498: {
    msg: "Invalid Token",
    description: ""
  },
  499: {
    msg: "Token Required",
    description: ""
  },
  500: {
    msg: "Internal Server Error",
    description: "An unexpected error occurred."
  },
  501: {
    msg: "Not Implemented",
    description: "The server either does not recognize the request method, or it lacks the ability to fulfil the request."
  },
  503: {
    msg: "Service Unavailable",
    description: "The server is temporarily unavailable."
  },
}

export const getError = (code) => {
  return Msgs[`${code}`]
}

export default getError
