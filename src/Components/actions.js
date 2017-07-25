/*
 * Redux action types
 */

export const TOGGLE_SUBMENU = Symbol('TOGGLE_SUBMENU');

export const SET_VISIBILITY_FILTER = Symbol('SET_VISIBILITY_FILTER');

export const VisibilityFilters = {
  SHOW_ALL: Symbol('SHOW_ALL'),
  SHOW_COMPLETED: Symbol('SHOW_COMPLETED'),
  SHOW_ACTIVE: Symbol('SHOW_ACTIVE')
};

/*
 * Redux action creators
 */

export function toggleSubMenu(bool) {
    return {type: TOGGLE_SUBMENU, bool}
};

export function setVisibilityFilter(filter) {
    return {type: SET_VISIBILITY_FILTER, filter}
};
