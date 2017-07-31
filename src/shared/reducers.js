/*
 * Redux reducers
 */

import { combineReducers } from 'redux'
import { initialState } from './store'

import {
    FOLLOW_USER,
    REPLY_THREAD,
    COMMENT_PROFILE,
    TOGGLE_SITEMENU,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
} from './actions'


function feedFilter(state = initialState, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
              visibilityFilter: action.filter
            });
        case FILTER_ITEMS:
          return Object.assign({}, state, {
            feedItems: state.feedItems.map((project, index) => {
              if (index === action.index) {
                return Object.assign({}, feedItem, {
                  completed: !feedItem.completed
                });
              }
              return feedItem;
            })
          })
        default:
            return state;
    }
}

