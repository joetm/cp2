'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  avatarStyleMini: {
    height: '30px',
    width: '30px',
    marginTop: '-5px',
    marginLeft: '-5px',
    border: '2px solid #fff'
  },
  avatarStyleMaxi: {
    height: '200px',
    width: '200px',
    border: '5px solid #fff'
  }
};

var AvatarBubble = function AvatarBubble(props) {
  // avatar size
  var avatarStyle = {};
  if (props.mini === true) {
    avatarStyle = styles.avatarStyleMini;
  } else {
    avatarStyle = styles.avatarStyleMaxi;
  }
  return _react2.default.createElement(_Avatar2.default, {
    style: avatarStyle,
    src: props.src
  });
};

exports.default = AvatarBubble;