'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Card = require('material-ui/Card');

var _colors = require('material-ui/styles/colors');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _thumbUp = require('material-ui/svg-icons/action/thumb-up');

var _thumbUp2 = _interopRequireDefault(_thumbUp);

var _favorite = require('material-ui/svg-icons/action/favorite');

var _favorite2 = _interopRequireDefault(_favorite);

var _chatBubbleOutline = require('material-ui/svg-icons/communication/chat-bubble-outline');

var _chatBubbleOutline2 = _interopRequireDefault(_chatBubbleOutline);

var _Button = require('./Button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionButtonsStyle = {
  float: 'right'
};

function navigateTo(arg) {
  // TODO
  console.log(arg);
}

var Update = function Update(props) {
  var id = props.id,
      fromUsername = props.fromUsername,
      primaryText = props.primaryText,
      secondaryText = props.secondaryText,
      datetime = props.datetime,
      gridColumnsFull = props.gridColumnsFull,
      gridColumnsTablet = props.gridColumnsTablet,
      gridColumnsPhone = props.gridColumnsPhone;

  return _react2.default.createElement(
    'div',
    {
      'class': 'mdc-layout-grid__cell mdc-layout-grid__cell--span-' + Math.floor(12 / gridColumnsFull) + ' mdc-layout-grid__cell--span-' + Math.floor(12 / gridColumnsTablet) + '-tablet mdc-layout-grid__cell--span-' + Math.floor(12 / gridColumnsPhone) + '-phone'
    },
    _react2.default.createElement(
      _Card.Card,
      {
        key: 'upd_' + id
      },
      _react2.default.createElement(_Card.CardHeader, {
        title: fromUsername,
        subtitle: 'Master Jedi',
        avatar: '/img/avatar/face.jpg',
        onClick: navigateTo.bind(undefined)
      }),
      _react2.default.createElement(
        _Card.CardMedia,
        {
          onClick: navigateTo.bind(undefined)
        },
        _react2.default.createElement('img', { src: '/img/dummyimg.jpg', alt: '' })
      ),
      _react2.default.createElement(_Card.CardTitle, {
        title: primaryText,
        subtitle: datetime.formattedTime,
        onClick: navigateTo.bind(undefined),
        actAsExpander: false,
        expandable: false
      }),
      _react2.default.createElement(
        _Card.CardText,
        { expandable: false, actAsExpander: false },
        secondaryText
      ),
      _react2.default.createElement(
        _Card.CardActions,
        null,
        _react2.default.createElement(_Button.LikeButton, { id: id, tooltip: 'Like', icon: _react2.default.createElement(_thumbUp2.default, null) }),
        _react2.default.createElement(_Button.FavoriteButton, { id: id, tooltip: 'Favorite', icon: _react2.default.createElement(_favorite2.default, null) }),
        _react2.default.createElement(_Button.CommentButton, { id: id, tooltip: 'Comment', icon: _react2.default.createElement(_chatBubbleOutline2.default, null) })
      )
    )
  );
};

exports.default = Update;