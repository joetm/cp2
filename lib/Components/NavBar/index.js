'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Toolbar = require('material-ui/Toolbar');

var _colors = require('material-ui/styles/colors');

var _accountBalance = require('material-ui/svg-icons/action/account-balance');

var _accountBalance2 = _interopRequireDefault(_accountBalance);

var _group = require('material-ui/svg-icons/social/group');

var _group2 = _interopRequireDefault(_group);

var _mailOutline = require('material-ui/svg-icons/communication/mail-outline');

var _mailOutline2 = _interopRequireDefault(_mailOutline);

var _burstMode = require('material-ui/svg-icons/image/burst-mode');

var _burstMode2 = _interopRequireDefault(_burstMode);

var _permIdentity = require('material-ui/svg-icons/action/perm-identity');

var _permIdentity2 = _interopRequireDefault(_permIdentity);

var _settings = require('material-ui/svg-icons/action/settings');

var _settings2 = _interopRequireDefault(_settings);

var _exitToApp = require('material-ui/svg-icons/action/exit-to-app');

var _exitToApp2 = _interopRequireDefault(_exitToApp);

var _actions = require('../actions');

var _Avatar = require('../Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _CustomBadge = require('./CustomBadge');

var _CustomBadge2 = _interopRequireDefault(_CustomBadge);

var _RouterMenuItem = require('./RouterMenuItem');

var _RouterMenuItem2 = _interopRequireDefault(_RouterMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Popover from 'material-ui/Popover';
// --

// --


var styles = {
    navBarStyle: {
        // backgroundColor: '#fff',
        color: '#020202'
    },
    firstItem: {
        paddingLeft: '20px'
    },
    separator: {
        margin: 0,
        padding: '10px'
    }
};

var NavbarSeparator = function NavbarSeparator() {
    return _react2.default.createElement('div', { style: styles.separator });
};

// TODO
// class PopoverMenu extends React.PureComponent {
//   constructor(props) {
//     super(props)
//     this.state = {
//       open: false,
//     }
//   }
//   handleTouchTap = (event) => {
//     // This prevents ghost click.
//     event.preventDefault()
//     this.setState({
//       open: true,
//       anchorEl: event.currentTarget,
//     })
//   }
//   handleRequestClose = () => {
//     this.setState({
//       open: false,
//     })
//   }
//   render() {
//     return (
//       <div>
//         <RaisedButton
//           onTouchTap={this.handleTouchTap}
//           label="Click me"
//         />
//         <Popover
//           open={this.state.open}
//           anchorEl={this.state.anchorEl}
//           anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
//           targetOrigin={{horizontal: 'left', vertical: 'top'}}
//           onRequestClose={this.handleRequestClose}
//         >
//           <Menu>
//             <MenuItem primaryText="Refresh" />
//             <MenuItem primaryText="Help &amp; feedback" />
//             <MenuItem primaryText="Settings" />
//             <MenuItem primaryText="Sign out" />
//           </Menu>
//         </Popover>
//       </div>
//     )
//   }
// }


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
            activeBadge: 0
        }, _this.toggleState = function (num) {
            if (num.id) {
                num = num.id;
            } else if (!+num) {
                num = 0;
            }
            _this.setState({ activeBadge: num });
            // console.log('activeBadge', num)
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
                        _react2.default.createElement(
                            _IconButton2.default,
                            {
                                tooltip: 'Home',
                                style: styles.firstItem,
                                onTouchTap: this.toggleState,
                                iconStyle: { color: this.state.activeBadge === 0 ? 'red' : _colors.darkBlack }
                            },
                            _react2.default.createElement(_accountBalance2.default, null)
                        )
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/forum' },
                        _react2.default.createElement(_CustomBadge2.default, {
                            badgeContent: 123,
                            secondary: true,
                            badgeStyle: styles.badgeStyle,
                            style: styles.badgeRootStyle,
                            tooltip: 'New Forum Activity',
                            icon: _react2.default.createElement(_group2.default, null),
                            toggleState: this.toggleState,
                            id: 1,
                            active: this.state.activeBadge === 1
                        })
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/updates/notifications' },
                        _react2.default.createElement(_CustomBadge2.default, {
                            badgeContent: 10,
                            secondary: true,
                            badgeStyle: styles.badgeStyle,
                            style: styles.badgeRootStyle,
                            tooltip: 'Notifications',
                            icon: _react2.default.createElement(_mailOutline2.default, null),
                            toggleState: this.toggleState,
                            id: 2,
                            active: this.state.activeBadge === 2
                        })
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/updates' },
                        _react2.default.createElement(_CustomBadge2.default, {
                            badgeContent: 23,
                            secondary: true,
                            badgeStyle: styles.badgeStyle,
                            style: styles.badgeRootStyle,
                            tooltip: 'New Updates',
                            icon: _react2.default.createElement(_burstMode2.default, null),
                            toggleState: this.toggleState,
                            id: 3,
                            active: this.state.activeBadge === 3
                        })
                    )
                ),
                _react2.default.createElement(
                    _Toolbar.ToolbarGroup,
                    null,
                    _react2.default.createElement(
                        _IconMenu2.default,
                        {
                            iconButtonElement: _react2.default.createElement(
                                _IconButton2.default,
                                {
                                    id: 4,
                                    tooltip: 'Your Profile',
                                    iconStyle: { borderColor: this.state.activeBadge === 4 ? 'red' : _colors.darkBlack },
                                    onTouchTap: this.toggleState.bind(this)
                                },
                                _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg', mini: true })
                            )
                        },
                        _react2.default.createElement(_RouterMenuItem2.default, { url: '/profile', primaryText: 'Your Profile', icon: _react2.default.createElement(_permIdentity2.default, null) }),
                        _react2.default.createElement(_RouterMenuItem2.default, { url: '/settings', primaryText: 'Settings', icon: _react2.default.createElement(_settings2.default, null) }),
                        _react2.default.createElement(_Divider2.default, null),
                        _react2.default.createElement(_RouterMenuItem2.default, { url: '/logout', primaryText: 'Log Out', icon: _react2.default.createElement(_exitToApp2.default, null) })
                    )
                )
            );
        }
    }]);

    return NavBar;
}(_react2.default.PureComponent);

exports.default = NavBar;