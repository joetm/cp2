
/**
 * Redux actions
 **/

import fetch from 'unfetch'
import { combineReducers } from 'redux'

// import initialState from './initialState'
import initialState from './mockState'
// console.log('initialState', initialState)


/*
 * Redux action types
 */

export const COMMENT_PROFILE   = 'PROFILE::COMMENT_PROFILE'
export const REPLY_THREAD      = 'FORUM::REPLY_THREAD'
export const LOAD_POST         = 'FORUM::LOAD_POST'
export const EDIT_POST         = 'FORUM::EDIT_POST'
export const REMOVE_POST       = 'FORUM::REMOVE_POST'
export const TOGGLE_SIDEBAR    = 'FORUM::TOGGLE_SIDEBAR'
export const OPEN_SIDEBAR      = 'FORUM::OPEN_SIDEBAR'
export const CLOSE_SIDEBAR     = 'FORUM::CLOSE_SIDEBAR'
export const MARK_THREAD_READ  = 'FORUM::MARK_THREAD_READ'
export const MARK_POST_READ    = 'FORUM::MARK_POST_READ'
export const MARK_ALL_READ     = 'FORUM::MARK_ALL_READ'
export const SELECT_THREAD     = 'FORUM::SELECT_THREAD'
export const SEND_MESSAGE      = 'CHAT::SEND_MESSAGE'
export const REVIEW_APPROVE    = 'REVIEW::APPROVE'
export const REVIEW_DISAPPROVE = 'REVIEW::DISAPPROVE'
export const LIKE              = 'SOCIAL::LIKE'
export const DISLIKE           = 'SOCIAL::DISLIKE'
export const FOLLOW_USER       = 'SOCIAL::FOLLOW_USER'
       const UNKNOWN           = 'APP::UNKNOWN'


/*
 * Function to reduce redux boilerplate code
 * See: http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 */
function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}


/**
 * Redux action creators
 **/

// user facing actions
export const followUser       = makeActionCreator(FOLLOW_USER,       'userid')
export const replyThread      = makeActionCreator(REPLY_THREAD,      'threadid')
export const commentProfile   = makeActionCreator(COMMENT_PROFILE,   'userid')
export const toggleSidebar    = makeActionCreator(TOGGLE_SIDEBAR)
export const closeSidebar     = makeActionCreator(CLOSE_SIDEBAR)
export const openSidebar      = makeActionCreator(OPEN_SIDEBAR)
export const like             = makeActionCreator(LIKE,              'itemid')
export const dislike          = makeActionCreator(DISLIKE,           'itemid')
export const reviewApprove    = makeActionCreator(REVIEW_APPROVE,    'itemid')
export const reviewDisapprove = makeActionCreator(REVIEW_DISAPPROVE, 'itemid')

// forum actions
export const loadPost         = makeActionCreator(LOAD_POST,         'postid', 'response')
export const editPost         = makeActionCreator(EDIT_POST,         'postid', 'response')
export const removePost       = makeActionCreator(REMOVE_POST,       'postid', 'bool')
export const selectThread     = makeActionCreator(SELECT_THREAD,     'threadid')

export const markThreadRead   = makeActionCreator(MARK_THREAD_READ,  'threadid')
export const markPostRead     = makeActionCreator(MARK_POST_READ,    'threadid')
export const markAllRead      = makeActionCreator(MARK_ALL_READ,     'threadid')

const unknownAction = { type: UNKNOWN }


/**
 * Redux wiring
 **/

export function mapStateToProps(state) {
    return { app: state.app }
}

/**
 * Redux reducers
 **/

export function cpApp(state = initialState, action = unknownAction) {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return {...state, sidebarOpen: true}
        case CLOSE_SIDEBAR:
            return {...state, sidebarOpen: false}
        case TOGGLE_SIDEBAR:
            return {...state, sidebarOpen: !state.sidebarOpen}
        default:
            return state
    }
}
