'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _Subheader = require('material-ui/Subheader');

var _Subheader2 = _interopRequireDefault(_Subheader);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _List = require('material-ui/List');

var _reactRouterDom = require('react-router-dom');

var _Avatar = require('../Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Spacer = require('../Spacer');

var _Spacer2 = _interopRequireDefault(_Spacer);

var _SettingsMenuEntry = require('./SettingsMenuEntry');

var _SettingsMenuEntry2 = _interopRequireDefault(_SettingsMenuEntry);

var _DropzoneAvatar = require('./DropzoneAvatar');

var _DropzoneAvatar2 = _interopRequireDefault(_DropzoneAvatar);

var _DropzoneProfileImg = require('./DropzoneProfileImg');

var _DropzoneProfileImg2 = _interopRequireDefault(_DropzoneProfileImg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var blockMaxWidth = '80%'; // 250

var styles = {
  settingsBlock: {
    //display: 'flex',
    //flexWrap: 'wrap',
    maxWidth: blockMaxWidth,
    margin: 'auto auto'
  },
  toggle: {
    marginBottom: 16
  },
  thumbOff: {
    backgroundColor: '#ffcccc'
  },
  trackOff: {
    backgroundColor: '#ff9d9d'
  },
  thumbSwitched: {
    backgroundColor: 'red'
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d'
  },
  labelStyle: {
    color: 'red'
  }
};

var PrivacySettings = function PrivacySettings(props) {
  return _react2.default.createElement(
    'div',
    { style: { textAlign: 'left' } },
    _react2.default.createElement(_Divider2.default, null),
    _react2.default.createElement(
      _List.List,
      null,
      _react2.default.createElement(
        _Subheader2.default,
        null,
        'Notifications'
      ),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Simple',
        style: styles.toggle
      }),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Toggled by default',
        defaultToggled: true,
        style: styles.toggle
      }),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Styling',
        thumbStyle: styles.thumbOff,
        trackStyle: styles.trackOff,
        thumbSwitchedStyle: styles.thumbSwitched,
        trackSwitchedStyle: styles.trackSwitched,
        labelStyle: styles.labelStyle
      })
    ),
    _react2.default.createElement(_Divider2.default, null),
    _react2.default.createElement(
      _List.List,
      null,
      _react2.default.createElement(
        _Subheader2.default,
        null,
        'XXXX'
      ),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Simple',
        style: styles.toggle
      }),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Toggled by default',
        defaultToggled: true,
        style: styles.toggle
      }),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Styling',
        thumbStyle: styles.thumbOff,
        trackStyle: styles.trackOff,
        thumbSwitchedStyle: styles.thumbSwitched,
        trackSwitchedStyle: styles.trackSwitched,
        labelStyle: styles.labelStyle
      })
    )
  );
};

var GeneralSettings = function GeneralSettings(props) {
  return _react2.default.createElement(
    'div',
    { style: { textAlign: 'left' } },
    _react2.default.createElement(_Divider2.default, null),
    _react2.default.createElement(
      _List.List,
      null,
      _react2.default.createElement(
        _Subheader2.default,
        null,
        'General'
      ),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Simple',
        style: styles.toggle
      }),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Toggled by default',
        defaultToggled: true,
        style: styles.toggle
      }),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Styling',
        thumbStyle: styles.thumbOff,
        trackStyle: styles.trackOff,
        thumbSwitchedStyle: styles.thumbSwitched,
        trackSwitchedStyle: styles.trackSwitched,
        labelStyle: styles.labelStyle
      }),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Simple',
        style: styles.toggle
      }),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Toggled by default',
        defaultToggled: true,
        style: styles.toggle
      }),
      _react2.default.createElement(_Toggle2.default, {
        label: 'Styling',
        thumbStyle: styles.thumbOff,
        trackStyle: styles.trackOff,
        thumbSwitchedStyle: styles.thumbSwitched,
        trackSwitchedStyle: styles.trackSwitched,
        labelStyle: styles.labelStyle
      })
    )
  );
};

var Settings = function (_React$PureComponent) {
  _inherits(Settings, _React$PureComponent);

  function Settings() {
    _classCallCheck(this, Settings);

    return _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).apply(this, arguments));
  }

  _createClass(Settings, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { textAlign: 'center' } },
        _react2.default.createElement(
          'h1',
          null,
          'Settings'
        ),
        _react2.default.createElement(
          'div',
          { style: styles.settingsBlock },
          _react2.default.createElement(
            _List.List,
            null,
            _react2.default.createElement(_SettingsMenuEntry2.default, {
              primaryText: 'General',
              secondaryText: 'General settings',
              url: '/general'
            }),
            _react2.default.createElement(_SettingsMenuEntry2.default, {
              primaryText: 'Profile photo',
              secondaryText: 'Change your profile photo',
              url: '/image'
            }),
            _react2.default.createElement(_SettingsMenuEntry2.default, {
              primaryText: 'Avatar',
              secondaryText: 'Change your avatar photo',
              url: '/avatar'
            }),
            _react2.default.createElement(_SettingsMenuEntry2.default, {
              primaryText: 'Privacy',
              secondaryText: 'Change your privacy settings',
              url: '/privacy'
            })
          ),
          _react2.default.createElement(_Spacer2.default, null),
          _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/general', component: GeneralSettings }),
            _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/image', component: _DropzoneProfileImg2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/avatar', component: _DropzoneAvatar2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: this.props.match.url + '/privacy', component: PrivacySettings })
          )
        ),
        _react2.default.createElement(_Spacer2.default, null)
      );
    }
  }]);

  return Settings;
}(_react2.default.PureComponent);

exports.default = Settings;