'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _simpleMasonryLayout = require('simple-masonry-layout');

var _simpleMasonryLayout2 = _interopRequireDefault(_simpleMasonryLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MasonryLayout = function (_React$Component) {
  _inherits(MasonryLayout, _React$Component);

  function MasonryLayout() {
    _classCallCheck(this, MasonryLayout);

    var _this = _possibleConstructorReturn(this, (MasonryLayout.__proto__ || Object.getPrototypeOf(MasonryLayout)).call(this));

    _this.displayName = 'MasonryLayout';
    return _this;
  }

  _createClass(MasonryLayout, [{
    key: 'calculateRectangles',


    /* Returns an array of rectangles which can be used to map to child elements */
    value: function calculateRectangles(options) {
      return _simpleMasonryLayout2.default.generateRectangles(options);
    }
  }, {
    key: 'render',
    value: function render() {
      var dimensions = _react2.default.Children.map(this.props.children, function (child, i) {
        return {
          width: child.props['original-width'],
          height: child.props['original-height']
        };
      });

      var rectangles = this.calculateRectangles(_extends({
        dimensions: dimensions
      }, this.props));

      var childNodes = _react2.default.Children.map(this.props.children, function (el, i) {
        var rectangle = rectangles[i];

        return _react2.default.cloneElement(el, _extends({
          key: i
        }, rectangle));
      });

      var height = 0;

      if (rectangles.length) {
        height = rectangles.map(function (r) {
          return r.height + r.y;
        }).sort(function (r1, r2) {
          return r2 - r1;
        })[0];
      }

      return _react2.default.createElement(
        'div',
        { ref: 'wrapper', style: { width: this.props.width + 'px', height: height + 'px', position: 'relative' } },
        childNodes
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        columns: _react2.default.PropTypes.number,
        width: _react2.default.PropTypes.number,
        gutter: _react2.default.PropTypes.number,
        gutterX: _react2.default.PropTypes.number,
        gutterY: _react2.default.PropTypes.number,
        maxHeight: _react2.default.PropTypes.number,
        collapsing: _react2.default.PropTypes.bool,
        customize: _react2.default.PropTypes.func,
        centering: _react2.default.PropTypes.bool
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        columns: 15,
        width: 980,
        gutter: 15,
        maxHeight: 0,
        collapsing: true,
        customize: null,
        centering: false
      };
    }
  }]);

  return MasonryLayout;
}(_react2.default.Component);

exports.default = MasonryLayout;