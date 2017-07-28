'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require('material-ui/List');

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Update = function Update(props) {
  return _react2.default.createElement(_List.ListItem, {
    key: 'upd_' + props.id,
    leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
    primaryText: props.primaryText,
    secondaryText: _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'span',
        { style: { color: _colors.darkBlack } },
        props.fromUsername
      ),
      '-- ',
      props.secondaryText
    ),
    secondaryTextLines: 2
  });
};

exports.default = Update;