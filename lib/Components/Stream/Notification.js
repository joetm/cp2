'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('material-ui/List');

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Subheader from 'material-ui/Subheader'

//import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'


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

var Notification = function (_React$PureComponent) {
  _inherits(Notification, _React$PureComponent);

  function Notification() {
    _classCallCheck(this, Notification);

    return _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).apply(this, arguments));
  }

  _createClass(Notification, [{
    key: 'render',
    value: function render() {
      var ListItemMenu = this.props.showMenu ? rightIconMenu : _react2.default.createElement('span', null);
      return _react2.default.createElement(_List.ListItem, {
        leftAvatar: this.props.avatar,
        rightIconButton: ListItemMenu,
        primaryText: this.props.primaryText,
        secondaryText: _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            { style: { color: _colors.darkBlack } },
            'Brendan Lim'
          ),
          ' --',
          this.props.secondaryText
        ),
        secondaryTextLines: 2
      });
    }
  }]);

  return Notification;
}(_react2.default.PureComponent);

exports.default = Notification;