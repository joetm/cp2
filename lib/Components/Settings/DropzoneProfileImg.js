'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../../../lib/dropzone/dist/dropzone.css');

require('react-dropzone-component/styles/filepicker.css');

var _reactDropzone = require('react-dropzone-component/dist/react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _dropzoneConfig = require('./dropzoneConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dropzone component

// dropzone css
var blockMaxWidth = '80%'; // 250

// react dropzone css


var styles = {
    dropzone: {
        height: '150px',
        width: '100%',
        border: '2px solid #888',
        borderRadius: '5px'
    }
};

var DropzoneProfileImg = function DropzoneProfileImg(props) {
    return _react2.default.createElement(
        'div',
        {
            id: 'profileImg-settings',
            style: {
                width: blockMaxWidth,
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: blockMaxWidth
            }
        },
        _react2.default.createElement('img', {
            src: '/img/dummyimg.jpg',
            style: {
                width: '100%',
                height: 'auto'
            }
        }),
        _react2.default.createElement(_reactDropzone2.default, {
            style: styles.dropzone,
            config: _dropzoneConfig.dropzoneConfig,
            eventHandlers: _dropzoneConfig.dropzoneEventHandlers,
            djsConfig: _dropzoneConfig.dropzoneJsConfig
        })
    );
};

exports.default = DropzoneProfileImg;