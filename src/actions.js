
/**
 * Redux actions
 **/

import initialState from './initialState'
import api from './api'
// import { pushState } from 'redux-router'
import jwtDecode from 'jwt-decode'
import fetch from 'unfetch'

import { checkHttpStatus, parseJSON } from './common/helpers'


/*
 * Redux action types
 */

export const COMMENT_PROFILE           = 'PROFILE::COMMENT_PROFILE'
export const GET_USER                  = 'USER::GET_USER'
export const GET_CURRENT_USER          = 'USER::GET_CURRENT_USER'
export const GET_CURRENT_USER_MINIMAL  = 'USER::GET_CURRENT_USER_MINIMAL'
export const GET_CURRENT_USER_ID       = 'USER::GET_CURRENT_USER_ID'
export const REPLY_THREAD              = 'FORUM::REPLY_THREAD'
export const GET_POSTS                 = 'FORUM::GET_POSTS'
export const GET_POST                  = 'FORUM::GET_POST'
export const GET_THREAD                = 'FORUM::GET_THREAD'
export const EDIT_POST                 = 'FORUM::EDIT_POST'
export const REMOVE_POST               = 'FORUM::REMOVE_POST'
export const TOGGLE_SEARCH_SIDEBAR     = 'FORUM::TOGGLE_SEARCH_SIDEBAR'
export const OPEN_SEARCH_SIDEBAR       = 'FORUM::OPEN_SEARCH_SIDEBAR'
export const CLOSE_SEARCH_SIDEBAR      = 'FORUM::CLOSE_SEARCH_SIDEBAR'
export const TOGGLE_SIDEBAR            = 'FORUM::TOGGLE_SIDEBAR'
export const OPEN_SIDEBAR              = 'FORUM::OPEN_SIDEBAR'
export const CLOSE_SIDEBAR             = 'FORUM::CLOSE_SIDEBAR'
export const SELECT_THREAD             = 'FORUM::SELECT_THREAD'
export const SEND_MESSAGE              = 'CHAT::SEND_MESSAGE'
export const RECEIVE_MESSAGEHISTORY    = 'CHAT::RECEIVE_MESSAGEHISTORY'
export const REVIEW_APPROVE            = 'REVIEW::APPROVE'
export const REVIEW_DISAPPROVE         = 'REVIEW::DISAPPROVE'
export const LIKE                      = 'SOCIAL::LIKE'
export const DISLIKE                   = 'SOCIAL::DISLIKE'
export const UNDO_LIKE                 = 'SOCIAL::UNDO_LIKE'
export const UNDO_DISLIKE              = 'SOCIAL::UNDO_DISLIKE'
export const FOLLOW_USER               = 'SOCIAL::FOLLOW_USER'
export const SET_ACTIVE_BADGE          = 'NAV::SET_ACTIVE_BADGE'
export const GET_UPDATES               = 'STREAM::GET_UPDATES'
export const SET_DEVICE_DETAILS        = 'APP::SET_DEVICE_DETAILS'
export const SET_FETCHING_STATUS       = 'APP::SET_FETCHING_STATUS'
// export const UNKNOWN                  = 'APP::UNKNOWN'

export const MARK_IMAGES_READ          = 'STREAM::MARK_IMAGES_READ'
export const MARK_VIDEOS_READ          = 'STREAM::MARK_VIDEOS_READ'
export const MARK_POSTS_READ           = 'STREAM::MARK_POSTS_READ'
export const MARK_MESSAGES_READ        = 'STREAM::MARK_MESSAGES_READ'
export const MARK_LIKES_READ           = 'STREAM::MARK_LIKES_READ'
export const MARK_THREAD_READ          = 'STREAM::MARK_THREAD_READ'
export const MARK_POST_READ            = 'STREAM::MARK_POST_READ'
export const MARK_ALL_READ             = 'STREAM::MARK_ALL_READ'

