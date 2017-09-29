
/**
 * Redux actions and reducers
 **/

import cuid from 'cuid'
import { handle } from 'redux-pack'

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
// {
//     "ACTION_TYPE": (state, action) => {
//     }
// }


/******************
 * Redux reducers *
 ******************/

/**
 * chatReducer
 * @returns chatState
 **/
export function chatReducer(chatState = initialState.chat, action) {
    const { type, payload } = action
    switch (type) {
        // receiving all chat messages
        case ACTIONS.FETCH_CHAT:
          return handle(chatState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
        // fill the chat state with the current user details
        case ACTIONS.RECEIVE_CURRENT_USER:
            const currentUser = {
                id: action.response.id,
                username: action.response.username,
                avatar: action.response.avatar,
            }
            return {...chatState, user: currentUser}
        // receive a chat message after sending by oneself
        case ACTIONS.RECEIVE_CHAT_MSG:
            const newChatMsgs = [...chatState.items]
            newChatMsgs.push({
                ...action.response,
                user: {...chatState.user}, // user expansion
            })
            return {...chatState, items: newChatMsgs}
        case ACTIONS.DELETE_MSG_SUCCESS:
            const chatMsgIndex = chatState.items.findIndex(msg => { return msg.id === action.id })
            return {
                ...chatState,
                items: [
                    ...chatState.items.slice(0, chatMsgIndex),
                    ...chatState.items.slice(chatMsgIndex + 1)
                ]
            }
        default:
          return chatState
    }
}

/**
 * messageHistoryReducer
 * @returns msgHistState
 **/
export function messageHistoryReducer(msgHistState = initialState.messageHistory, action) {
    const { type, payload } = action
    switch (type) {
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
        case ACTIONS.FETCH_MESSAGEHISTORY:
          return handle(msgHistState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: () => ({ ...payload }),
          })
        default:
          return msgHistState
    }
}

/**
 * reviewReducer
 * @returns reviewState
 **/
export function reviewReducer(reviewState = initialState.reviewitem, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_REVIEWITEM:
          return handle(reviewState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, ...payload }),
          })
        case ACTIONS.REVIEW_APPROVE:
            return {...reviewState, approvals: reviewState.approvals + 1}
        case ACTIONS.REVIEW_DISAPPROVE:
            return {...reviewState, disapprovals: reviewState.disapprovals + 1}
        case ACTIONS.RECEIVE_LIKE:
            return {...reviewState, likes: action.payload.likes}
        case ACTIONS.RECEIVE_DISLIKE:
            return {...reviewState, dislikes: action.payload.dislikes}
        default:
          return reviewState
    }
}

/**
 * reviewLeaderboardReducer
 * @returns reviewLeaderboardState
 **/
export function reviewLeaderboardReducer(reviewLeaderboardState = initialState.reviewLeaderboard, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_REVIEWLEADERBOARD:
          return handle(reviewLeaderboardState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
        default:
          return reviewLeaderboardState
    }
}

/**
 * updatesReducer
 * @returns updatesState
 **/
export function updatesReducer(updatesState = initialState.updates, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_UPDATES:
          return handle(updatesState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
        default:
          return updatesState
    }
}

/**
 * messagesReducer
 * @returns messagesState
 **/
export function messagesReducer(messagesState = initialState.messages, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_MESSAGES:
          return handle(messagesState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: [...payload] }),
          })
        default:
          return messagesState
    }
}

/**
 * imageReducer
 * @returns imageState
 **/
export function imageReducer(imageState = initialState.images, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_PICTURE:
          return handle(imageState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, [payload.id]: {...payload} }),
          })
        case ACTIONS.FETCH_IMAGES:
            return {...imageState, isFetching: false, items: [...action.payload]}
        case ACTIONS.FETCH_PROFILEIMAGES:
            return {...imageState, isFetching: false, items: [...action.payload]}
        case ACTIONS.FETCH_VERIFICATIONIMAGES:
            return {...imageState, isFetching: false, items: [...action.payload]}
        case ACTIONS.DELETE_IMAGES_STARTED:
            return {...imageState, isFetching: true}
        case ACTIONS.DELETE_IMAGES_FAILURE:
            return {...imageState, isFetching: false}
        case ACTIONS.DELETE_IMAGES_SUCCESS:
            const items = [...imageState.items].filter(item => action.response.indexOf(item.id) < 0)
            return {...imageState, isFetching: false, items}
        default:
          return imageState
    }
}

/**
 * videosReducer
 * @returns videosState
 **/
export function videosReducer(videosState = initialState.videos, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_MESSAGES:
          return handle(videosState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: [...payload] }),
          })
        default:
          return videosState
    }
}

/**
 * videoReducer (redux-pack)
 * @returns videoState
 **/
export function videoReducer(videoState = initialState.video, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_VIDEO:
          return handle(videoState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, [payload.id]: payload }),
          })
        default:
          return videoState
    }
}

/**
 * albumReducer
 * @returns albumState
 **/
