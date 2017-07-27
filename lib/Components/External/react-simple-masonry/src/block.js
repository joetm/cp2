'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var width = _ref.width,
      height = _ref.height,
      x = _ref.x,
      y = _ref.y,
      children = _ref.children;


  var style = {
    width: width,
    height: height,
    transform: 'translate3d(' + x + 'px, ' + y + 'px, 0)',
    position: 'absolute',
    top: 0,
    left: 0,
    border: '1px solid',
    transition: 'transform .2s'
  };

  return _react2.default.createElement(
    'div',
    { style: style },
    children
  );
};