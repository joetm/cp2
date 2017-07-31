/** @flow */

import React from 'react'

const Msgs = {
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  306: "Switch Proxy",
  307: "Temporary Redirect",
  307: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  415: "Unsupported Media Type",
  498: "Invalid Token",
  499: "Token Required",
  500: "Internal Server Error",
  501: "Not Implemented",
  503: "Service Unavailable",
}

const getMsg = (code) => {
  return `${code} - ${Msgs[code]}.`
}

const Error = () => (

  <div>
    <h2>{getMsg(404)}</h2>
  </div>
)

export default Error