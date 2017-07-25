'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tabs = require('material-ui/Tabs');

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _photo = require('material-ui/svg-icons/image/photo');

var _photo2 = _interopRequireDefault(_photo);

var _chatBubbleOutline = require('material-ui/svg-icons/communication/chat-bubble-outline');

var _chatBubbleOutline2 = _interopRequireDefault(_chatBubbleOutline);

var _contacts = require('material-ui/svg-icons/communication/contacts');

var _contacts2 = _interopRequireDefault(_contacts);

var _thumbUp = require('material-ui/svg-icons/action/thumb-up');

var _thumbUp2 = _interopRequireDefault(_thumbUp);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _reactRouterDom = require('react-router-dom');

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    statBarStyle: {
        backgroundColor: _colors.pinkA200
    },
    tabsStyle: {
        paddingLeft: '300px'
    },
    inkBarStyle: {
        backgroundColor: 'yellow'
    },
    statStyle: {
        marginTop: '0.4em'
    },
    statTitleStyle: {
        fontSize: '0.6em',
        lineHeight: '0.6em',
        marginBottom: '0.4em'
    },
    statValueStyle: {
        color: '#fff',
        fontSize: '1em',
        lineHeight: '1em',
        marginTop: '0.2em',
        marginBottom: '0.2em'
    },
    followButtonContainerStyle: {
        width: '200px',
        margin: 'auto auto'
    },
    followButtonStyle: {
        backgroundColor: '#fff',
        color: '#000'
    },
    linkStyle: {
        textDecoration: 'none',
        color: '#fff'
    }
};
//import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';


var StatText = function StatText(props) {
    return _react2.default.createElement(
        'div',
        { style: styles.statStyle },
        _react2.default.createElement(
            'div',
            { style: styles.statTitleStyle },
            props.title
        ),
        _react2.default.createElement(
            'div',
            { style: styles.statValueStyle },
            props.value
        )
    );
};

var ProfileStats = function ProfileStats() {
    return _react2.default.createElement(
        'div',
        { style: styles.statBarStyle },
        _react2.default.createElement(
            _Tabs.Tabs,
            { style: styles.tabsStyle, initialSelectedIndex: 1, inkBarStyle: styles.inkBarStyle },
            _react2.default.createElement(_Tabs.Tab, {
                icon: _react2.default.createElement(_chatBubbleOutline2.default, null),
                label: _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/profile/updates', style: styles.linkStyle },
                    _react2.default.createElement(StatText, { title: 'Posts', value: '45' })
                )
            }),
            _react2.default.createElement(_Tabs.Tab, {
                icon: _react2.default.createElement(_photo2.default, null),
                label: _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/profile/album', style: styles.linkStyle },
                    _react2.default.createElement(StatText, { title: 'Pics', value: '234' })
                )
            }),
            _react2.default.createElement(_Tabs.Tab, {
                icon: _react2.default.createElement(_contacts2.default, null),
                label: _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/profile/followers', style: styles.linkStyle },
                    _react2.default.createElement(StatText, { title: 'Followers', value: '99' })
                )
            }),
            _react2.default.createElement(_Tabs.Tab, {
                icon: _react2.default.createElement(_thumbUp2.default, null),
                label: _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/profile/likes', style: styles.linkStyle },
                    _react2.default.createElement(StatText, { title: 'Likes', value: '23' })
                )
            }),
            _react2.default.createElement(_Tabs.Tab, {
                label: 'Follow'
            })
        )
    );
};

exports.default = ProfileStats;