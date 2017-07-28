'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfileImg = function ProfileImg(props) {
    var containerStyle = {
        width: '100%',
        height: '350px',
        textAlign: 'center',
        backgroundColor: '#808080',
        overflow: 'hidden',
        backgroundImage: 'url(' + props.src + ')',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
    };
    return _react2.default.createElement('div', { style: containerStyle });
};

exports.default = ProfileImg;