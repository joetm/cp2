'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('material-ui/List');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Subheader from 'material-ui/Subheader'
// import Divider from 'material-ui/Divider'


var SettingsMenuEntry = function (_React$PureComponent) {
  _inherits(SettingsMenuEntry, _React$PureComponent);

  function SettingsMenuEntry() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SettingsMenuEntry);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SettingsMenuEntry.__proto__ || Object.getPrototypeOf(SettingsMenuEntry)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selected: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SettingsMenuEntry, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      // {primaryText,secondaryText, match, history}
      return _react2.default.createElement(_List.ListItem, {
        primaryText: this.props.primaryText,
        secondaryText: this.props.secondaryText,
        onTouchTap: function onTouchTap() {
          _this2.setState({ selected: true });
          _this2.props.history.push(_this2.props.match.url + _this2.props.url);
        }
      });
    }
  }]);

  return SettingsMenuEntry;
}(_react2.default.PureComponent);

exports.default = (0, _reactRouterDom.withRouter)(SettingsMenuEntry);