export const RECEIVE_USER              = 'USER::RECEIVE_USER'
export const RECEIVE_USERS             = 'USER::RECEIVE_USERS'
export const RECEIVE_FOLLOWERS         = 'SOCIAL::RECEIVE_FOLLOWERS'
export const RECEIVE_CURRENT_USER      = 'USER:RECEIVE_CURRENT_USER'
export const RECEIVE_COMMENTS          = 'PROFILE::RECEIVE_COMMENTS'
export const RECEIVE_THREADS           = 'FORUM::RECEIVE_THREADS'
export const RECEIVE_POSTS             = 'FORUM::RECEIVE_POSTS'
export const RECEIVE_POST              = 'FORUM::RECEIVE_POST'
export const RECEIVE_THREAD            = 'FORUM::RECEIVE_THREAD'
export const RECEIVE_ALBUM             = 'ALBUM::RECEIVE_ALBUM'
export const RECEIVE_IMAGES            = 'STREAM::RECEIVE_IMAGES'
export const RECEIVE_IMAGE             = 'STREAM::RECEIVE_IMAGE'
export const RECEIVE_VIDEOS            = 'STREAM::RECEIVE_VIDEOS'
export const RECEIVE_VIDEO             = 'STREAM::RECEIVE_VIDEO'
export const RECEIVE_UPDATES           = 'STREAM::RECEIVE_UPDATES'
export const RECEIVE_NOTIFICATIONS     = 'STREAM::RECEIVE_NOTIFICATIONS'
export const RECEIVE_FAVORITES         = 'STREAM::RECEIVE_FAVORITES'
export const RECEIVE_LIKES             = 'STREAM::RECEIVE_LIKES'
export const RECEIVE_LIKE              = 'STREAM::RECEIVE_LIKE'
export const RECEIVE_DISLIKE           = 'STREAM::RECEIVE_DISLIKE'
export const RECEIVE_REVIEWITEM        = 'REVIEW::RECEIVE_REVIEWITEM'
export const RECEIVE_UNREAD_COUNT      = 'NOTIFICATIONS::RECEIVE_UNREAD_COUNT'
export const RECEIVE_COUNTRIES         = 'APP::RECEIVE_COUNTRIES'
export const RECEIVE_STATES            = 'APP::RECEIVE_STATES'
export const RECEIVE_CITIES            = 'APP::RECEIVE_CITIES'
export const RECEIVE_COUNTRY           = 'APP::RECEIVE_COUNTRY'
export const RECEIVE_STATE             = 'APP::RECEIVE_STATE'
export const RECEIVE_CITY              = 'APP::RECEIVE_CITY'

export const RECEIVE_CHAT_MSG          = "CHAT::RECEIVE_CHAT_MSG"
export const SEND_CHAT_MSG             = "CHAT::SEND_CHAT_MSG"

// export const DELETE_AVATAR             = 'APP:RECEIVE_AVATAR'
export const DELETE_AVATAR_STARTED     = 'APP::DELETE_AVATAR_STARTED'
export const DELETE_AVATAR_SUCCESS     = 'APP::DELETE_AVATAR_SUCCESS'
export const DELETE_AVATAR_FAILURE     = 'APP::DELETE_AVATAR_FAILURE'
export const DELETE_PROFILEIMG_STARTED = 'APP:RECEIVE_PROFILEIMG_STARTED'
export const DELETE_PROFILEIMG_SUCCESS = 'APP:RECEIVE_PROFILEIMG_SUCCESS'
export const DELETE_PROFILEIMG_FAILURE = 'APP:RECEIVE_PROFILEIMG_FAILURE'

export const REPLY_NOTIFICATION        = 'SOCIAL::REPLY_NOTIFICATION'
export const FORWARD_NOTIFICATION      = 'SOCIAL::FORWARD_NOTIFICATION'
export const DELETE_NOTIFICATION       = 'SOCIAL::DELETE_NOTIFICATION'

// AUTH
export const LOGIN_REQUEST             = 'AUTH::LOGIN_REQUEST'
export const LOGIN_FAILURE             = 'AUTH::LOGIN_FAILURE'
export const LOGIN_SUCCESS             = 'AUTH::LOGIN_SUCCESS'
export const LOGOUT                    = 'AUTH::LOGOUT'

export const FETCH_VIDEO_STARTED       = 'VIDEO::FETCH_VIDEO_STARTED'
export const FETCH_VIDEO_SUCCESS       = 'VIDEO::FETCH_VIDEO_SUCCESS'
export const FETCH_VIDEO_FAILURE       = 'VIDEO::FETCH_VIDEO_FAILURE'

// export const FETCH_PROTECTED_DATA_REQUEST = 'AUTH::FETCH_PROTECTED_DATA_REQUEST'
// export const RECEIVE_PROTECTED_DATA   = 'AUTH::RECEIVE_PROTECTED_DATA'

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

