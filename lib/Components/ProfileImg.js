'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  containerStyle: {
    width: '100%',
    height: '450px',
    textAlign: 'center',
    backgroundColor: '#808080',
    overflow: 'hidden'
  },
  imgStyle: {}
};

var ProfileImg = function ProfileImg() {
  return _react2.default.createElement(
    'div',
    { style: styles.containerStyle },
    _react2.default.createElement('img', { src: 'img/dummyimg.jpg', alt: '', style: styles.imgStyle })
  );
};

exports.default = ProfileImg;