'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Post = require('./Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Posts = function Posts(props) {
    var posts = props.posts;

    return _react2.default.createElement(
        'div',
        null,
        posts.map(function (post, i) {
            return _react2.default.createElement(_Post2.default, { key: i, post: post });
        })
    );
};

exports.default = Posts;