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

var Post = function Post(props) {
  var post = props.post;

  return _react2.default.createElement(_List.ListItem, {
    key: 'upd_' + post.id,
    leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
    primaryText: post.title,
    secondaryText: _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'span',
        { style: { color: _colors.darkBlack } },
        post.username
      ),
      '--',
      post.content
    ),
    secondaryTextLines: 2,
    autoGenerateNestedIndicator: true
  });
};

exports.default = Post;