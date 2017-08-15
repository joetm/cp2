
/**
 * Redux actions and reducers
 **/

import initialState from './initialState'
import * as api from './api'


/*
 * Redux action types
 */

export const COMMENT_PROFILE          = 'PROFILE::COMMENT_PROFILE'
export const GET_USER                 = 'USER::GET_USER'
export const GET_CURRENT_USER         = 'USER::GET_CURRENT_USER'
export const GET_CURRENT_USER_MINIMAL = 'USER::GET_CURRENT_USER_MINIMAL'
export const REPLY_THREAD             = 'FORUM::REPLY_THREAD'
export const GET_POSTS                = 'FORUM::GET_POSTS'
export const GET_POST                 = 'FORUM::GET_POST'
export const GET_THREAD               = 'FORUM::GET_THREAD'
export const EDIT_POST                = 'FORUM::EDIT_POST'
export const REMOVE_POST              = 'FORUM::REMOVE_POST'
export const TOGGLE_SIDEBAR           = 'FORUM::TOGGLE_SIDEBAR'
export const OPEN_SIDEBAR             = 'FORUM::OPEN_SIDEBAR'
export const CLOSE_SIDEBAR            = 'FORUM::CLOSE_SIDEBAR'
export const MARK_THREAD_READ         = 'FORUM::MARK_THREAD_READ'
export const MARK_POST_READ           = 'FORUM::MARK_POST_READ'
export const MARK_ALL_READ            = 'FORUM::MARK_ALL_READ'
export const SELECT_THREAD            = 'FORUM::SELECT_THREAD'
export const SEND_MESSAGE             = 'CHAT::SEND_MESSAGE'
export const REVIEW_APPROVE           = 'REVIEW::APPROVE'
export const REVIEW_DISAPPROVE        = 'REVIEW::DISAPPROVE'
export const LIKE                     = 'SOCIAL::LIKE'
export const DISLIKE                  = 'SOCIAL::DISLIKE'
export const FOLLOW_USER              = 'SOCIAL::FOLLOW_USER'
export const SET_ACTIVE_BADGE         = 'NAV::SET_ACTIVE_BADGE'
export const GET_UPDATES              = 'STREAM::GET_UPDATES'
export const SET_DEVICE_DETAILS       = 'APP::SET_DEVICE_DETAILS'

       const RECEIVE_USER             = 'USER::RECEIVE_USER'
       const RECEIVE_COMMENTS         = 'PROFILE::RECEIVE_COMMENTS'
       const RECEIVE_POSTS            = 'FORUM::RECEIVE_POSTS'
       const RECEIVE_POST             = 'FORUM::RECEIVE_POST'
       const RECEIVE_THREAD           = 'FORUM::RECEIVE_THREAD'
       const RECEIVE_REVIEWITEM       = 'REVIEW::RECEIVE_REVIEWITEM'
       const RECEIVE_CURRENT_USER     = 'USER:RECEIVE_CURRENT_USER'
//     const UNKNOWN                  = 'APP::UNKNOWN'


/**
 * Function to reduce redux boilerplate code
 * See: http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 * @returns action
 **/
