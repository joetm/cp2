'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _configureStore = require('./configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _actions = require('./actions');

var _Posts = require('./Posts');

var _Posts2 = _interopRequireDefault(_Posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _configureStore2.default)();

function mapStateToProps(state) {
		var selectedSubreddit = state.selectedSubreddit,
		    postsBySubreddit = state.postsBySubreddit;

		var _ref = postsBySubreddit[selectedSubreddit] || {
				isFetching: true,
				items: []
		},
		    isFetching = _ref.isFetching,
		    lastUpdated = _ref.lastUpdated,
		    posts = _ref.items;

		return {
				selectedSubreddit: selectedSubreddit,
				posts: posts,
				isFetching: isFetching,
				lastUpdated: lastUpdated
		};
}

var ForumHome = function (_React$Component) {
		_inherits(ForumHome, _React$Component);

		function ForumHome(props) {
				_classCallCheck(this, ForumHome);

				var _this = _possibleConstructorReturn(this, (ForumHome.__proto__ || Object.getPrototypeOf(ForumHome)).call(this, props));

				_this.handleChange = _this.handleChange.bind(_this);
				_this.handleRefreshClick = _this.handleRefreshClick.bind(_this);
				return _this;
		}

		_createClass(ForumHome, [{
				key: 'componentDidMount',
				value: function componentDidMount() {
						var _props = this.props,
						    dispatch = _props.dispatch,
						    selectedSubreddit = _props.selectedSubreddit;

						dispatch((0, _actions.fetchPostsIfNeeded)(selectedSubreddit));
				}
		}, {
				key: 'componentDidUpdate',
				value: function componentDidUpdate(prevProps) {
						if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
								var _props2 = this.props,
								    dispatch = _props2.dispatch,
								    selectedSubreddit = _props2.selectedSubreddit;

								dispatch((0, _actions.fetchPostsIfNeeded)(selectedSubreddit));
						}
				}
		}, {
				key: 'handleChange',
				value: function handleChange(nextSubreddit) {
						this.props.dispatch((0, _actions.selectSubreddit)(nextSubreddit));
						this.props.dispatch((0, _actions.fetchPostsIfNeeded)(nextSubreddit));
				}
		}, {
				key: 'handleRefreshClick',
				value: function handleRefreshClick(e) {
						e.preventDefault();
						var _props3 = this.props,
						    dispatch = _props3.dispatch,
						    selectedSubreddit = _props3.selectedSubreddit;

						dispatch((0, _actions.invalidateSubreddit)(selectedSubreddit));
						dispatch((0, _actions.fetchPostsIfNeeded)(selectedSubreddit));
				}
		}, {
				key: 'render',
				value: function render() {
						var _props4 = this.props,
						    selectedSubreddit = _props4.selectedSubreddit,
						    posts = _props4.posts,
						    isFetching = _props4.isFetching,
						    lastUpdated = _props4.lastUpdated;

						return _react2.default.createElement(
								_reactRedux.Provider,
								{ store: store },
								_react2.default.createElement(
										'h2',
										null,
										'Forum'
								),
								_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(
												'p',
												null,
												lastUpdated && _react2.default.createElement(
														'span',
														null,
														'Last updated at ',
														new Date(lastUpdated).toLocaleTimeString(),
														'.',
														' '
												),
												!isFetching && _react2.default.createElement(
														'a',
														{ href: '#', onClick: this.handleRefreshClick },
														'Refresh'
												)
										),
										isFetching && posts.length === 0 && _react2.default.createElement(
												'h2',
												null,
												'Loading...'
										),
										!isFetching && posts.length === 0 && _react2.default.createElement(
												'h2',
												null,
												'Empty.'
										),
										posts.length > 0 && _react2.default.createElement(
												'div',
												{ style: { opacity: isFetching ? 0.5 : 1 } },
												_react2.default.createElement(_Posts2.default, { posts: posts })
										)
								)
						);
				}
		}]);

		return ForumHome;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ForumHome);


ForumHome.propTypes = {
		selectedSubreddit: _propTypes2.default.string.isRequired,
		posts: _propTypes2.default.array.isRequired,
		isFetching: _propTypes2.default.bool.isRequired,
		lastUpdated: _propTypes2.default.number,
		dispatch: _propTypes2.default.func.isRequired
};