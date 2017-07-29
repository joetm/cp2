'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Badge = require('material-ui/Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  badgeRootStyle: {
    margin: 0,
    padding: '0px 10px'
  },
  badgeStyle: {
    top: -6,
    right: 0
  }
};

var CustomBadge = function (_React$PureComponent) {
  _inherits(CustomBadge, _React$PureComponent);

  function CustomBadge() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CustomBadge);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CustomBadge.__proto__ || Object.getPrototypeOf(CustomBadge)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      deactivated: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CustomBadge, [{
    key: 'toggleActive',
    value: function toggleActive() {
      this.props.toggleState(this.props.id);
    }
  }, {
    key: 'render',
    value: function render() {
      var IconColor = void 0;
      if (this.state.deactivated) {
        IconColor = { color: _colors.grey400 };
      } else if (this.props.active) {
        IconColor = { color: 'red' };
      } else {
        IconColor = { color: _colors.darkBlack };
      }
      return _react2.default.createElement(
        _Badge2.default,
        {
          badgeContent: this.props.badgeContent,
          secondary: true,
          badgeStyle: styles.badgeStyle,
          style: styles.badgeRootStyle
        },
        _react2.default.createElement(
          _IconButton2.default,
          {
            tooltip: this.props.tooltip,
            iconStyle: IconColor,
            onClick: this.toggleActive.bind(this),
            id: this.props.id
          },
          this.props.icon
        )
      );
    }
  }]);

  return CustomBadge;
}(_react2.default.PureComponent);

exports.default = CustomBadge;