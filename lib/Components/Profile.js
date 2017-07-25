'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _ProfileImg = require('./ProfileImg');

var _ProfileImg2 = _interopRequireDefault(_ProfileImg);

var _ProfileStats = require('./ProfileStats');

var _ProfileStats2 = _interopRequireDefault(_ProfileStats);

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Album = require('./Album');

var _Album2 = _interopRequireDefault(_Album);

var _Spacer = require('./Spacer');

var _Spacer2 = _interopRequireDefault(_Spacer);

var _AjaxLoader = require('./AjaxLoader');

var _AjaxLoader2 = _interopRequireDefault(_AjaxLoader);

var _Followers = require('./Followers');

var _Followers2 = _interopRequireDefault(_Followers);

var _Likes = require('./Likes');

var _Likes2 = _interopRequireDefault(_Likes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import ToolBar from './ToolBar'


var Profile = function (_React$PureComponent) {
    _inherits(Profile, _React$PureComponent);

    function Profile() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Profile);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Profile.__proto__ || Object.getPrototypeOf(Profile)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            loading: true
        }, _this.serverRequest = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Profile, [{
        key: 'componentWillUnmount',


        // componentDidMount() {
        // 	//fetch the data
        //    this.serverRequest = fetch(URL)
        //    .then(r => r.json())
        //    .then((dinnermenu) => {
        //        console.log('dinnermenu.json', dinnermenu);
        //        this.setState({
        //            dinnermenu: dinnermenu.menu,
        //            loading: false
        //        });
        //    });
        // }

        // abort the running ajax request, if component is unmounted
        value: function componentWillUnmount() {
            if (this.serverRequest) {
                this.serverRequest.abort();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_ProfileImg2.default, null),
                _react2.default.createElement(_ProfileStats2.default, null),
                _react2.default.createElement(_Avatar2.default, { mini: false, offset: true }),
                _react2.default.createElement(_Spacer2.default, null),
                _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/updates', component: _Album2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/album', component: _Album2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/followers', component: _Followers2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/likes', component: _Likes2.default }),
                _react2.default.createElement(_Spacer2.default, null)
            );
        }
    }]);

    return Profile;
}(_react2.default.PureComponent);

exports.default = Profile;