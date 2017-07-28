'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommentButton = exports.FavoriteButton = exports.LikeButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colors = require('material-ui/styles/colors');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iconButtonStyleHovered = {
    color: _colors.red400
};

var Button = function (_React$PureComponent) {
    _inherits(Button, _React$PureComponent);

    function Button(props) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this.state = {
            deactivated: false,
            active: false
        };
        _this.id = props.id;
        return _this;
    }

    _createClass(Button, [{
        key: 'toggleButtonState',
        value: function toggleButtonState() {
            this.setState({ active: !this.state.active });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                iconTooltip = _props.iconTooltip,
                icon = _props.icon;

            var iconButtonStyle = void 0;
            if (this.state.deactivated) {
                iconButtonStyle = {
                    color: _colors.grey400
                };
            } else if (this.state.active) {
                iconButtonStyle = {
                    color: _colors.red400
                };
            } else {
                iconButtonStyle = {
                    color: _colors.darkBlack
                };
            }
            return _react2.default.createElement(
                _IconButton2.default,
                {
                    tooltip: iconTooltip,
                    iconStyle: iconButtonStyle,
                    hoveredStyle: iconButtonStyleHovered,
                    onTouchTap: this.launchAction.bind(this)
                },
                icon
            );
        }
    }]);

    return Button;
}(_react2.default.PureComponent);

var LikeButton = exports.LikeButton = function (_Button) {
    _inherits(LikeButton, _Button);

    function LikeButton() {
        _classCallCheck(this, LikeButton);

        return _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).apply(this, arguments));
    }

    _createClass(LikeButton, [{
        key: 'launchAction',
        value: function launchAction() {
            console.log('like clicked', this);
            this.toggleButtonState();
        }
    }]);

    return LikeButton;
}(Button);

var FavoriteButton = exports.FavoriteButton = function (_Button2) {
    _inherits(FavoriteButton, _Button2);

    function FavoriteButton() {
        _classCallCheck(this, FavoriteButton);

        return _possibleConstructorReturn(this, (FavoriteButton.__proto__ || Object.getPrototypeOf(FavoriteButton)).apply(this, arguments));
    }

    _createClass(FavoriteButton, [{
        key: 'launchAction',
        value: function launchAction() {
            console.log('favorite clicked', this);
            this.toggleButtonState();
        }
    }]);

    return FavoriteButton;
}(Button);

var CommentButton = exports.CommentButton = function (_Button3) {
    _inherits(CommentButton, _Button3);

    function CommentButton() {
        _classCallCheck(this, CommentButton);

        return _possibleConstructorReturn(this, (CommentButton.__proto__ || Object.getPrototypeOf(CommentButton)).apply(this, arguments));
    }

    _createClass(CommentButton, [{
        key: 'launchAction',
        value: function launchAction() {
            console.log('comment clicked', this);
            this.toggleButtonState();
        }
    }]);

    return CommentButton;
}(Button);