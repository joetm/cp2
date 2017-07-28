"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Msgs;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Msgs = (_Msgs = {
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  306: "Switch Proxy",
  307: "Temporary Redirect"
}, _defineProperty(_Msgs, "307", "Permanent Redirect"), _defineProperty(_Msgs, 400, "Bad Request"), _defineProperty(_Msgs, 401, "Unauthorized"), _defineProperty(_Msgs, 402, "Payment Required"), _defineProperty(_Msgs, 403, "Forbidden"), _defineProperty(_Msgs, 404, "Not Found"), _defineProperty(_Msgs, 405, "Method Not Allowed"), _defineProperty(_Msgs, 406, "Not Acceptable"), _defineProperty(_Msgs, 408, "Request Timeout"), _defineProperty(_Msgs, 409, "Conflict"), _defineProperty(_Msgs, 410, "Gone"), _defineProperty(_Msgs, 415, "Unsupported Media Type"), _defineProperty(_Msgs, 498, "Invalid Token"), _defineProperty(_Msgs, 499, "Token Required"), _defineProperty(_Msgs, 500, "Internal Server Error"), _defineProperty(_Msgs, 501, "Not Implemented"), _defineProperty(_Msgs, 503, "Service Unavailable"), _Msgs);

var getMsg = function getMsg(code) {
  return code + " - " + Msgs[code] + ".";
};

var Error = function Error() {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "h2",
      null,
      getMsg(404)
    )
  );
};

exports.default = Error;