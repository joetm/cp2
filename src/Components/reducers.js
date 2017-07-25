/*
 * Redux reducers
 */

import { combineReducers } from 'redux';

import { ADD_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';

// const { SHOW_ALL } = VisibilityFilters;

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    feedItems: []
};

function feedFilter(state = initialState, action) {
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
		          completed: !feedItem.completed // TODO
		        });
		      }
		      return feedItem;
		    })
		  })
        default:
            return state;
    }
}

