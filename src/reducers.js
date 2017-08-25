
/**
 * Redux actions and reducers
 **/

import cuid from 'cuid'

import initialState from './initialState'
import * as ACTIONS from './actions'
import jwtDecode from 'jwt-decode'


// see http://redux.js.org/docs/recipes/ReducingBoilerplate.html
// function createReducer(initialState, handlers) {
//   return function reducer(state = initialState, action) {
//     if (handlers.hasOwnProperty(action.type)) {
//       return handlers[action.type](state, action)
//     } else {
//       return state
//     }
//   }
// }


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
        case ACTIONS.SEND_MESSAGE:
            const messageHistoryState = { ...chatState }
            messageHistoryState.messages.push({
                type: "message",
                id: cuid(),
                title: null,
                content: action.msg.trim(),
                src: null,
                userid: action.currentUser.userid,
                username: action.currentUser.username,
                avatar: action.currentUser.avatar,
                tags: [],
                threadid: null,
                timestamp: Math.round(Date.now() / 1000),
            })
            return messageHistoryState
        case ACTIONS.RECEIVE_MESSAGEHISTORY:
            return { ...action.response }
        default:
            return chatState
    }
}

/**
 * reviewReducer
 * @returns reviewState
 **/
export function reviewReducer(reviewState = initialState.reviewitem, action) {
    const increment = action.increment === undefined ? 1 : action.increment
    switch (action.type) {
        case ACTIONS.LIKE:
            return { ...reviewState, likes: reviewState.likes + increment }
        case ACTIONS.DISLIKE:
            return { ...reviewState, dislikes: reviewState.dislikes + increment }
        case ACTIONS.REVIEW_APPROVE:
            return { ...reviewState, approvals: reviewState.approvals + 1 }
        case ACTIONS.REVIEW_DISAPPROVE:
            return { ...reviewState, disapprovals: reviewState.disapprovals + 1 }
        case ACTIONS.RECEIVE_REVIEWITEM:
            return { ...action.response }
        default:
            return reviewState
    }
}

/**
 * streamReducer
 * @returns streamState
 **/
export function allReducer(streamState = initialState.all, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_UPDATES:
            return [ ...action.response ]
        default:
            return streamState
    }
}

/**
 * notificationsReducer
 * @returns notificationState
 **/
export function notificationsReducer(notificationState = initialState.notifications, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_NOTIFICATIONS:
            return [ ...action.response ]
        default:
            return notificationState
    }
}

/**
 * imagesReducer
 * @returns imagesState
 **/
export function imagesReducer(imagesState = initialState.images, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_IMAGES:
            return [ ...action.response ]
        default:
            return imagesState
    }
}

/**
 * videosReducer
 * @returns videosState
 **/
export function videosReducer(videosState = initialState.videos, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_VIDEOS:
            return [ ...action.response ]
        default:
            return videosState
    }
}

/**
 * albumReducer
 * @returns albumState
 **/
export function albumReducer(albumState = initialState.album, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_ALBUM:
            return [ ...action.response ]
        default:
            return albumState
    }
}

/**
 * likesReducer
 * @returns likesState
 **/
export function likesReducer(likesState = initialState.notifications, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_LIKES:
            return [ ...action.response ]
        default:
            return likesState
    }
}

/**
 * threadReducer
 * @returns threadState
 **/
export function threadReducer(threadState = initialState.thread, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_THREAD:
            return { ...action.response }
        default:
            return threadState
    }
}

/**
 * postReducer
 * @returns postState
 **/
export function postReducer(postState = initialState.post, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_POST:
            return { ...action.response }
        default:
            return postState
    }
}

/**
 * postsReducer
 * @returns postsState
 **/
export function postsReducer(postsState = initialState.posts, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_POSTS:
            return [ ...action.response ]
        default:
            return postsState
    }
}

/**
 * threadsReducer
 * @returns threadsState
 **/
export function threadsReducer(threadsState = initialState.threads, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_THREADS:
            return [ ...action.response ]
        default:
            return threadsState
    }
}

/**
 * userReducer
 * @returns state
 **/
export function userReducer(usersState = initialState.users, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_USER:
            return {
                ...usersState,
                [action.response.userid]: {...action.response}
            }
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
        case ACTIONS.GET_CURRENT_USER:
            return currentUserState
        case ACTIONS.GET_CURRENT_USER_MINIMAL:
            return {
                userid: currentUserState.userid,
                username: currentUserState.username,
                avatar: currentUserState.avatar,
            }
        case ACTIONS.GET_CURRENT_USER_ID:
            if (currentUserState.userid !== undefined) {
                return currentUserState.userid
            } else {
                return null
            }
        case ACTIONS.RECEIVE_CURRENT_USER:
            return { ...action.response }

        // AUTH
        case ACTIONS.LOGIN_REQUEST:
            return { ...currentUserState, {
                'isAuthenticating': true,
            }}
        case ACTIONS.LOGIN_SUCCESS:
            return { ...currentUserState, {
                'isAuthenticating': false,
                'isAuthenticated': true,
                'token': action.token,
                'userid': jwtDecode(action.token).userid,
                'username': jwtDecode(action.token).username,
                // 'act': jwtDecode(action.token).act,
                'statusText': 'You have been successfully logged in.',
            }}
        case ACTIONS.LOGIN_FAILURE:
            return { ...currentUserState, {
                'isAuthenticating': false,
                'isAuthenticated': false,
                'token': null,
                'userid': null,
                'username': null,
                'statusText': `Authentication Error: ${action.status} ${action.statusText}`
            }}
        case ACTIONS.LOGOUT:
            return { ...currentUserState, {
                'isAuthenticated': false,
                'token': null,
                'userid': null,
                'username': null,
                'statusText': 'You have been successfully logged out.',
            }}

        default:
            return currentUserState
    }
}

/**
 * cpAppReducer
 * @returns appState
 **/
export function cpAppReducer(appState = initialState.appState, action) {
    switch (action.type) {
        case ACTIONS.OPEN_SEARCH_SIDEBAR:
            return { ...appState, sidebarSearchOpen: true}
        case ACTIONS.CLOSE_SEARCH_SIDEBAR:
            return { ...appState, sidebarSearchOpen: false}
        case ACTIONS.TOGGLE_SEARCH_SIDEBAR:
            return { ...appState, sidebarSearchOpen: !appState.sidebarSearchOpen }
        case ACTIONS.OPEN_SIDEBAR:
            return { ...appState, sidebarOpen: true}
        case ACTIONS.CLOSE_SIDEBAR:
            return { ...appState, sidebarOpen: false}
        case ACTIONS.TOGGLE_SIDEBAR:
            return { ...appState, sidebarOpen: !appState.sidebarOpen }
        case ACTIONS.SET_DEVICE_DETAILS:
            return { ...appState, deviceDetails: action.obj }
        case ACTIONS.SET_ACTIVE_BADGE:
            return { ...appState, activeBadge: +action.id }
        case ACTIONS.RECEIVE_UNREAD_COUNT:
            return { ...appState, unread: action.response }
        // TODO - ajax loading msg
        // https://egghead.io/lessons/javascript-redux-displaying-loading-indicators
        // case ACTIONS.SET_FETCHING_STATUS:
        //     return { ...appState, isFetching: action.bool}
        default:
            return appState
    }
}
