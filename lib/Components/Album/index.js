'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _src = require('../External/react-simple-masonry/src/');

var _src2 = _interopRequireDefault(_src);

var _block = require('../External/react-simple-masonry/src/block');

var _block2 = _interopRequireDefault(_block);

var _AlbumImg = require('./AlbumImg');

var _AlbumImg2 = _interopRequireDefault(_AlbumImg);

var _AjaxLoader = require('../AjaxLoader');

var _AjaxLoader2 = _interopRequireDefault(_AjaxLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function randomImgHeight() {
    return Math.floor(270 * Math.random()) + 30;
}

// Array of images with captions
// const dummyImgs = [
//   {caption: 'x1', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x2', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x3', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x4', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x5', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x6', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x7', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x8', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
//   {caption: 'x9', imageHeight: randomImgHeight(), imageWidth:'200', source: '/img/dummyimg.jpg'},
// ]


var Album = function (_PureComponent) {
    _inherits(Album, _PureComponent);

    function Album() {
        _classCallCheck(this, Album);

        return _possibleConstructorReturn(this, (Album.__proto__ || Object.getPrototypeOf(Album)).apply(this, arguments));
    }

    _createClass(Album, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                width: document.body.clientWidth
            });
            this.onresizeListener = this.onResize.bind(this);
            window.addEventListener('resize', this.onresizeListener);
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            this.setState({
                width: document.body.clientWidth
            });
        }
    }, {
        key: 'customizeRectangles',
        value: function customizeRectangles(rectangle, i, allRectangles, options) {
            var dimension = options.dimensions[i];
            if (dimension.width < rectangle.width) {
                rectangle.height += 180;
            }
            return rectangle;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _src2.default,
                        {
                            width: this.state.width,
                            columns: 4,
                            gutterX: 20,
                            gutterY: 20,
                            maxHeight: 550,
                            collapsing: true,
                            customize: this.customizeRectangles,
                            centering: true
                        },
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 300, 'original-height': 900 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 750 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 850 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 850 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 300, 'original-height': 900 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 750 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 850 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 850 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        ),
                        _react2.default.createElement(
                            _block2.default,
                            { 'original-width': 500, 'original-height': 1000 },
                            _react2.default.createElement(_AlbumImg2.default, { src: '/img/dummyimg.jpg' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_AjaxLoader2.default, null)
                )
            );
        }
    }]);

    return Album;
}(_react.PureComponent);

exports.default = Album;