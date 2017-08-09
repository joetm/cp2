/*
 * Redux reducers
 */

import { combineReducers } from 'redux'

import { initialState } from '../store'

import {
    FOLLOW_USER,
    REPLY_THREAD,
    COMMENT_PROFILE,
    LOAD_POST,
    EDIT_POST,
    REMOVE_POST,
    TOGGLE_SIDEBAR,
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR,
} from '../actions'


function forumApp(state = initialState, action) {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return Object.assign({}, state, { sidebarOpen: true })
        case CLOSE_SIDEBAR:
            return Object.assign({}, state, { sidebarOpen: false })
        case TOGGLE_SIDEBAR:
            return Object.assign({}, state, { sidebarOpen: !this.state.sidebarOpen })
        default:
            return state
    }
}


