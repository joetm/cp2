'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Posts = function Posts() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'ul',
      null,
      undefined.props.posts.map(function (post, i) {
        return _react2.default.createElement(
          'li',
          { key: i },
          post.title
        );
      })
    )
  );
};

exports.default = Posts;


Posts.propTypes = {
  posts: _propTypes2.default.array.isRequired
};