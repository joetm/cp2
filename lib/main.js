'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouterDom = require('react-router-dom');

require('./default.scss');

var _App = require('./Components/App.jsx');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(
	_reactRouterDom.BrowserRouter,
	null,
	_react2.default.createElement(_App2.default, null)
), document.getElementById('app'));