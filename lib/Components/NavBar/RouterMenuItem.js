'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// {...props} gives a warning about unknown props on MenuItem
var RouterMenuItem = (0, _reactRouterDom.withRouter)(function (props) {
    var primaryText = props.primaryText,
        icon = props.icon;

    return _react2.default.createElement(_MenuItem2.default, {
        primaryText: primaryText,
        leftIcon: icon,
        onClick: function onClick() {
            props.history.push(props.url);
        }
    });
});
// fix to close the open menu on click
// see https://github.com/callemall/material-ui/issues/6105


RouterMenuItem.muiName = 'MenuItem';

exports.default = RouterMenuItem;