export const getUser               = makeActionCreator(GET_USER,            'userid')
export const getCurrentUser        = makeActionCreator(GET_CURRENT_USER)
export const getCurrentUserMinimal = makeActionCreator(GET_CURRENT_USER_MINIMAL)
export const getCurrentUserid      = makeActionCreator(GET_CURRENT_USER_ID)
export const followUser            = makeActionCreator(FOLLOW_USER,         'userid')
export const replyThread           = makeActionCreator(REPLY_THREAD,        'threadid')
export const commentProfile        = makeActionCreator(COMMENT_PROFILE,     'userid')
export const toggleSearchSidebar   = makeActionCreator(TOGGLE_SEARCH_SIDEBAR)
export const closeSearchSidebar    = makeActionCreator(CLOSE_SEARCH_SIDEBAR)
export const openSearchSidebar     = makeActionCreator(OPEN_SEARCH_SIDEBAR)
export const toggleSidebar         = makeActionCreator(TOGGLE_SIDEBAR)
export const closeSidebar          = makeActionCreator(CLOSE_SIDEBAR)
export const openSidebar           = makeActionCreator(OPEN_SIDEBAR)
export const like                  = makeActionCreator(LIKE,                'itemid', 'increment')
export const dislike               = makeActionCreator(DISLIKE,             'itemid', 'increment')
export const undoLike              = makeActionCreator(UNDO_LIKE,           'itemid')
export const undoDislike           = makeActionCreator(UNDO_DISLIKE,        'itemid')
export const reviewApprove         = makeActionCreator(REVIEW_APPROVE,      'itemid')
export const reviewDisapprove      = makeActionCreator(REVIEW_DISAPPROVE,   'itemid')
export const sendMessage           = makeActionCreator(SEND_MESSAGE,        'toUserId', 'msg', 'currentUser')

// forum actions
export const getPosts              = makeActionCreator(GET_POSTS)
export const getPost               = makeActionCreator(GET_POST,            'postid', 'response')
export const getThread             = makeActionCreator(GET_THREAD,          'threadid', 'response')
export const editPost              = makeActionCreator(EDIT_POST,           'postid', 'response')
export const removePost            = makeActionCreator(REMOVE_POST,         'postid', 'bool')
export const selectThread          = makeActionCreator(SELECT_THREAD,       'threadid')
export const getUpdates            = makeActionCreator(GET_UPDATES)

// other app actions
export const setActiveBadge        = makeActionCreator(SET_ACTIVE_BADGE,    'id')
export const setDeviceDetails      = makeActionCreator(SET_DEVICE_DETAILS,  'obj')
export const setFetchingStatus     = makeActionCreator(SET_FETCHING_STATUS, 'bool')

// ajax receptors
export const receiveCurrentUser    = makeActionCreator(RECEIVE_CURRENT_USER,      'response')
export const receiveUser           = makeActionCreator(RECEIVE_USER,              'response', 'userid')
export const receiveUsers          = makeActionCreator(RECEIVE_USERS,             'response')
export const receiveFollowers      = makeActionCreator(RECEIVE_FOLLOWERS,         'response')
export const receiveComments       = makeActionCreator(RECEIVE_COMMENTS,          'response')
export const receivePosts          = makeActionCreator(RECEIVE_POSTS,             'response')
export const receiveThreads        = makeActionCreator(RECEIVE_THREADS,           'response')
export const receivePost           = makeActionCreator(RECEIVE_POST,              'response')
export const receiveUpdates        = makeActionCreator(RECEIVE_UPDATES,           'response')
export const receiveImages         = makeActionCreator(RECEIVE_IMAGES,            'response')
export const receiveImage          = makeActionCreator(RECEIVE_IMAGE,             'response')
export const receivePictures       = receiveImages
export const receivePicture        = receiveImage
export const receiveVideos         = makeActionCreator(RECEIVE_VIDEOS,            'response')
export const receiveVideo          = makeActionCreator(RECEIVE_VIDEO ,            'response')
export const receiveThread         = makeActionCreator(RECEIVE_THREAD,            'response')
export const receiveReviewItem     = makeActionCreator(RECEIVE_REVIEWITEM,        'response')
export const receiveMessageHistory = makeActionCreator(RECEIVE_MESSAGEHISTORY,    'response')
export const receiveNotifications  = makeActionCreator(RECEIVE_NOTIFICATIONS,     'response')
export const receiveFavorites      = makeActionCreator(RECEIVE_FAVORITES,         'response')
export const receiveLikes          = makeActionCreator(RECEIVE_LIKES,             'response')
export const receiveAlbum          = makeActionCreator(RECEIVE_ALBUM,             'response')
export const receiveLike           = makeActionCreator(RECEIVE_LIKE,              'response')
export const receiveDislike        = makeActionCreator(RECEIVE_DISLIKE,           'response')
export const receiveUnreadCount    = makeActionCreator(RECEIVE_UNREAD_COUNT,      'response')

