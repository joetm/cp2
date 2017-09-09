
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
//     if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
//       return handlers[action.type](state, action)
//     } else {
//       return state
//     }
//   }
// }


/******************
 * Redux reducers *
 ******************/

/**
 * chatReducer
 * @returns chatState
 **/
export function chatReducer(chatState = initialState.chat, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_CHAT:
            return {...chatState, isFetching: false, items: [...action.response]}
        case ACTIONS.RECEIVE_CHAT_MSG:
            const copyitems = [...chatState.items]
            copyitems.push(action.response)
            return {...chatState, items: copyitems}
        default:
            return chatState
    }
}

/**
 * messageHistoryReducer
 * @returns msgHistState
 **/
export function messageHistoryReducer(msgHistState = initialState.messageHistory, action) {
    switch (action.type) {
        case ACTIONS.SEND_MESSAGE:
            const messageHistoryState = {...msgHistState}
            messageHistoryState.messages.push({
                type: "message",
                id: cuid(),
                title: null,
                content: action.msg.trim(),
                src: null,
                userid: action.currentUser.id,
                username: action.currentUser.username,
                avatar: action.currentUser.avatar,
                tags: [],
                threadid: null,
                timestamp: Math.round(Date.now() / 1000),
            })
            return messageHistoryState
        case ACTIONS.RECEIVE_MESSAGEHISTORY:
            return {...action.response}
        default:
            return msgHistState
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
            return {...reviewState, likes: reviewState.likes + increment}
        case ACTIONS.DISLIKE:
            return {...reviewState, dislikes: reviewState.dislikes + increment}
        case ACTIONS.REVIEW_APPROVE:
            return {...reviewState, approvals: reviewState.approvals + 1}
        case ACTIONS.REVIEW_DISAPPROVE:
            return {...reviewState, disapprovals: reviewState.disapprovals + 1}
        case ACTIONS.RECEIVE_REVIEWITEM:
            return {...action.response}
        default:
            return reviewState
    }
}

/**
 * updatesReducer
 * @returns updatesState
 **/
export function updatesReducer(updatesState = initialState.updates, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_UPDATES:
            return {...updatesState, isFetching: false, items: [...action.response]}
        default:
            return updatesState
    }
}

/**
 * notificationsReducer
 * @returns notificationState
 **/
export function notificationsReducer(notificationState = initialState.notifications, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_NOTIFICATIONS:
            return {...notificationState, isFetching: false, items: [...action.response]}
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
            return {...imagesState, isFetching: false, items: [...action.response]}
        case ACTIONS.RECEIVE_VERIFICATIONIMAGES:
            return {...imagesState, isFetching: false, items: [...action.response]}
        case ACTIONS.DELETE_IMAGES_STARTED:
            return {...imagesState, isFetching: true}
        case ACTIONS.DELETE_IMAGES_FAILURE:
            return {...imagesState, isFetching: false}
        case ACTIONS.DELETE_IMAGES_SUCCESS:
            const items = [...imagesState.items].filter(item => action.response.indexOf(item.id) < 0)
            return {...imagesState, isFetching: false, items}
        default:
            return imagesState
    }
}

/**
 * imageReducer
 * @returns imageState
 **/
export function imageReducer(imageState = initialState.image, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_IMAGE:
            return {...action.response}
        default:
            return imageState
    }
}

/**
 * videosReducer
 * @returns videosState
 **/
export function videosReducer(videosState = initialState.videos, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_VIDEOS:
            return {...videosState, isFetching: false, items: [...action.response]}
        default:
            return videosState
    }
}

/**
 * videoReducer
 * @returns videoState
 **/
export function videoReducer(videoState = initialState.video, action) {
    switch (action.type) {
        case ACTIONS.FETCH_VIDEO_STARTED:
            return { } // TODO
        case ACTIONS.RECEIVE_VIDEO:
            return {...action.response}
        default:
            return videoState
    }
}

/**
 * albumReducer
 * @returns albumState
 **/
export function albumReducer(albumState = initialState.album, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_ALBUM:
            return {...albumState, isFetching: false, items: [...action.response]}
        default:
            return albumState
    }
}

/**
 * favoritesReducer
 * @returns favoritesState
 **/
export function favoritesReducer(favoritesState = initialState.favorites, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_FAVORITES:
            return {...favoritesState, isFetching: false, items: [...action.response]}
        default:
            return favoritesState
    }
}

/**
 * likesReducer
 * @returns likesState
 **/
export function likesReducer(likesState = initialState.notifications, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_LIKES:
            return {...likesState, isFetching: false, items: [...action.response]}
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
            return {...action.response}
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
            return {...action.response}
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
            return {...postsState, isFetching: false, items: [...action.response]}
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
            return {...threadsState, isFetching: false, items: [...action.response]}
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
                isFetching: false,
                [action.response.id]: {...action.response}
            }
        case ACTIONS.RECEIVE_USERS:
            const ret = {...usersState, isFetching: false}
            Object.keys(action.response).forEach((id) => {
                ret[id] = {...action.response[id]}
            })
            return ret
        case ACTIONS.DELETE_AVATAR_SUCCESS:
            // remove the avatar from the respective user
            const copyState = {...usersState}
            if (Object.prototype.hasOwnProperty.call(copyState, action.userid)) {
                copyState[action.userid].avatar = null
            }
            console.log('copyState', copyState)
            return copyState
        default:
            return usersState
    }
}

