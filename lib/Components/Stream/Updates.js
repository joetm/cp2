'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Subheader = require('material-ui/Subheader');

var _Subheader2 = _interopRequireDefault(_Subheader);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _colors = require('material-ui/styles/colors');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

require('@material/layout-grid/dist/mdc.layout-grid.css');

var _helpers = require('../helpers');

var _Update = require('./Update');

var _Update2 = _interopRequireDefault(_Update);

var _Spacer = require('../Spacer');

var _Spacer2 = _interopRequireDefault(_Spacer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Material Component: Layout (Grid)


var iconButtonElement = _react2.default.createElement(
    _IconButton2.default,
    {
        touch: true,
        tooltip: 'more',
        tooltipPosition: 'bottom-left'
    },
    _react2.default.createElement(_moreVert2.default, { color: _colors.grey400 })
);
var rightIconMenu = _react2.default.createElement(
    _IconMenu2.default,
    { iconButtonElement: iconButtonElement },
    _react2.default.createElement(
        _MenuItem2.default,
        null,
        'Reply'
    ),
    _react2.default.createElement(
        _MenuItem2.default,
        null,
        'Forward'
    ),
    _react2.default.createElement(
        _MenuItem2.default,
        null,
        'Delete'
    )
);

function translateDayOffset(offset) {
    var dayNames = ['Today', 'Yesterday'];
    if (!dayNames[offset]) {
        return offset + ' days ago';
    } else {
        return dayNames[offset];
    }
}

var updatesList = [{
    primaryText: "Brunch this weekend?",
    secondaryText: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
    fromUsername: "Brandan Lim",
    timestamp: 1501229377
}, {
    primaryText: "Oui oui",
    secondaryText: "Do you have Paris recommendations? Have you ever been?",
    fromUsername: "Grace Ng",
    timestamp: 1501229177
}, {
    primaryText: "Birdthday gift",
    secondaryText: "Do you have any ideas what we can get Heidi for her birthday? How about a pony?",
    fromUsername: "Kerem Suer",
    timestamp: 1501229077
}, {
    primaryText: "Recipe to try",
    secondaryText: "We should eat this: grated squash. Corn and tomatillo tacos.",
    fromUsername: "Raquel Parrado",
    timestamp: 1501220077
}, {
    primaryText: "Brunch this weekend?",
    secondaryText: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
    fromUsername: "Brandan Lim",
    timestamp: 1501200077
}, {
    primaryText: "Oui oui",
    secondaryText: "Do you have Paris recommendations? Have you ever been?",
    fromUsername: "Grace Ng",
    timestamp: 1501000077
}, {
    primaryText: "Birdthday gift",
    secondaryText: "Do you have any ideas what we can get Heidi for her birthday? How about a pony?",
    fromUsername: "Kerem Suer",
    timestamp: 1501000057
}, {
    primaryText: "Recipe to try",
    secondaryText: "We should eat this: grated squash. Corn and tomatillo tacos.",
    fromUsername: "Raquel Parrado",
    timestamp: 1500000057
}];

//    <Divider />
//      <Subheader>Yesterday</Subheader>

var Updates = function (_React$PureComponent) {
    _inherits(Updates, _React$PureComponent);

    function Updates() {
        _classCallCheck(this, Updates);

        return _possibleConstructorReturn(this, (Updates.__proto__ || Object.getPrototypeOf(Updates)).apply(this, arguments));
    }

    _createClass(Updates, [{
        key: 'categorize',
        value: function categorize(updatesList) {
            // console.log(updatesList)
            var annotatedList = updatesList.map(function (obj) {
                return (0, _helpers.classifyByDateAgo)(obj);
            });
            // console.log(annotatedList)
            var categorizedList = [];
            annotatedList.forEach(function (obj) {
                if (categorizedList[obj.daysAgo]) {
                    categorizedList[obj.daysAgo].push(obj);
                } else {
                    categorizedList[obj.daysAgo] = [obj];
                }
            });
            // console.log(categorizedList)
            return categorizedList;
        }
    }, {
        key: 'render',
        value: function render() {
            var categorizedUpdates = this.categorize(updatesList);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h2',
                    null,
                    'Updates'
                ),
                categorizedUpdates.map(function (group, daysAgo) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _Subheader2.default,
                            null,
                            translateDayOffset(daysAgo)
                        ),
                        _react2.default.createElement(_Divider2.default, null),
                        _react2.default.createElement(
                            'div',
                            { 'class': 'mdc-layout-grid' },
                            _react2.default.createElement(
                                'div',
                                { 'class': 'mdc-layout-grid__inner' },
                                group.map(function (item, i) {
                                    return _react2.default.createElement(_Update2.default, {
                                        id: i,
                                        primaryText: item.primaryText,
                                        secondaryText: item.secondaryText,
                                        fromUsername: item.fromUsername,
                                        datetime: (0, _helpers.humanRelativeDate)(item.timestamp),
                                        gridColumnsFull: 4,
                                        gridColumnsTablet: 3,
                                        gridColumnsPhone: 1
                                    });
                                })
                            )
                        )
                    );
                }),
                _react2.default.createElement(_Spacer2.default, null)
            );
        }
    }]);

    return Updates;
}(_react2.default.PureComponent);

exports.default = Updates;