'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Posts = require('./Posts');

var _Posts2 = _interopRequireDefault(_Posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO
//import configureStore from './configureStore'
//const store = configureStore()
// import {
//   selectSubreddit,
//   fetchPostsIfNeeded,
//   invalidateSubreddit
// } from './actions'


//DEV
var posts = [{
	id: 1,
	title: "Cars & Dinos",
	content: "Dinosaurs are like cars.",
	timestamp: 1501135362,
	username: "Joe",
	tags: ["cars", "thread-123"]
}, {
	id: 2,
	title: "Dinos & Cars",
	content: "Cars are like dinosaurs.",
	timestamp: 1501185342,
	username: "Moe",
	tags: ["dinosaurs", "thread-123"]
}];

// function mapStateToProps(state) {
//   const { selectedSubreddit, postsBySubreddit } = state
//   const {
//     isFetching,
//     lastUpdated,
//     items: posts
//   } = postsBySubreddit[selectedSubreddit] || {
//     isFetching: true,
//     items: []
//   }
//   return {
//     selectedSubreddit,
//     posts,
//     isFetching,
//     lastUpdated
//   }
// }


var ForumHome = function (_React$Component) {
	_inherits(ForumHome, _React$Component);

	function ForumHome() {
		_classCallCheck(this, ForumHome);

		return _possibleConstructorReturn(this, (ForumHome.__proto__ || Object.getPrototypeOf(ForumHome)).apply(this, arguments));
	}

	_createClass(ForumHome, [{
		key: 'render',

		// constructor(props) {
		//  super(props)
		//  this.handleChange = this.handleChange.bind(this)
		//  this.handleRefreshClick = this.handleRefreshClick.bind(this)
		// }
		// componentDidMount() {
		//  const { dispatch, selectedSubreddit } = this.props
		// 	dispatch(fetchPostsIfNeeded(selectedSubreddit))
		// }
		// componentDidUpdate(prevProps) {
		//  if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
		//    const { dispatch, selectedSubreddit } = this.props
		//    dispatch(fetchPostsIfNeeded(selectedSubreddit))
		//  }
		// }
		// handleChange(nextSubreddit) {
		//  this.props.dispatch(selectSubreddit(nextSubreddit))
		// 	this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
		// }
		// handleRefreshClick(e) {
		//  e.preventDefault()
		//  const { dispatch, selectedSubreddit } = this.props
		//  dispatch(invalidateSubreddit(selectedSubreddit))
		//  dispatch(fetchPostsIfNeeded(selectedSubreddit))
		// }

		//		    <Provider store={store}>
		//		    </Provider>

		value: function render() {
			// const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
			// const { isFetching } = this.props
			//			        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
			//			        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
			//style={{ opacity: isFetching ? 0.5 : 1 }}>
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					null,
					'Forum'
				),
				_react2.default.createElement(
					'div',
					null,
					posts.length > 0 && _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_Posts2.default, { posts: posts })
					)
				)
			);
		}
	}]);

	return ForumHome;
}(_react2.default.Component);

//export default connect(mapStateToProps)(ForumHome)


exports.default = ForumHome;