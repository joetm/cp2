'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function randomImgHeight() {
  return Math.floor(270 * Math.random()) + 30;
}

var styles = {
  albumImgContainerStyle: {
    width: '155px',
    overflow: 'hidden',
    float: 'left',
    margin: '10px 10px 0px 0px',
    padding: '10px 10px'
  }
};

var AlbumImg = function AlbumImg(props) {
  var albumImgStyle = _defineProperty({
    width: '150px',
    height: '150px',
    border: 0
  }, 'height', randomImgHeight() + 'px');
  // albumImgContainerStyle.height = imgHeight + 5 + 'px';
  return _react2.default.createElement(
    _Paper2.default,
    { zDepth: 1, style: styles.albumImgContainerStyle },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('img', { src: props.src, alt: '', style: albumImgStyle })
    ),
    'xxx'
  );
};

exports.default = AlbumImg;