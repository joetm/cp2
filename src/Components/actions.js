/*
 * Redux action types
 */

export const FOLLOW_USER           = 'FOLLOW_USER'     ; // Symbol('FOLLOW_USER')
export const REPLY_THREAD          = 'REPLY_THREAD'    ; // Symbol('REPLY_THREAD')
export const COMMENT_PROFILE       = 'COMMENT_PROFILE' ; // Symbol('COMMENT_PROFILE')
export const TOGGLE_SITEMENU       = 'TOGGLE_SITEMENU' ; // Symbol('TOGGLE_SITEMENU')
export const LOAD_POST             = 'LOAD_POST'       ; // Symbol('LOAD_POST')
export const EDIT_POST             = 'EDIT_POST'       ; // Symbol('EDIT_POST')
export const REMOVE_POST           = 'REMOVE_POST'     ; // Symbol('REMOVE_POST')
//export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER' // Symbol('SET_VISIBILITY_FILTER')
//export const VisibilityFilters = {
//  SHOW_ALL: 'SHOW_ALL', // Symbol('SHOW_ALL'),
//  SHOW_COMPLETED: 'SHOW_COMPLETED', // Symbol('SHOW_COMPLETED'),
//  SHOW_ACTIVE: 'SHOW_ACTIVE', // Symbol('SHOW_ACTIVE'),
//}

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
export const toggleSiteMenu   = makeActionCreator(TOGGLE_SITEMENU, 'bool')

// other actions
export const loadPost         = makeActionCreator(LOAD_POST,       'postid', 'response')
export const editPost         = makeActionCreator(EDIT_POST,       'postid', 'response')
export const removePost       = makeActionCreator(REMOVE_POST,     'postid', 'bool')

//export function setVisibilityFilter(filter) {
//    return {type: SET_VISIBILITY_FILTER, filter}
//}

/*
 * Other actions
 */

export function navigateTo(arg) {
    // TODO
    console.log(arg)
}
