'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _src = require('src/');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Component', function () {
  var node = void 0;

  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    (0, _reactDom.unmountComponentAtNode)(node);
  });

  it('displays a welcome message', function () {
    (0, _reactDom.render)(_react2.default.createElement(_src2.default, null), node, function () {
      (0, _expect2.default)(node.innerHTML).toContain('Welcome to React components');
    });
  });
});