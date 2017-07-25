'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

require('react-dropzone-component/styles/filepicker.css');

var _reactDropzone = require('react-dropzone-component/dist/react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _Avatar = require('./Avatar.jsx');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Spacer = require('./Spacer.jsx');

var _Spacer2 = _interopRequireDefault(_Spacer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// dropzone css

// import 'dropzone/dist/min/dropzone.css'
// dropzone component


// import ToolBar from './ToolBar.jsx'


var styles = {
  settingsBlock: {
    maxWidth: 250,
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
  },
  dropzone: {
    height: '150px',
    width: '100%',
    border: '2px solid #888',
    borderRadius: '5px'
  }
};

var ToggleExampleSimple = function ToggleExampleSimple() {
  return _react2.default.createElement(
    'div',
    { style: styles.settingsBlock },
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
      label: 'Disabled',
      disabled: true,
      style: styles.toggle
    }),
    _react2.default.createElement(_Toggle2.default, {
      label: 'Label on the right',
      labelPosition: 'right',
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
  );
};

var dropzoneConfig = {
  iconFiletypes: ['.jpg', '.jpeg', '.png', '.gif'],
  showFiletypeIcon: true,
  postUrl: '/uploadHandler'
};
var dropzoneJsConfig = {
  addRemoveLinks: true,
  params: {
    myParameter: "I'm a parameter!"
  }
};
var dropzoneEventHandlers = {
  // This one receives the dropzone object as the first parameter
  // and can be used to additional work with the dropzone.js
  // object
  init: null,
  // All of these receive the event as first parameter:
  drop: [], // callbackArray
  dragstart: null,
  dragend: null,
  dragenter: null,
  dragover: null,
  dragleave: null,
  // All of these receive the file as first parameter:
  addedfile: [], // simpleCallBack
  removedfile: null,
  thumbnail: null,
  error: null,
  processing: null,
  uploadprogress: null,
  sending: null,
  success: null,
  complete: null,
  canceled: null,
  maxfilesreached: null,
  maxfilesexceeded: null,
  // All of these receive a list of files as first parameter
  // and are only called if the uploadMultiple option
  // in djsConfig is true:
  processingmultiple: null,
  sendingmultiple: null,
  successmultiple: null,
  completemultiple: null,
  canceledmultiple: null,
  // Special Events
  totaluploadprogress: null,
  reset: null,
  queuecomplete: null
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
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Settings'
        ),
        _react2.default.createElement(_Avatar2.default, null),
        _react2.default.createElement(_reactDropzone2.default, {
          style: styles.dropzone,
          config: dropzoneConfig,
          eventHandlers: dropzoneEventHandlers,
          djsConfig: dropzoneJsConfig }),
        _react2.default.createElement(ToggleExampleSimple, null)
      );
    }
  }]);

  return Settings;
}(_react2.default.PureComponent);

exports.default = Settings;