export function albumReducer(albumState = initialState.album, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_ALBUM:
          return handle(albumState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
        default:
          return albumState
    }
}

/**
 * favoritesReducer
 * @returns favoritesState
 **/
export function favoritesReducer(favoritesState = initialState.favorites, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_FAVORITES:
          return handle(favoritesState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
        default:
          return favoritesState
    }
}

/**
 * likesReducer
 * @returns likesState
 **/
export function likesReducer(likesState = initialState.likes, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_LIKES:
          return handle(likesState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
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
        case ACTIONS.FETCH_THREAD:
            return {...threadState, ...action.payload, isFetching: false}
        case ACTIONS.FETCH_POSTS_FOR_THREAD_STARTED:
            return {...threadState, isFetching: true}
        case ACTIONS.RECEIVE_POSTS_FOR_THREAD:
            return {...threadState, items: [...action.response], isFetching: false}
        case ACTIONS.FETCH_POSTS_FOR_THREAD_FAILURE:
            return {...threadState, isFetching: false}
        default:
            return threadState
    }
}

/**
 * postReducer
 * @returns postState
 **/
export function postReducer(postState = initialState.post, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_POST:
          return handle(postState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, [payload.id]: payload }),
          })
        default:
          return postState
    }
}

/**
 * postsReducer
 * @returns postsState
 **/
export function postsReducer(postsState = initialState.posts, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_POSTS:
          return handle(postsState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
        default:
          return postsState
    }
}

/**
 * threadsReducer
 * @returns threadsState
 **/
// TODO
export function threadsReducer(threadsState = initialState.threads, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_THREADS:
          return handle(threadsState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
        default:
          return threadsState
    }
}

/**
 * categoriesReducer
 * @returns categoriesState
 **/
export function categoriesReducer(categoriesState = initialState.categories, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_CATEGORIES:
          return handle(categoriesState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
        default:
          return categoriesState
    }
}

/**
 * categoryReducer
 * @returns categoryState
 **/
export function categoryReducer(categoryState = initialState.category, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_CATEGORY:
          return handle(categoryState, action, {
            start: prevState => ({...prevState, isFetching: true, error: null}),
            finish: prevState => ({...prevState, isFetching: false}),
            failure: prevState => ({...prevState, error: payload}),
            success: prevState => ({...prevState, ...payload}),
          })
        case ACTIONS.FETCH_CATEGORY_THREADS:
            return {...categoryState, isFetching: false, threads: [...payload]}
        default:
          return categoryState
    }
}

/**
 * userReducer
 * @returns state
 **/
export function userReducer(usersState = initialState.users, action) {
    switch (action.type) {
        case ACTIONS.FETCH_USER:
            return { ...usersState, isFetching: false, [action.payload.id]: {...action.payload} }
        case ACTIONS.FETCH_USERS:
            const ret = {...usersState, isFetching: false}
            Object.keys(action.payload).forEach((id) => {
                ret[id] = {...action.payload[id]}
            })
            return ret

        case ACTIONS.DELETE_AVATAR_SUCCESS:
            // remove the avatar from the respective user
            const usersAvCopy = {...usersState}
            if (Object.prototype.hasOwnProperty.call(usersAvCopy, `${action.userid}`)) {
                usersAvCopy[`${action.userid}`].avatar = null
            }
            console.log('usersAvCopy', usersAvCopy)
            return {...usersAvCopy, isFetching: false}

        case ACTIONS.DELETE_PROFILEIMG_SUCCESS:
            // remove the profile image from the respective user
            const usersPICopy = {...usersState}
            if (Object.prototype.hasOwnProperty.call(usersPICopy, `${action.userid}`)) {
                usersPICopy[`${action.userid}`].profileimg = null
            }
            return {...usersPICopy, isFetching: false}

        default:
            return usersState
    }
}

/**
 * followersReducer
 * @returns state
 **/
export function followersReducer(followersState = initialState.followers, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_FOLLOWERS:
          return handle(followersState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
        default:
          return followersState
    }
}

/**
 * onlineReducer
 * @returns state
 **/
export function onlineReducer(onlineState = initialState.online, action) {
    switch (action.type) {
        case ACTIONS.RECEIVE_ONLINE_USERS:
            return {...onlineState, isFetching: false, users: [...action.response]}
        default:
            return onlineState
    }
}

export function modReducer(modState = initialState.mod, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_MOD_ITEMS:
          return handle(modState, action, {
            start: prevState => ({ ...prevState, isFetching: true, error: null }),
            finish: prevState => ({ ...prevState, isFetching: false }),
            failure: prevState => ({ ...prevState, error: payload }),
            success: prevState => ({ ...prevState, items: payload }),
          })
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
        case ACTIONS.GET_CURRENT_USER_ID:
            if (currentUserState.userid !== undefined) {
                return currentUserState.id
            }
            return null
        case ACTIONS.GET_THEME:
            return currentUserState.theme
        case ACTIONS.FETCH_CURRENT_USER:
            return { ...action.payload }

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
        // AUTH -------------------------------------

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
