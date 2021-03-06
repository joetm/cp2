
/**
 * Redux Reducers
 **/

import cuid from 'cuid'
import { handle } from 'redux-pack'

import initialState from './initialState'
import * as ACTIONS from './actions'
// import jwtDecode from 'jwt-decode'


/**
 * chatReducer
 * @returns chatState
 **/
export function chatReducer(chatState = initialState.chat, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_CHAT:
      return handle(chatState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    case ACTIONS.RECEIVE_CURRENT_USER:
      const currentUser = {
        id: payload.id,
        username: payload.username,
        avatar: payload.avatar,
      }
      return {...chatState, user: currentUser}
    case ACTIONS.SEND_CHAT_MSG:
      return handle(chatState, action, {
        // start: prevState => ({ ...prevState, isFetching: true, error: null }),
        // finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({
          ...prevState,
          items: [...chatState.items].concat({
            ...payload,
            user: {...chatState.user}, // user expansion with the current user details
          })
        }),
      })
    case ACTIONS.DELETE_CHAT_MSG:
      return handle(chatState, action, {
        // start: prevState => ({ ...prevState, isDeleting: true, error: null }),
        // finish: prevState => ({ ...prevState, isDeleting: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => {
          const chatMsgIndex = prevState.items.findIndex(msg => msg.id === payload.id)
          return ({
            ...prevState,
            items: [
              ...prevState.items.slice(0, chatMsgIndex),
              ...prevState.items.slice(chatMsgIndex + 1)
            ]
          })
        },
      })
    // Synchronous actions
    // -----------------------------------------------
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
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.SEND_MESSAGE: // TODO
      return {
        ...msgHistState,
        messages: msgHistState.messages.concat({ // concat is state-safe
          type: "message",
          id: cuid(),
          title: null,
          content: payload.msg.trim(),
          src: null,
          userid: payload.userid,
          username: payload.username,
          avatar: payload.avatar,
          tags: [],
          threadid: null,
          timestamp: Math.round(Date.now() / 1000),
        })
      }
    case ACTIONS.FETCH_MESSAGEHISTORY:
      return handle(msgHistState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: () => ({ ...payload }),
      })
    // Synchronous actions
    // -----------------------------------------------
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
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_REVIEWITEM:
      return handle(reviewState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, ...payload }),
      })
    case ACTIONS.REVIEW_APPROVE:
      return handle(reviewState, action, {
        start: prevState => ({ ...prevState, isSaving: true, error: null }),
        finish: prevState => ({ ...prevState, isSaving: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, approvals: prevState.approvals + 1 }),
      })
    case ACTIONS.REVIEW_DISAPPROVE:
      return handle(reviewState, action, {
        start: prevState => ({ ...prevState, isSaving: true, error: null }),
        finish: prevState => ({ ...prevState, isSaving: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, disapprovals: prevState.disapprovals + 1 }),
      })
    case ACTIONS.RECEIVE_LIKE:
      return handle(reviewState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, likes: payload.likes }),
      })
    case ACTIONS.FETCH_REVIEWLEADERBOARD:
      const leaderboardKey = 'leaderboard'
      return handle(reviewState, action, {
        start: prevState => ({
          ...prevState,
          leaderboard: {
            ...prevState[leaderboardKey],
            isFetching: true,
            error: null,
          }
        }),
        finish: prevState => ({
          ...prevState,
          leaderboard: {
            ...prevState[leaderboardKey],
            isFetching: false,
          }
        }),
        failure: prevState => ({
          ...prevState,
          leaderboard: {
            ...prevState[leaderboardKey],
            error: payload,
          }
        }),
        success: prevState => ({
          ...prevState,
          leaderboard: {
            ...prevState[leaderboardKey],
            isStale: false,
            items: [...payload]
          }
        }),
      })
    // Synchronous actions
    // -----------------------------------------------
    case ACTIONS.RECEIVE_DISLIKE:
        return {...reviewState, dislikes: action.payload.dislikes}
    default:
      return reviewState
  }
}

/**
 * updatesReducer
 * @returns updatesState
 **/
export function updateReducer(updatesState = initialState.updates, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_UPDATES:
      return handle(updatesState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return updatesState
  }
}

/**
 * messagesReducer
 * @returns messagesState
 **/
