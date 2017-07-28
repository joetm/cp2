'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _List = require('material-ui/List');

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _colors = require('material-ui/styles/colors');

require('@material/layout-grid/dist/mdc.layout-grid.css');

var _Notification = require('../Stream/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Material Component: Layout (Grid)
var boxStyle = {
	display: 'block'
};

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
					_react2.default.createElement(
						_Paper2.default,
						{ style: boxStyle, zDepth: 1 },
						_react2.default.createElement(
							_List.List,
							null,
							_react2.default.createElement(_Notification2.default, {
								leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
								primaryText: 'Raquel Parrado',
								secondaryText: _react2.default.createElement(
									'p',
									null,
									_react2.default.createElement(
										'span',
										{ style: { color: _colors.darkBlack } },
										'Recipe to try'
									),
									_react2.default.createElement('br', null),
									'We should eat this: grated squash. Corn and tomatillo tacos.'
								),
								secondaryTextLines: 2
							}),
							_react2.default.createElement(_Notification2.default, {
								leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
								primaryText: 'Raquel Parrado',
								secondaryText: _react2.default.createElement(
									'p',
									null,
									_react2.default.createElement(
										'span',
										{ style: { color: _colors.darkBlack } },
										'Recipe to try'
									),
									_react2.default.createElement('br', null),
									'We should eat this: grated squash. Corn and tomatillo tacos.'
								),
								secondaryTextLines: 2
							}),
							_react2.default.createElement(_Notification2.default, {
								leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
								primaryText: 'Raquel Parrado',
								secondaryText: _react2.default.createElement(
									'p',
									null,
									_react2.default.createElement(
										'span',
										{ style: { color: _colors.darkBlack } },
										'Recipe to try'
									),
									_react2.default.createElement('br', null),
									'We should eat this: grated squash. Corn and tomatillo tacos.'
								),
								secondaryTextLines: 2
							})
						)
					),
					_react2.default.createElement('br', null),
					_react2.default.createElement(_Divider2.default, null),
					_react2.default.createElement('br', null),
					_react2.default.createElement(
						_Paper2.default,
						{ style: boxStyle, zDepth: 1 },
						_react2.default.createElement(
							_List.List,
							null,
							_react2.default.createElement(_Notification2.default, {
								leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
								primaryText: 'Raquel Parrado',
								secondaryText: _react2.default.createElement(
									'p',
									null,
									_react2.default.createElement(
										'span',
										{ style: { color: _colors.darkBlack } },
										'Recipe to try'
									),
									_react2.default.createElement('br', null),
									'We should eat this: grated squash. Corn and tomatillo tacos.'
								),
								secondaryTextLines: 2
							}),
							_react2.default.createElement(_Notification2.default, {
								leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
								primaryText: 'Raquel Parrado',
								secondaryText: _react2.default.createElement(
									'p',
									null,
									_react2.default.createElement(
										'span',
										{ style: { color: _colors.darkBlack } },
										'Recipe to try'
									),
									_react2.default.createElement('br', null),
									'We should eat this: grated squash. Corn and tomatillo tacos.'
								),
								secondaryTextLines: 2
							}),
							_react2.default.createElement(_Notification2.default, {
								leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
								primaryText: 'Raquel Parrado',
								secondaryText: _react2.default.createElement(
									'p',
									null,
									_react2.default.createElement(
										'span',
										{ style: { color: _colors.darkBlack } },
										'Recipe to try'
									),
									_react2.default.createElement('br', null),
									'We should eat this: grated squash. Corn and tomatillo tacos.'
								),
								secondaryTextLines: 2
							})
						)
					),
					_react2.default.createElement('br', null),
					_react2.default.createElement(_Divider2.default, null),
					_react2.default.createElement('br', null),
					_react2.default.createElement(
						_Paper2.default,
						{ style: boxStyle, zDepth: 1 },
						_react2.default.createElement(
							_List.List,
							null,
							_react2.default.createElement(_Notification2.default, {
								leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
								primaryText: 'Raquel Parrado',
								secondaryText: _react2.default.createElement(
									'p',
									null,
									_react2.default.createElement(
										'span',
										{ style: { color: _colors.darkBlack } },
										'Recipe to try'
									),
									_react2.default.createElement('br', null),
									'We should eat this: grated squash. Corn and tomatillo tacos.'
								),
								secondaryTextLines: 2
							}),
							_react2.default.createElement(_Notification2.default, {
								leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
								primaryText: 'Raquel Parrado',
								secondaryText: _react2.default.createElement(
									'p',
									null,
									_react2.default.createElement(
										'span',
										{ style: { color: _colors.darkBlack } },
										'Recipe to try'
									),
									_react2.default.createElement('br', null),
									'We should eat this: grated squash. Corn and tomatillo tacos.'
								),
								secondaryTextLines: 2
							}),
							_react2.default.createElement(_Notification2.default, {
								leftAvatar: _react2.default.createElement(_Avatar2.default, { src: '/img/avatar/face.jpg' }),
								primaryText: 'Raquel Parrado',
								secondaryText: _react2.default.createElement(
									'p',
									null,
									_react2.default.createElement(
										'span',
										{ style: { color: _colors.darkBlack } },
										'Recipe to try'
									),
									_react2.default.createElement('br', null),
									'We should eat this: grated squash. Corn and tomatillo tacos.'
								),
								secondaryTextLines: 2
							})
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ 'class': 'mdc-layout-grid__cell mdc-layout-grid__cell--span-4  mdc-layout-grid__cell--span-2-tablet mdc-layout-grid__cell--span-4-phone' },
					_react2.default.createElement(
						_Paper2.default,
						{ style: boxStyle, zDepth: 1 },
						'activity stream'
					)
				)
			)
		)
	);
};

exports.default = Home;