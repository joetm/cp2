'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSubMenu = toggleSubMenu;
exports.setVisibilityFilter = setVisibilityFilter;
/*
 * Redux action types
 */

var TOGGLE_SUBMENU = exports.TOGGLE_SUBMENU = Symbol('TOGGLE_SUBMENU');

var SET_VISIBILITY_FILTER = exports.SET_VISIBILITY_FILTER = Symbol('SET_VISIBILITY_FILTER');

var VisibilityFilters = exports.VisibilityFilters = {
  SHOW_ALL: Symbol('SHOW_ALL'),
  SHOW_COMPLETED: Symbol('SHOW_COMPLETED'),
  SHOW_ACTIVE: Symbol('SHOW_ACTIVE')
};

/*
 * Redux action creators
 */

function toggleSubMenu(bool) {
  return { type: TOGGLE_SUBMENU, bool: bool };
};

function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter: filter };
};