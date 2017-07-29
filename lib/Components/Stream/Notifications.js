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

var _Notification = require('./Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _Spacer = require('../Spacer');

var _Spacer2 = _interopRequireDefault(_Spacer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notifications = function (_React$PureComponent) {
  _inherits(Notifications, _React$PureComponent);

  function Notifications() {
    _classCallCheck(this, Notifications);

    return _possibleConstructorReturn(this, (Notifications.__proto__ || Object.getPrototypeOf(Notifications)).apply(this, arguments));
  }

  _createClass(Notifications, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Notifications'
        ),
        _react2.default.createElement(
          _List.List,
          null,
          _react2.default.createElement(
            _Subheader2.default,
            null,
            'Today'
          ),
          _react2.default.createElement(_Notification2.default, {
            avatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            username: 'Gamel, John J.',
            primaryText: 'Brunch this weekend?',
            secondaryText: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?',
            secondaryTextLines: 2,
            showMenu: true
          }),
          _react2.default.createElement(_Notification2.default, {
            avatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            username: 'John G.',
            primaryText: 'Summer BBQ\xA0\xA0<span style={{color: lightBlack}}>4</span>',
            secondaryText: 'Wish I could come, but I\'m out of town this weekend.',
            secondaryTextLines: 2,
            showMenu: true
          }),
          _react2.default.createElement(_Notification2.default, {
            avatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            username: 'Joe More',
            primaryText: 'Oui oui',
            secondaryText: 'Do you have Paris recommendations? Have you ever been?',
            secondaryTextLines: 2,
            showMenu: true
          }),
          _react2.default.createElement(_Notification2.default, {
            avatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            username: 'Joe Doe',
            primaryText: 'Birdthday gift',
            secondaryText: 'Do you have any ideas what we can get Heidi for her birthday? How about a pony?',
            secondaryTextLines: 2,
            showMenu: true
          }),
          _react2.default.createElement(_Notification2.default, {
            avatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            username: 'John J.',
            primaryText: 'Recipe to try',
            secondaryText: 'We should eat this: grated squash. Corn and tomatillo tacos.',
            secondaryTextLines: 2,
            showMenu: true
          }),
          _react2.default.createElement(_Notification2.default, {
            avatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            username: 'Brendan Lim',
            primaryText: 'Me',
            secondaryText: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?',
            secondaryTextLines: 2,
            showMenu: true
          }),
          _react2.default.createElement(_Notification2.default, {
            avatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            username: 'me, Scott, Jennifer',
            primaryText: 'What?',
            secondaryText: 'Wish I could come, but I\'m out of town this weekend.',
            secondaryTextLines: 2,
            showMenu: true
          }),
          _react2.default.createElement(_Notification2.default, {
            avatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            username: 'Grace Ng',
            primaryText: 'Post Title?',
            secondaryText: 'Do you have any Paris recs? Have you ever been?',
            secondaryTextLines: 2,
            showMenu: true
          }),
          _react2.default.createElement(_Notification2.default, {
            avatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            username: 'Kerem Suer',
            primaryText: 'What\'s up?',
            secondaryText: 'Do you have any ideas what we can get Heidi for her birthday? How about a pony?',
            secondaryTextLines: 2,
            showMenu: true
          }),
          _react2.default.createElement(_Notification2.default, {
            avatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            username: 'Raquel Parrado',
            primaryText: 'Okay, then...',
            secondaryText: 'We should eat this: grated squash. Corn and tomatillo tacos.',
            secondaryTextLines: 2,
            showMenu: true
          })
        ),
        _react2.default.createElement(_Spacer2.default, null)
      );
    }
  }]);

  return Notifications;
}(_react2.default.PureComponent);

exports.default = Notifications;