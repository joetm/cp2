'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _unfetch = require('unfetch');

var _unfetch2 = _interopRequireDefault(_unfetch);

var _reactRouterDom = require('react-router-dom');

var _NavBar = require('./NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _Home = require('./Home/');

var _Home2 = _interopRequireDefault(_Home);

var _Forum = require('./Forum/');

var _Forum2 = _interopRequireDefault(_Forum);

var _Notifications = require('./Stream/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

var _Stream = require('./Stream/');

var _Stream2 = _interopRequireDefault(_Stream);

var _Profile = require('./Profile/');

var _Profile2 = _interopRequireDefault(_Profile);

var _Settings = require('./Settings/');

var _Settings2 = _interopRequireDefault(_Settings);

var _Error = require('./Error/');

var _Error2 = _interopRequireDefault(_Error);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactTapEventPlugin2.default)();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

var customTheme = {
  palette: {
    primary1Color: _colors.pinkA200,
    primary2Color: _colors.cyan700,
    primary3Color: _colors.grey400
  }
};
var theme = (0, _getMuiTheme2.default)(customTheme);

var RoutedApp = function RoutedApp() {
  return _react2.default.createElement(
    _MuiThemeProvider2.default,
    { muiTheme: theme },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_NavBar2.default, null),
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Home2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/forum', component: _Forum2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/notifications', component: _Notifications2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/updates', component: _Stream2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/profile', component: _Profile2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/settings', component: _Settings2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { component: _Error2.default, code: '404' })
      )
    )
  );
};

exports.default = RoutedApp;