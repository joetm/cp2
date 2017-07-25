'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var avatarStyleMini = {
  height: '30px',
  width: '30px',
  border: '2px solid #fff'
};
var avatarStyleMaxi = {
  height: '200px',
  width: '200px',
  border: '5px solid #fff'
};

var avatarOffset = {
  marginTop: '-150px',
  marginLeft: '50px'
};

var AvatarBubble = function AvatarBubble(props) {
  // avatar style
  var avatarStyle = {};
  if (props.mini === true) {
    avatarStyle = avatarStyleMini;
  } else {
    avatarStyle = avatarStyleMaxi;
  }
  // offset for profile
  // TODO - move this into profile
  if (props.offset === true) {
    avatarStyle.marginTop = avatarOffset.marginTop;
    avatarStyle.marginLeft = avatarOffset.marginLeft;
  } else {
    avatarStyle.marginTop = 0;
    avatarStyle.marginLeft = 0;
  }

  return _react2.default.createElement(_Avatar2.default, { style: avatarStyle, src: 'avatar/face.jpg' });
};

exports.default = AvatarBubble;