export function messageReducer(messagesState = initialState.messages, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_MESSAGES:
      return handle(messagesState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: [...payload] }),
      })
    // Synchronous actions
    // -----------------------------------------------
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
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_IMAGES:
      return handle(imageState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({
          ...prevState, isStale: true, error: payload
        }),
        success: prevState => ({
          ...prevState, isStale: false, items: [...payload]
        }),
      })
    case ACTIONS.FETCH_IMAGE:
      return handle(imageState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({
          ...prevState,
          [payload.id]: {
            ...prevState[payload.id],
            isStale: true,
            error: payload
          },
        }),
        success: prevState => ({
          ...prevState, [payload.id]: {...payload, isStale: false}
        }),
      })
    case ACTIONS.FETCH_PROFILEIMAGES:
        return {...imageState, isFetching: false, items: [...payload]}
    case ACTIONS.FETCH_VERIFICATIONIMAGES:
        return {...imageState, isFetching: false, items: [...payload]}
    case ACTIONS.DELETE_IMAGES:
      return handle(imageState, action, {
        start: prevState => ({ ...prevState, isDeleting: true, error: null }),
        finish: prevState => ({ ...prevState, isDeleting: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => {
          const newState = {...prevState}
          payload.forEach(item => {
            if (Object.prototype.hasOwnProperty.call(newState, item.id)) {
              delete newState[item.id]
            }
          })
          return { newState, items: [...imageState.items].filter(item => payload.indexOf(item.id) < 0) }
        },
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return imageState
  }
}

/**
 * videoReducer (redux-pack)
 * @returns videoState
 **/
export function videoReducer(videoState = initialState.videos, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_VIDEOS:
      return handle(videoState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({
          ...prevState, isStale: true, error: payload
        }),
        success: prevState => ({
          ...prevState, isStale: false, items: [...payload]
        }),
      })
    case ACTIONS.FETCH_VIDEO:
      return handle(videoState, action, {
        // start: prevState => ({ ...prevState, isFetching: true, error: null }),
        // finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({
          ...prevState,
          [payload.id]: {
            ...prevState[payload.id],
            isStale: true,
            error: payload,
          },
        }),
        success: prevState => ({
          ...prevState,
          [payload.id]: {...payload, isStale: false},
        }),
      })
    // Synchronous actions
    // -----------------------------------------------
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
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_ALBUM:
      return handle(albumState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return albumState
  }
}

/**
 * favoriteReducer
 * @returns favoritesState
 **/
export function favoriteReducer(favoritesState = initialState.favorites, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_FAVORITES:
      return handle(favoritesState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return favoritesState
  }
}

/**
 * likesReducer
 * @returns likesState
 **/
export function likeReducer(likesState = initialState.likes, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_LIKES:
      return handle(likesState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return likesState
  }
}

/**
 * postReducer
 * @returns postState
 **/
export function postReducer(postState = initialState.posts, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_POST:
      return handle(postState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, [payload.id]: payload }),
      })
    case ACTIONS.FETCH_POSTS:
      return handle(postState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return postState
  }
}

/**
 * threadReducer
 * @returns threadState
 **/
export function threadReducer(threadState = initialState.threads, action) {
  const {type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_THREADS:
      return handle(threadState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    case ACTIONS.FETCH_THREAD:
      return handle(threadState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, [payload.id]: {...payload} }),
      })
    case ACTIONS.FETCH_POSTS_FOR_THREAD:
      return handle(threadState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
        return threadState
  }
}

/**
 * categoryReducer
 * @returns categoryState
 **/
