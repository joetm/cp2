'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://gist.github.com/yamadayuki/f1ea9ccacad7f1c140457b5877fb54cc

var injectStyle = function injectStyle(style) {
  var styleElement = document.createElement('style');
  var styleSheet = null;

  document.head.appendChild(styleElement);

  styleSheet = styleElement.sheet;

  styleSheet.insertRule(style, styleSheet.cssRules.length);
};

exports.default = injectStyle;