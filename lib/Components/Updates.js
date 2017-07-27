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

// TODO
var Update = function Update(props) {
  return _react2.default.createElement(_List.ListItem, {
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
      ' --',
      props.secondaryText
    ),
    secondaryTextLines: 2
  });
};

var updatesList = {
  today: [{
    primaryText: "Brunch this weekend?",
    secondaryText: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
    fromUsername: "Brandan Lim"
  }, {
    primaryText: "Oui oui",
    secondaryText: "Do you have Paris recommendations? Have you ever been?",
    fromUsername: "Grace Ng"
  }, {
    primaryText: "Birdthday gift",
    secondaryText: "Do you have any ideas what we can get Heidi for her birthday? How about a pony?",
    fromUsername: "Kerem Suer"
  }, {
    primaryText: "Recipe to try",
    secondaryText: "We should eat this: grated squash. Corn and tomatillo tacos.",
    fromUsername: "Raquel Parrado"
  }],
  yesterday: []
};

var Updates = function (_React$PureComponent) {
  _inherits(Updates, _React$PureComponent);

  function Updates() {
    _classCallCheck(this, Updates);

    return _possibleConstructorReturn(this, (Updates.__proto__ || Object.getPrototypeOf(Updates)).apply(this, arguments));
  }

  _createClass(Updates, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _List.List,
          null,
          _react2.default.createElement(
            _Subheader2.default,
            null,
            'Today'
          ),
          updatesList.today.map(function (item) {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(Update, {
                primaryText: item.primaryText,
                secondaryText: item.secondaryText,
                fromUsername: item.fromUsername
              })
            );
          })
        ),
        _react2.default.createElement(_Divider2.default, null),
        _react2.default.createElement(
          _List.List,
          null,
          _react2.default.createElement(
            _Subheader2.default,
            null,
            'Yesterday'
          ),
          _react2.default.createElement(_List.ListItem, {
            leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            rightIconButton: rightIconMenu,
            primaryText: 'Brendan Lim',
            secondaryText: _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: { color: _colors.darkBlack } },
                'Brunch this weekend?'
              ),
              _react2.default.createElement('br', null),
              'I\'ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?'
            ),
            secondaryTextLines: 2
          }),
          _react2.default.createElement(_Divider2.default, { inset: true }),
          _react2.default.createElement(_List.ListItem, {
            leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            rightIconButton: rightIconMenu,
            primaryText: 'me, Scott, Jennifer',
            secondaryText: _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: { color: _colors.darkBlack } },
                'Summer BBQ'
              ),
              _react2.default.createElement('br', null),
              'Wish I could come, but I\'m out of town this weekend.'
            ),
            secondaryTextLines: 2
          }),
          _react2.default.createElement(_Divider2.default, { inset: true }),
          _react2.default.createElement(_List.ListItem, {
            leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            rightIconButton: rightIconMenu,
            primaryText: 'Grace Ng',
            secondaryText: _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: { color: _colors.darkBlack } },
                'Oui oui'
              ),
              _react2.default.createElement('br', null),
              'Do you have any Paris recs? Have you ever been?'
            ),
            secondaryTextLines: 2
          }),
          _react2.default.createElement(_Divider2.default, { inset: true }),
          _react2.default.createElement(_List.ListItem, {
            leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            rightIconButton: rightIconMenu,
            primaryText: 'Kerem Suer',
            secondaryText: _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: { color: _colors.darkBlack } },
                'Birthday gift'
              ),
              _react2.default.createElement('br', null),
              'Do you have any ideas what we can get Heidi for her birthday? How about a pony?'
            ),
            secondaryTextLines: 2
          }),
          _react2.default.createElement(_Divider2.default, { inset: true }),
          _react2.default.createElement(_List.ListItem, {
            leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
            rightIconButton: rightIconMenu,
            primaryText: 'Raquel Parrado',
            secondaryText: _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: { color: _colors.darkBlack } },
                'Recipe to try'
              ),
              _react2.default.createElement('br', null),
              'We should eat this: grated squash. Corn and tomatillo tacos.'
            ),
            secondaryTextLines: 2
          })
        )
      );
    }
  }]);

  return Updates;
}(_react2.default.PureComponent);

exports.default = Updates;