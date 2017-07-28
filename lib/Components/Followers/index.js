'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require('material-ui/List');

var _Subheader = require('material-ui/Subheader');

var _Subheader2 = _interopRequireDefault(_Subheader);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _chatBubble = require('material-ui/svg-icons/communication/chat-bubble');

var _chatBubble2 = _interopRequireDefault(_chatBubble);

var _colors = require('material-ui/styles/colors');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iconButtonElement = _react2.default.createElement(
  _IconButton2.default,
  {
    touch: true,
    tooltip: 'more',
    tooltipPosition: 'bottom-left'
  },
  _react2.default.createElement(_moreVert2.default, { color: _colors.grey400 })
);
var rightIconMenu = _react2.default.createElement(
  _IconMenu2.default,
  { iconButtonElement: iconButtonElement },
  _react2.default.createElement(
    _MenuItem2.default,
    null,
    'Reply'
  ),
  _react2.default.createElement(
    _MenuItem2.default,
    null,
    'Forward'
  ),
  _react2.default.createElement(
    _MenuItem2.default,
    null,
    'Delete'
  )
);

var Followers = function (_React$PureComponent) {
  _inherits(Followers, _React$PureComponent);

  function Followers() {
    _classCallCheck(this, Followers);

    return _possibleConstructorReturn(this, (Followers.__proto__ || Object.getPrototypeOf(Followers)).apply(this, arguments));
  }

  _createClass(Followers, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _List.List,
        null,
        _react2.default.createElement(_List.ListItem, {
          primaryText: 'Brendan Lim',
          leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
          rightIconButton: rightIconMenu
        }),
        _react2.default.createElement(_List.ListItem, {
          primaryText: 'Eric Hoffman',
          leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
          rightIconButton: rightIconMenu
        }),
        _react2.default.createElement(_List.ListItem, {
          primaryText: 'Grace Ng',
          leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
          rightIconButton: rightIconMenu
        }),
        _react2.default.createElement(_List.ListItem, {
          primaryText: 'Kerem Suer',
          leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
          rightIconButton: rightIconMenu
        }),
        _react2.default.createElement(_List.ListItem, {
          primaryText: 'Raquel Parrado',
          leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
          rightIconButton: rightIconMenu
        }),
        _react2.default.createElement(_List.ListItem, {
          primaryText: 'Chelsea Otakan',
          leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
          rightIconButton: rightIconMenu
        }),
        _react2.default.createElement(_List.ListItem, {
          primaryText: 'James Anderson',
          leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
          rightIconButton: rightIconMenu
        })
      );
    }
  }]);

  return Followers;
}(_react2.default.PureComponent);

exports.default = Followers;