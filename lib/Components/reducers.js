'use strict';

var _redux = require('redux');

var _actions = require('./actions');

// const { SHOW_ALL } = VisibilityFilters

/*
 * Redux reducers
 */

var initialState = {
    visibilityFilter: _actions.VisibilityFilters.SHOW_ALL,
    feedItems: []
};

function feedFilter() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _actions.SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            });
        case FILTER_ITEMS:
            return Object.assign({}, state, {
                feedItems: state.feedItems.map(function (project, index) {
                    if (index === action.index) {
                        return Object.assign({}, feedItem, {
                            completed: !feedItem.completed // TODO
                        });
                    }
                    return feedItem;
                })
            });
        default:
            return state;
    }
}