export function categoryReducer(categoryState = initialState.categories, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_CATEGORIES:
      return handle(categoryState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    case ACTIONS.FETCH_CATEGORY:
      return handle(categoryState, action, {
        start: prevState => ({...prevState, isFetching: true, error: null}),
        finish: prevState => ({...prevState, isFetching: false}),
        failure: prevState => ({...prevState, error: payload}),
        success: prevState => ({...prevState, [payload.id]: {...payload}}),
      })
    case ACTIONS.FETCH_CATEGORY_THREADS:
      return handle(categoryState, action, {
        start: prevState => ({...prevState, isFetching: true, error: null}),
        finish: prevState => ({...prevState, isFetching: false}),
        failure: prevState => ({...prevState, error: payload}),
        success: prevState => ({...prevState, threads: [...payload]}),
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return categoryState
  }
}

/**
 * userReducer
 * @returns state
 **/
export function userReducer(userState = initialState.users, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_USER:
      return handle(userState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, [payload.id]: {...payload} }),
      })
    case ACTIONS.FETCH_USERS:
      return handle(userState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => {
          const newState = {...prevState}
          Object.keys(payload).forEach(id => {
              newState[id] = {...payload[id]}
          })
          return newState
        },
      })
    case ACTIONS.DELETE_AVATAR:
      // remove the avatar from the respective user
      return handle(userState, action, {
        // start: prevState => ({ ...prevState, isFetching: true, error: null }),
        // finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => {
          const usersAvCopy = {...prevState}
          if (Object.prototype.hasOwnProperty.call(usersAvCopy, `${action.userid}`)) {
            usersAvCopy[`${action.userid}`].avatar = null
          }
          return {...usersAvCopy } // TODO
        },
      })
    case ACTIONS.DELETE_PROFILEIMG:
      // remove the profile image from the respective user
      return handle(userState, action, {
        // start: prevState => ({ ...prevState, isFetching: true, error: null }),
        // finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => {
          const usersPICopy = {...prevState}
          if (Object.prototype.hasOwnProperty.call(usersPICopy, `${action.userid}`)) {
            usersPICopy[`${action.userid}`].profileimg = null
          }
          return {...usersPICopy } // TODO
        },
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return userState
  }
}

/**
 * followersReducer
 * @returns state
 **/
export function followerReducer(followersState = initialState.followers, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_FOLLOWERS:
      return handle(followersState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return followersState
  }
}

/**
 * onlineReducer
 * @returns state
 **/
export function onlineReducer(onlineState = initialState.online, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_ONLINE_USERS:
      return handle(onlineState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: [...payload] }),
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return onlineState
  }
}

export function modReducer(modState = initialState.mod, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_MOD_ITEMS:
      return handle(modState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, items: payload }),
      })
    // Synchronous actions
    // -----------------------------------------------
    default:
      return modState
  }
}

/**
 * currentUserReducer
 * @returns state
 **/
export function currentUserReducer(currentUserState = initialState.currentUser, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_CURRENT_USER:
      return handle(currentUserState, action, {
        start: prevState => ({ ...prevState, isSaving: true, error: null }),
        finish: prevState => ({ ...prevState, isSaving: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, ...payload }),
      })
    case ACTIONS.DELETE_AVATAR:
      return handle(currentUserState, action, {
        // start: prevState => ({ ...prevState, isSaving: true, error: null }),
        // finish: prevState => ({ ...prevState, isSaving: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, avatar: null }),
      })
    case ACTIONS.DELETE_PROFILEIMG:
      return handle(currentUserState, action, {
        // start: prevState => ({ ...prevState, isSaving: true, error: null }),
        // finish: prevState => ({ ...prevState, isSaving: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, profileimg: null }),
      })
    case ACTIONS.CHANGE_SETTING:
      return handle(currentUserState, action, {
        // start: prevState => ({ ...prevState, isFetching: true, error: null }),
        // finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, ...payload }),
      })
    // Synchronous actions
    // -----------------------------------------------
    case ACTIONS.GET_CURRENT_USER_ID:
      if (currentUserState.userid !== undefined) {
          return currentUserState.id
      }
      return null
    case ACTIONS.GET_THEME:
      return currentUserState.theme
    default:
      return currentUserState
  }
}

/**
 * cpAppReducer
 * @returns appState
 **/
export function cpAppReducer(appState = initialState.appState, action) {
  const { type, payload } = action
  switch (type) {
    // Asynchronous actions
    // -----------------------------------------------
    case ACTIONS.FETCH_COUNTRIES:
      return handle(appState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, countries: [...payload] }),
      })
    case ACTIONS.FETCH_STATES:
      return handle(appState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, states: [...payload] }),
      })
    case ACTIONS.FETCH_CITIES:
      return handle(appState, action, {
        start: prevState => ({ ...prevState, isFetching: true, error: null }),
        finish: prevState => ({ ...prevState, isFetching: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, cities: [...payload] }),
      })
    // Synchronous actions
    // -----------------------------------------------
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
    case ACTIONS.SET_DEVICE_DETAILS:
        return {...appState, deviceDetails: {...payload}}
    case ACTIONS.SET_ACTIVE_BADGE:
        return {...appState, activeBadge: +action.id}
    default:
      return appState
  }
}
