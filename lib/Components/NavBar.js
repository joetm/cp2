'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('material-ui/svg-icons/action/settings');

var _settings2 = _interopRequireDefault(_settings);

var _Badge = require('material-ui/Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _notifications = require('material-ui/svg-icons/social/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Toolbar = require('material-ui/Toolbar');

var _accountBalance = require('material-ui/svg-icons/action/account-balance');

var _accountBalance2 = _interopRequireDefault(_accountBalance);

var _reactRouterDom = require('react-router-dom');

var _ExpandButton = require('./ExpandButton');

var _ExpandButton2 = _interopRequireDefault(_ExpandButton);

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
    navBarStyle: {
        // backgroundColor: '#fff',
        color: '#020202'
    },
    firstItem: {
        paddingLeft: '20px'
    }
};

var Notifications = function Notifications() {
    return _react2.default.createElement(
        _Badge2.default,
        {
            badgeContent: 10,
            secondary: true,
            badgeStyle: { top: 12, right: 12 }
        },
        _react2.default.createElement(
            _IconButton2.default,
            { tooltip: 'Notifications' },
            _react2.default.createElement(_notifications2.default, null)
        )
    );
};

var NavBar = function (_React$PureComponent) {
    _inherits(NavBar, _React$PureComponent);

    function NavBar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NavBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            value: 3
        }, _this.handleChange = function (event, index, value) {
            return _this.setState({ value: value });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NavBar, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _Toolbar.Toolbar,
                { style: styles.navBarStyle },
                _react2.default.createElement(
                    _Toolbar.ToolbarGroup,
                    { firstChild: true },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/' },
                        _react2.default.createElement(_accountBalance2.default, { style: styles.firstItem })
                    ),
                    _react2.default.createElement(_Toolbar.ToolbarSeparator, null),
                    _react2.default.createElement(Notifications, null)
                ),
                _react2.default.createElement(
                    _Toolbar.ToolbarGroup,
                    null,
                    _react2.default.createElement(_Toolbar.ToolbarTitle, { text: 'CP' })
                ),
                _react2.default.createElement(
                    _Toolbar.ToolbarGroup,
                    null,
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/profile' },
                        _react2.default.createElement(_Avatar2.default, { mini: true })
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/settings' },
                        _react2.default.createElement(_settings2.default, null)
                    )
                )
            );
        }
    }]);

    return NavBar;
}(_react2.default.PureComponent);

exports.default = NavBar;