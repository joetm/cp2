
import fetch from 'unfetch'

import { makeActionCreator } from './boilerplate'


/*
 * Redux action types
 */

export const FOLLOW_USER      = 'FOLLOW_USER'      ; // Symbol('FOLLOW_USER')
export const REPLY_THREAD     = 'REPLY_THREAD'     ; // Symbol('REPLY_THREAD')
export const COMMENT_PROFILE  = 'COMMENT_PROFILE'  ; // Symbol('COMMENT_PROFILE')
export const LOAD_POST        = 'LOAD_POST'        ; // Symbol('LOAD_POST')
export const EDIT_POST        = 'EDIT_POST'        ; // Symbol('EDIT_POST')
export const REMOVE_POST      = 'REMOVE_POST'      ; // Symbol('REMOVE_POST')
export const TOGGLE_SIDEBAR   = 'TOGGLE_SIDEBAR'   ; // Symbol('TOGGLE_SIDEBAR')
export const OPEN_SIDEBAR     = 'OPEN_SIDEBAR'     ; // Symbol('OPEN_SIDEBAR')
export const CLOSE_SIDEBAR    = 'CLOSE_SIDEBAR'    ; // Symbol('CLOSE_SIDEBAR')
export const MARK_THREAD_READ = 'MARK_THREAD_READ' ; // Symbol('MARK_THREAD_READ')
export const MARK_POST_READ   = 'MARK_POST_READ'   ; // Symbol('MARK_POST_READ')
export const MARK_ALL_READ    = 'MARK_ALL_READ'    ; // Symbol('MARK_ALL_READ')
export const SELECT_THREAD    = 'SELECT_THREAD'    ; // Symbol('SELECT_THREAD')


/*
 * Redux action creators
 */

// user facing actions
export const followUser       = makeActionCreator(FOLLOW_USER,     'userid')
export const replyThread      = makeActionCreator(REPLY_THREAD,    'threadid')
export const commentProfile   = makeActionCreator(COMMENT_PROFILE, 'userid')
export const toggleSidebar    = makeActionCreator(TOGGLE_SIDEBAR)
export const closeSidebar     = makeActionCreator(CLOSE_SIDEBAR)
export const openSidebar      = makeActionCreator(OPEN_SIDEBAR)

// other actions
export const loadPost         = makeActionCreator(LOAD_POST,       'postid', 'response')
export const editPost         = makeActionCreator(EDIT_POST,       'postid', 'response')
export const removePost       = makeActionCreator(REMOVE_POST,     'postid', 'bool')
export const selectThread     = makeActionCreator(SELECT_THREAD,   'threadid')

export const markThreadRead   = makeActionCreator(MARK_THREAD_READ,'threadid')
export const markPostRead     = makeActionCreator(MARK_POST_READ,  'threadid')
export const markAllRead      = makeActionCreator(MARK_ALL_READ,   'threadid')
