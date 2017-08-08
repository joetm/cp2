
import fetch from 'unfetch'

/*
 * Redux action types
 */

export const FOLLOW_USER     = 'FOLLOW_USER'     ; // Symbol('FOLLOW_USER')
export const REPLY_THREAD    = 'REPLY_THREAD'    ; // Symbol('REPLY_THREAD')
export const COMMENT_PROFILE = 'COMMENT_PROFILE' ; // Symbol('COMMENT_PROFILE')
export const LOAD_POST       = 'LOAD_POST'       ; // Symbol('LOAD_POST')
export const EDIT_POST       = 'EDIT_POST'       ; // Symbol('EDIT_POST')
export const REMOVE_POST     = 'REMOVE_POST'     ; // Symbol('REMOVE_POST')
export const TOGGLE_SIDEBAR  = 'TOGGLE_SIDEBAR'  ; // Symbol('TOGGLE_SIDEBAR')

/*
 * Redux action creators
 */

// http://redux.js.org/docs/recipes/ReducingBoilerplate.html
function makeActionCreator(type, ...argNames) {
  return function (...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

// user facing actions
// export function followUser(userid) { return {type: FOLLOW_USER, text: 'Follow user', userid} }
export const followUser       = makeActionCreator(FOLLOW_USER,     'userid')
export const replyThread      = makeActionCreator(REPLY_THREAD,    'threadid')
export const commentProfile   = makeActionCreator(COMMENT_PROFILE, 'userid')
export const toggleSidebar    = makeActionCreator(TOGGLE_SIDEBAR,  'bool')

// other actions
export const loadPost         = makeActionCreator(LOAD_POST,       'postid', 'response')
export const editPost         = makeActionCreator(EDIT_POST,       'postid', 'response')
export const removePost       = makeActionCreator(REMOVE_POST,     'postid', 'bool')

export function selectThread(threadid) {
  return {type: SELECT_THREAD, threadid}
}

function fetchPosts(threadid) {
  return dispatch => {
    dispatch(requestPosts(threadid))
    return fetch(`https://www.reddit.com/r/${threadid}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(threadid, json)))
  }
}

function shouldFetchPosts(state, threadid) {
  const posts = state.postsBySubreddit[threadid]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(threadid) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), threadid)) {
      return dispatch(fetchPosts(threadid))
    }
  }
}