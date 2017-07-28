'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('@material/layout-grid/dist/mdc.layout-grid.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			{ 'class': 'mdc-layout-grid' },
			_react2.default.createElement(
				'div',
				{ 'class': 'mdc-layout-grid__inner' },
				_react2.default.createElement(
					'div',
					{ 'class': 'mdc-layout-grid__cell mdc-layout-grid__cell--span-8 mdc-layout-grid__cell--span-6-tablet mdc-layout-grid__cell--span-4-phone' },
					'Main content'
				),
				_react2.default.createElement(
					'div',
					{ 'class': 'mdc-layout-grid__cell mdc-layout-grid__cell--span-4  mdc-layout-grid__cell--span-2-tablet mdc-layout-grid__cell--span-4-phone' },
					'wwwww'
				)
			)
		)
	);
};

// Material Component: Layout (Grid)
exports.default = Home;