export const sendChatMessageStart  = makeActionCreator(SEND_CHAT_MSG,             'payload')
export const receiveChatMsg        = makeActionCreator(RECEIVE_CHAT_MSG,          'payload')

export const receiveCountries      = makeActionCreator(RECEIVE_COUNTRIES,         'response')
export const receiveStates         = makeActionCreator(RECEIVE_STATES,            'response')
export const receiveCities         = makeActionCreator(RECEIVE_CITIES,            'response')
export const receiveCountry        = makeActionCreator(RECEIVE_COUNTRY,           'response')
export const receiveState          = makeActionCreator(RECEIVE_STATE,             'response')
export const receiveCity           = makeActionCreator(RECEIVE_CITY,              'response')

export const deleteAvatarStarted     = makeActionCreator(DELETE_AVATAR_STARTED)
export const deleteAvatarSuccess     = makeActionCreator(DELETE_AVATAR_SUCCESS)
export const deleteAvatarFailure     = makeActionCreator(DELETE_AVATAR_FAILURE,     'error')
export const deleteProfileImgStarted = makeActionCreator(DELETE_PROFILEIMG_STARTED)
export const deleteProfileImgSuccess = makeActionCreator(DELETE_PROFILEIMG_SUCCESS)
export const deleteProfileImgFailure = makeActionCreator(DELETE_PROFILEIMG_FAILURE, 'error')

export const fetchVideoStarted       = makeActionCreator(FETCH_VIDEO_STARTED)
export const fetchVideoFailure       = makeActionCreator(FETCH_VIDEO_FAILURE)

// AUTH
export const setIsAuthenticating     = makeActionCreator(LOGIN_REQUEST)

export const replyNotification       = makeActionCreator(REPLY_NOTIFICATION,        'payload')
export const forwardNotification     = makeActionCreator(FORWARD_NOTIFICATION,      'itemid')


// const unknownAction = { type: UNKNOWN }


// ----------------------------------------------------
// JWT
// ----------------------------------------------------

export const loginSuccess = (token) => {
    localStorage.setItem('token', token)
    return {
        type: LOGIN_SUCCESS,
        token,
    }
}
export const loginFailure = (status, statusText) => {
    localStorage.removeItem('token')
    return {
        type: LOGIN_FAILURE,
        status,
        statusText,
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    return {
        type: LOGOUT,
    }
}
// export const login = () => {
//     localStorage.removeItem('token')
//     return {
//         type: LOGIN_REQUEST,
//     }
// }

// ----------------------------------------------------
// Asynchronous action creators
// ----------------------------------------------------

export function login(email, password, redirect="/") {
    return function(dispatch) {
        dispatch(setIsAuthenticating())
        return fetch('http://localhost:3000/auth/getToken/', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token)
                    dispatch(loginUserSuccess(response.token))
                    // TODO - redirect
                    // dispatch(pushState(null, redirect))
                } catch (e) {
                    dispatch(loginFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginFailure(error))
            })
    }
}


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
 * fetchUsers Asynchronous Action Creator
 * @returns receiveUsers() - Action
 */
export const fetchUsers = () =>
    api.fetchUsers().then(receiveUsers)

/**
 * fetchFollowers Asynchronous Action Creator
 * @returns receiveFollowers() - Action
 */
export const fetchFollowers = () =>
    api.fetchFollowers().then(receiveFollowers)

/**
 * fetchReviewItem Asynchronous Action Creator
 * @returns receiveReviewItem() - Action
 */
export const fetchReviewItem = () =>
    api.fetchReviewItem().then(receiveReviewItem)

/**
 * fetchReviewItem Asynchronous Action Creator
 * @returns receiveReviewItem() - Action
 */
export const fetchUnreadCount = () =>
    api.fetchUnreadCount().then(receiveUnreadCount)

/**
 * fetchPosts Asynchronous Action Creator
 * @returns receivePosts() - Action
 */
export const fetchPosts = () =>
    api.fetchPosts().then(receivePosts)

/**
 * fetchThreads Asynchronous Action Creator
 * @returns receiveThreads() - Action
 */
export const fetchThreads = () =>
    api.fetchThreads().then(receiveThreads)

/**
 * fetchPosts Asynchronous Action Creator
 * @returns receivePosts() - Action
 */
export const fetchMessageHistory = (userid) =>
    api.fetchMessageHistory(userid).then(receiveMessageHistory)