/**
 * followersReducer
 * @returns state
 **/
export function followersReducer(followersState = initialState.followers, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_FOLLOWERS:
            return {...followersState, isFetching: false, items: [...action.response]}
        default:
            return followersState
    }
}

export function modReducer(modState = initialState.mod, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_CONTACT_REQUESTS:
            return {...modState, isFetching: false, contactRequests: [...action.response]}
        default:
            return modState
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
                userid: currentUserState.id,
                username: currentUserState.username,
                avatar: currentUserState.avatar,
            }
        case ACTIONS.GET_CURRENT_USER_ID:
            if (currentUserState.userid !== undefined) {
                return currentUserState.id
            }
            return null
        case ACTIONS.RECEIVE_CURRENT_USER:
            return { ...action.response }

        case ACTIONS.RECEIVE_UNREAD_COUNT:
            return { ...currentUserState,
                unreadPosts: action.response.posts,
                unreadImages: action.response.images,
                unreadVideos: action.response.videos,
                unreadMessages: action.response.messages,
                unreadLikes: action.response.likes,
            }

        case ACTIONS.MARK_IMAGES_READ:
            return {...currentUserState, unreadImages: 0}
        case ACTIONS.MARK_VIDEOS_READ:
            return {...currentUserState, unreadVideos: 0}
        case ACTIONS.MARK_POSTS_READ:
            return {...currentUserState, unreadPosts: 0}
        case ACTIONS.MARK_MESSAGES_READ:
            return {...currentUserState, unreadMessages: 0}
        case ACTIONS.MARK_LIKES_READ:
            return {...currentUserState, unreadLikes: 0}
        case ACTIONS.MARK_ALL_READ:
            return {...currentUserState, unreadImages: 0, unreadVideos: 0, unreadPosts: 0, unreadMessages: 0, unreadLikes: 0}

        // AUTH -------------------------------------
        case ACTIONS.SET_IS_AUTHENTICATING:
            return {...currentUserState, isAuthenticating: true}
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...currentUserState,
                ...{
                    isAuthenticating: false,
                    isAuthenticated: true,
                    token: action.token,
                    userid: jwtDecode(action.token).userid,
                    username: jwtDecode(action.token).username,
                    // 'act': jwtDecode(action.token).act,
                    statusText: 'You have been successfully logged in.',
                }
            }
        case ACTIONS.LOGIN_FAILURE:
            return {
                ...currentUserState,
                ...{
                    isAuthenticating: false,
                    isAuthenticated: false,
                    token: null,
                    userid: null,
                    username: null,
                    statusText: `Authentication Error: ${action.status} ${action.statusText}`
                }
            }
        case ACTIONS.LOGOUT:
            return {
                ...currentUserState,
                ...{
                    isAuthenticated: false,
                    token: null,
                    userid: null,
                    username: null,
                    statusText: 'You have been successfully logged out.',
                }
            }

        case ACTIONS.DELETE_AVATAR_SUCCESS:
            return {...currentUserState, avatar: null}
        case ACTIONS.DELETE_PROFILEIMG_SUCCESS:
            return {...currentUserState, profileimg: null}

        case ACTIONS.RECEIVE_SETTING:
            return {...currentUserState, ...action.payload}

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
            return {...appState, sidebarSearchOpen: true}
        case ACTIONS.CLOSE_SEARCH_SIDEBAR:
            return {...appState, sidebarSearchOpen: false}
        case ACTIONS.TOGGLE_SEARCH_SIDEBAR:
            return {...appState, sidebarSearchOpen: !appState.sidebarSearchOpen}
        case ACTIONS.OPEN_SIDEBAR:
            return {...appState, sidebarOpen: true}
        case ACTIONS.CLOSE_SIDEBAR:
            return {...appState, sidebarOpen: false}
        case ACTIONS.TOGGLE_SIDEBAR:
            return {...appState, sidebarOpen: !appState.sidebarOpen}
        // case ACTIONS.OPEN_STREAM_SIDEBAR:
        //     return {...appState, streamSidebarOpen: true}
        // case ACTIONS.CLOSE_STREAM_SIDEBAR:
        //     return {...appState, streamSidebarOpen: false}
        // case ACTIONS.TOGGLE_STREAM_SIDEBAR:
        //     return {...appState, streamSidebarOpen: !appState.streamSidebarOpen}
        case ACTIONS.SET_DEVICE_DETAILS:
            return {...appState, deviceDetails: action.obj}
        case ACTIONS.SET_ACTIVE_BADGE:
            return {...appState, activeBadge: +action.id}

        case ACTIONS.RECEIVE_COUNTRIES:
            return {...appState, countries: [...action.response]}
        case ACTIONS.RECEIVE_STATES:
            return {...appState, states: [...action.response]}
        case ACTIONS.RECEIVE_CITIES:
            return {...appState, cities: [...action.response]}

        default:
            return appState
    }
}