function makeActionCreator(type, ...argNames) {
  return function (...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}


// ----------------------------------------------------
// Redux action creators
// ----------------------------------------------------

export const getUser               = makeActionCreator(GET_USER,          'userid')
export const getCurrentUser        = makeActionCreator(GET_CURRENT_USER)
export const getCurrentUserMinimal = makeActionCreator(GET_CURRENT_USER_MINIMAL)
export const followUser            = makeActionCreator(FOLLOW_USER,       'userid')
export const replyThread           = makeActionCreator(REPLY_THREAD,      'threadid')
export const commentProfile        = makeActionCreator(COMMENT_PROFILE,   'userid')
export const toggleSidebar         = makeActionCreator(TOGGLE_SIDEBAR)
export const closeSidebar          = makeActionCreator(CLOSE_SIDEBAR)
export const openSidebar           = makeActionCreator(OPEN_SIDEBAR)
export const like                  = makeActionCreator(LIKE,              'itemid')
export const dislike               = makeActionCreator(DISLIKE,           'itemid')
export const reviewApprove         = makeActionCreator(REVIEW_APPROVE,    'itemid')
export const reviewDisapprove      = makeActionCreator(REVIEW_DISAPPROVE, 'itemid')
export const sendMessage           = makeActionCreator(SEND_MESSAGE,      'toUserid', 'msg')

// forum actions
export const getPosts              = makeActionCreator(GET_POSTS)
export const getPost               = makeActionCreator(GET_POST,          'postid', 'response')
export const getThread             = makeActionCreator(GET_THREAD,        'threadid', 'response')
export const editPost              = makeActionCreator(EDIT_POST,         'postid', 'response')
export const removePost            = makeActionCreator(REMOVE_POST,       'postid', 'bool')
export const selectThread          = makeActionCreator(SELECT_THREAD,     'threadid')
export const markThreadRead        = makeActionCreator(MARK_THREAD_READ,  'threadid')
export const markPostRead          = makeActionCreator(MARK_POST_READ,    'threadid')
export const markAllRead           = makeActionCreator(MARK_ALL_READ,     'threadid')
export const getUpdates            = makeActionCreator(GET_UPDATES)

// other app actions
export const setActiveBadge        = makeActionCreator(SET_ACTIVE_BADGE,   'id')
export const setDeviceDetails      = makeActionCreator(SET_DEVICE_DETAILS, 'obj')

// ajax receptors
       const receiveCurrentUser    = makeActionCreator(RECEIVE_CURRENT_USER, 'response')
       const receiveUser           = makeActionCreator(RECEIVE_USER,         'response')
       const receiveComments       = makeActionCreator(RECEIVE_COMMENTS,     'response')
       const receivePosts          = makeActionCreator(RECEIVE_POSTS,        'response')
       const receivePost           = makeActionCreator(RECEIVE_POST,         'response')
       const receiveThread         = makeActionCreator(RECEIVE_THREAD,       'response')
       const receiveReviewItem     = makeActionCreator(RECEIVE_REVIEWITEM,   'response')

// const unknownAction = { type: UNKNOWN }


// ----------------------------------------------------
// Asynchronous action creators
// ----------------------------------------------------

/**
 * fetchCurrentUser Asynchronous Action Creator
 * @returns receiveCurrentUser() - Action
 */
export const fetchCurrentUser = () =>
    api.fetchCurrentUser().then(receiveCurrentUser)

/**
 * fetchUser Asynchronous Action Creator
 * @returns receiveUser() - Action
 */
export const fetchUser = (userid) =>
    api.fetchUser(userid).then(receiveUser)

/**
 * fetchReviewItem Asynchronous Action Creator
 * @returns receiveReviewItem() - Action
 */
export const fetchReviewItem = () =>
    api.fetchReviewItem().then(receiveReviewItem)

/**
 * fetchPosts Asynchronous Action Creator
 * @returns receivePosts() - Action
 */
export const fetchPosts = () =>
    api.fetchPosts().then(receivePosts)

// ----------------------------------------------------


/**
 * Merges the application state into the properties of the connected components under the key `store`
 **/
// export const mapStateToProps = (state) => ({
//     store: state.app
// })

/**
 * Redux reducers
 **/

/**
 * chatReducer
 * @returns chatState
 **/
export function chatReducer(chatState = initialState.messageHistory, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            // TODO: structure of state.messageHistory
            const messageHistoryState = { ...chatState }
            messageHistoryState.messages.push({
                msg: action.msg.trim(),
                username: 'me',
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                timestamp: Math.round(Date.now() / 1000),
            })
            return messageHistoryState
        default:
            return chatState
    }
}

/**
 * reviewReducer
 * @returns reviewState
 **/
export function reviewReducer(reviewState = initialState.reviewitem, action) {
    switch (action.type) {
        case REVIEW_APPROVE:
            return { ...reviewState, approvals: reviewState.approvals + 1 }
        case REVIEW_DISAPPROVE:
            return { ...reviewState, disapprovals: reviewState.disapprovals + 1 }
        case RECEIVE_REVIEWITEM:
            return { ...action.response }
        default:
            return reviewState
    }
}

/**
 * navBarReducer
 * @returns navBarState
 **/
export function navBarReducer(navBarState = initialState.navbar, action) {
    switch (action.type) {
        case SET_ACTIVE_BADGE:
            return { ...navBarState, activeBadge: +action.id }
        default:
            return navBarState
    }
}

/**
 * streamReducer
 * @returns updatesState
 **/
export function streamReducer(updatesState = initialState.updates, action) {
    switch (action.type) {
        case GET_UPDATES:
            // TODO

            return updatesState
        default:
            return updatesState
    }
}

/**
 * userReducer
 * @returns state
 **/
export function userReducer(usersState = initialState.users, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return { ...usersState, [action.userid]: {...action.response} }
        default:
            return usersState
    }
}

/**
 * currentUserReducer
 * @returns state
 **/
export function currentUserReducer(currentUserState = initialState.currentUser, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return currentUserState
        case GET_CURRENT_USER_MINIMAL:
            return {
                userid: state.currentUser.userid,
                username: state.currentUser.username,
                avatar: state.currentUser.avatar,
            }
        case RECEIVE_CURRENT_USER:
            return { ...action.response }
        default:
            return currentUserState
    }
}

/**
 * forumReducer
 * @returns forumState
 **/
export function forumReducer(forumState = initialState.posts, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return action.response
        default:
            return forumState
    }
}

/**
 * cpAppReducer
 * @returns appState
 **/
export function cpAppReducer(appState = initialState.appState, action) {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return { ...appState, sidebarOpen: true}
        case CLOSE_SIDEBAR:
            return { ...appState, sidebarOpen: false}
        case TOGGLE_SIDEBAR:
            return { ...appState, sidebarOpen: !appState.sidebarOpen }
        case SET_DEVICE_DETAILS:
            return { ...appState, deviceDetails: action.obj }
        default:
            return appState
    }
}