/**
 * fetchAll Asynchronous Action Creator
 * @returns fetchAll() - Action
 */
export const fetchAll = () =>
    api.fetchAll().then(receiveUpdates)

/**
 * fetchPictures Asynchronous Action Creator
 * @returns fetchPictures() - Action
 */
export const fetchPictures = () =>
    api.fetchPictures().then(receiveImages)

/**
 * fetchVideo Asynchronous Action Creator
 * @returns fetchVideo() - Action
 */
// export const fetchPicture = (imageid) =>
//     api.fetchPicture(imageid).then(receivePicture)
export const fetchPicture = (imageid) => (dispatch) => {
    // dispatch(fetchVideoStarted())
    return api.fetchPicture(imageid)
                .then((response) => dispatch(receivePicture(response)))
                // .catch(error => {
                //   dispatch(fetchPictureFailure(error))
                // })
}

/**
 * fetchVideos Asynchronous Action Creator
 * @returns fetchVideos() - Action
 */
export const fetchVideos = () =>
    api.fetchVideos().then(receiveVideos)

/**
 * fetchVideo Asynchronous Action Creator
 * @returns fetchVideo() - Action
 */
// export const fetchVideo = (videoid) =>
//     api.fetchVideo(videoid).then(receiveVideo)
export const fetchVideo = (videoid) => (dispatch) => {
    dispatch(fetchVideoStarted())
    return api.fetchVideo(videoid)
                .then((response) => dispatch(receiveVideo(response)))
                .catch(error => {
                  dispatch(fetchVideoFailure(error))
                })
}

/**
 * fetchNotifications Asynchronous Action Creator
 * @returns fetchNotifications() - Action
 */
export const fetchNotifications = () =>
    api.fetchNotifications().then(receiveNotifications)

/**
 * fetchFavorites Asynchronous Action Creator
 * @returns fetchFavorites() - Action
 */
export const fetchFavorites = () =>
    api.fetchFavorites().then(receiveFavorites)

/**
 * fetchLikes Asynchronous Action Creator
 * @returns fetchLikes() - Action
 */
export const fetchLikes = () =>
    api.fetchLikes().then(receiveLikes)

/**
 * fetchAlbum Asynchronous Action Creator
 * @returns fetchAlbum() - Action
 */
export const fetchAlbum = (userid) =>
    api.fetchAlbum(userid).then(receiveAlbum)

/**
 * fetchAlbum Asynchronous Action Creator
 * @returns fetchAlbum() - Action
 */
export const fetchThread = (threadid) =>
    api.fetchThread(threadid).then(receiveThread)

export const sendChatMessage = (payload) => (dispatch) => {
    dispatch(sendChatMessageStart(payload))
    return api.sendChatMessage(payload).then(receiveChatMsg)
}

/**
 * recordLike Asynchronous Action Creator
 * @returns recordLike() - Action
 */
export const recordLike = () =>
    api.recordLike().then(receiveLike)

/**
 * recordDislike Asynchronous Action Creator
 * @returns recordDislike() - Action
 */
export const recordDislike = () =>
    api.recordDislike().then(receiveDislike)

// TODO
export const markRead = (what, id) =>
    api.markRead(what).then(receiveUnreadCount)

// TODO
export const markAllRead = () =>
    api.markAllRead().then(receiveUnreadCount)

export const fetchCountries = () =>
    api.fetchCountries().then(receiveCountries)

export const fetchStates = () =>
    api.fetchStates().then(receiveStates)

export const fetchCities = () =>
    api.fetchCities().then(receiveCities)

export const updateCountry = () =>
    api.updateCountry().then(receiveCountry)

export const updateState = () =>
    api.updateState().then(receiveState)

export const updateCity = () =>
    api.updateCity().then(receiveCity)


// export const removeAvatar = () =>
//     api.removeField('avatar').then(deleteAvatar)
export const removeAvatar = () => (dispatch) => {
    dispatch(deleteAvatarStarted())
    return api.removeField('avatar')
                .then(dispatch(deleteAvatarSuccess()))
                .catch(error => {
                  dispatch(deleteAvatarFailure(), error)
                })
}

// export const removeProfileImg = () =>
//     api.removeField('profileimg').then(deleteProfileImg)
export const removeProfileImg = () => (dispatch) => {
    dispatch(deleteProfileImgStarted())
    return api.removeField('profileimg')
                .then(dispatch(deleteProfileImgSuccess()))
                .catch(error => {
                  dispatch(deleteProfileImgFailure(), error)
                })
}
