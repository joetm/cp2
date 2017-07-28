'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _Updates = require('./Updates');

var _Updates2 = _interopRequireDefault(_Updates);

var _Likes = require('./Likes');

var _Likes2 = _interopRequireDefault(_Likes);

var _Notifications = require('./Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feed = function (_React$PureComponent) {
    _inherits(Feed, _React$PureComponent);

    function Feed() {
        _classCallCheck(this, Feed);

        return _possibleConstructorReturn(this, (Feed.__proto__ || Object.getPrototypeOf(Feed)).apply(this, arguments));
    }

    _createClass(Feed, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRouterDom.Switch,
                null,
                _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/notifications', component: _Notifications2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/updates', component: _Updates2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/likes', component: _Likes2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { component: _Updates2.default })
            );
        }
    }]);

    return Feed;
}(_react2.default.PureComponent);

exports.default = Feed;