
/**
 * Redux actions
 **/

import api from './api'
// import { pushState } from 'redux-router'
// import jwtDecode from 'jwt-decode'
import fetch from 'unfetch'

import { checkHttpStatus, parseJSON } from './common/helpers'


/*
 * Redux action types
 */

export const COMMENT_PROFILE            = 'PROFILE::COMMENT_PROFILE'
export const GET_USER                   = 'USER::GET_USER'
export const GET_CURRENT_USERTITLE      = 'USER::GET_CURRENT_USERTITLE'
export const GET_CURRENT_USER           = 'USER::GET_CURRENT_USER'
// export const GET_CURRENT_USER_MINIMAL   = 'USER::GET_CURRENT_USER_MINIMAL'
export const GET_CURRENT_USER_ID        = 'USER::GET_CURRENT_USER_ID'
export const GET_POSTS                  = 'FORUM::GET_POSTS'
export const GET_POST                   = 'FORUM::GET_POST'
export const GET_THREAD                 = 'FORUM::GET_THREAD'
export const EDIT_POST                  = 'FORUM::EDIT_POST'
export const REPLY_THREAD               = 'FORUM::REPLY_THREAD'
export const TOGGLE_SEARCH_SIDEBAR      = 'FORUM::TOGGLE_SEARCH_SIDEBAR'
export const OPEN_SEARCH_SIDEBAR        = 'FORUM::OPEN_SEARCH_SIDEBAR'
export const CLOSE_SEARCH_SIDEBAR       = 'FORUM::CLOSE_SEARCH_SIDEBAR'
export const TOGGLE_SIDEBAR             = 'FORUM::TOGGLE_SIDEBAR'
export const OPEN_SIDEBAR               = 'FORUM::OPEN_SIDEBAR'
export const CLOSE_SIDEBAR              = 'FORUM::CLOSE_SIDEBAR'
// export const OPEN_STREAM_SIDEBAR       = 'FORUM::OPEN_STREAM_SIDEBAR'
// export const CLOSE_STREAM_SIDEBAR      = 'FORUM::CLOSE_STREAM_SIDEBAR'
export const SELECT_THREAD              = 'FORUM::SELECT_THREAD'
export const SEND_MESSAGE               = 'CHAT::SEND_MESSAGE'
export const RECEIVE_MESSAGEHISTORY     = 'CHAT::RECEIVE_MESSAGEHISTORY'
export const REVIEW_APPROVE             = 'REVIEW::APPROVE'
export const REVIEW_DISAPPROVE          = 'REVIEW::DISAPPROVE'
export const LIKE                       = 'SOCIAL::LIKE'
export const DISLIKE                    = 'SOCIAL::DISLIKE'
export const UNDO_LIKE                  = 'SOCIAL::UNDO_LIKE'
export const UNDO_DISLIKE               = 'SOCIAL::UNDO_DISLIKE'
export const FOLLOW_USER                = 'SOCIAL::FOLLOW_USER'
export const SET_ACTIVE_BADGE           = 'NAV::SET_ACTIVE_BADGE'
export const GET_UPDATES                = 'STREAM::GET_UPDATES'
export const SET_DEVICE_DETAILS         = 'APP::SET_DEVICE_DETAILS'
export const SET_FETCHING_STATUS        = 'APP::SET_FETCHING_STATUS'
// export const UNKNOWN                   = 'APP::UNKNOWN'

export const MARK_IMAGES_READ           = 'STREAM::MARK_IMAGES_READ'
export const MARK_VIDEOS_READ           = 'STREAM::MARK_VIDEOS_READ'
export const MARK_POSTS_READ            = 'STREAM::MARK_POSTS_READ'
export const MARK_MESSAGES_READ         = 'STREAM::MARK_MESSAGES_READ'
export const MARK_LIKES_READ            = 'STREAM::MARK_LIKES_READ'
export const MARK_THREAD_READ           = 'STREAM::MARK_THREAD_READ'
export const MARK_POST_READ             = 'STREAM::MARK_POST_READ'
export const MARK_ALL_READ              = 'STREAM::MARK_ALL_READ'

export const RECEIVE_USER               = 'USER::RECEIVE_USER'
export const RECEIVE_USERS              = 'USER::RECEIVE_USERS'
export const RECEIVE_ONLINE_USERS       = 'USER::RECEIVE_ONLINE_USERS'
export const RECEIVE_FOLLOWERS          = 'SOCIAL::RECEIVE_FOLLOWERS'
export const RECEIVE_CURRENT_USER       = 'USER:RECEIVE_CURRENT_USER'
export const RECEIVE_COMMENTS           = 'PROFILE::RECEIVE_COMMENTS'
export const RECEIVE_CATEGORIES         = 'FORUM::RECEIVE_CATEGORIES'
export const RECEIVE_CATEGORY           = 'FORUM::RECEIVE_CATEGORY'
export const RECEIVE_THREADS            = 'FORUM::RECEIVE_THREADS'
export const RECEIVE_CATEGORY_THREADS   = 'FORUM::RECEIVE_CATEGORY_THREADS'
export const RECEIVE_POSTS              = 'FORUM::RECEIVE_POSTS'
export const RECEIVE_POSTS_FOR_THREAD   = 'FORUM::RECEIVE_POSTS_FOR_THREAD'
export const RECEIVE_POST               = 'FORUM::RECEIVE_POST'
export const RECEIVE_THREAD             = 'FORUM::RECEIVE_THREAD'
export const RECEIVE_ALBUM              = 'ALBUM::RECEIVE_ALBUM'
export const RECEIVE_IMAGES             = 'STREAM::RECEIVE_IMAGES'
export const RECEIVE_IMAGE              = 'STREAM::RECEIVE_IMAGE'
export const RECEIVE_VERIFICATIONIMAGES = 'STREAM::RECEIVE_VERIFICATIONIMAGES'
export const RECEIVE_VIDEOS             = 'STREAM::RECEIVE_VIDEOS'
export const RECEIVE_VIDEO              = 'STREAM::RECEIVE_VIDEO'
export const RECEIVE_UPDATES            = 'STREAM::RECEIVE_UPDATES'
export const RECEIVE_STREAM             = 'STREAM::RECEIVE_STREAM'
export const RECEIVE_MESSAGES           = 'STREAM::RECEIVE_MESSAGES'
export const RECEIVE_FAVORITES          = 'STREAM::RECEIVE_FAVORITES'
export const RECEIVE_LIKES              = 'STREAM::RECEIVE_LIKES'
export const RECEIVE_LIKE               = 'STREAM::RECEIVE_LIKE'
export const RECEIVE_DISLIKE            = 'STREAM::RECEIVE_DISLIKE'
export const RECEIVE_REVIEWITEM         = 'REVIEW::RECEIVE_REVIEWITEM'
export const RECEIVE_UNREAD_COUNT       = 'NOTIFICATIONS::RECEIVE_UNREAD_COUNT'
export const RECEIVE_COUNTRIES          = 'APP::RECEIVE_COUNTRIES'
export const RECEIVE_STATES             = 'APP::RECEIVE_STATES'
export const RECEIVE_CITIES             = 'APP::RECEIVE_CITIES'
export const RECEIVE_COUNTRY            = 'APP::RECEIVE_COUNTRY'
export const RECEIVE_STATE              = 'APP::RECEIVE_STATE'
export const RECEIVE_CITY               = 'APP::RECEIVE_CITY'

export const RECEIVE_SEARCH_RESULT      = 'SEARCH::RECEIVE_SEARCH_RESULT'

export const RECEIVE_CHAT               = 'CHAT::RECEIVE_CHAT'
export const RECEIVE_CHAT_MSG           = "CHAT::RECEIVE_CHAT_MSG"
// export const SEND_CHAT_MSG             = "CHAT::SEND_CHAT_MSG"

// export const DELETE_AVATAR           = 'APP:RECEIVE_AVATAR'
export const DELETE_AVATAR_STARTED      = 'CONTENT::DELETE_AVATAR_STARTED'
export const DELETE_AVATAR_SUCCESS      = 'CONTENT::DELETE_AVATAR_SUCCESS'
export const DELETE_AVATAR_FAILURE      = 'CONTENT::DELETE_AVATAR_FAILURE'
export const DELETE_PROFILEIMG_STARTED  = 'CONTENT:DELETE_PROFILEIMG_STARTED'
export const DELETE_PROFILEIMG_SUCCESS  = 'CONTENT:DELETE_PROFILEIMG_SUCCESS'
export const DELETE_PROFILEIMG_FAILURE  = 'CONTENT:DELETE_PROFILEIMG_FAILURE'
export const DELETE_IMAGES_STARTED      = 'CONTENT:DELETE_IMAGES_STARTED'
export const DELETE_IMAGES_SUCCESS      = 'CONTENT:DELETE_IMAGES_SUCCESS'
export const DELETE_IMAGES_FAILURE      = 'CONTENT:DELETE_IMAGES_FAILURE'

export const DELETE_MSG_SUCCESS         = 'CHAT::DELETE_MSG_SUCCESS'

export const REMOVE_POST                = 'FORUM::REMOVE_POST'

// export const SEND_SETTING              = 'APP::SEND_SETTING'
export const RECEIVE_SETTING            = 'APP::RECEIVE_SETTING'

export const REPLY_NOTIFICATION         = 'SOCIAL::REPLY_NOTIFICATION'
export const FORWARD_NOTIFICATION       = 'SOCIAL::FORWARD_NOTIFICATION'
export const DELETE_NOTIFICATION        = 'SOCIAL::DELETE_NOTIFICATION'

// AUTH
export const LOGIN_REQUEST              = 'AUTH::LOGIN_REQUEST'
export const LOGIN_FAILURE              = 'AUTH::LOGIN_FAILURE'
export const LOGIN_SUCCESS              = 'AUTH::LOGIN_SUCCESS'
export const LOGOUT                     = 'AUTH::LOGOUT'

export const FETCH_VIDEO_STARTED        = 'VIDEO::FETCH_VIDEO_STARTED'
export const FETCH_VIDEO_SUCCESS        = 'VIDEO::FETCH_VIDEO_SUCCESS'
export const FETCH_VIDEO_FAILURE        = 'VIDEO::FETCH_VIDEO_FAILURE'
export const FETCH_REVIEWITEM_STARTED   = 'REVIEW::FETCH_REVIEWITEM_STARTED'
export const FETCH_REVIEWITEM_FAILED    = 'REVIEW::FETCH_REVIEWITEM_FAILED'

export const FETCH_POSTS_FOR_THREAD_STARTED = 'FORUM::FETCH_POSTS_FOR_THREAD_STARTED'
export const FETCH_POSTS_FOR_THREAD_FAILURE = 'FORUM::FETCH_POSTS_FOR_THREAD_FAILURE'

// MOD
export const RECEIVE_CONTACT_REQUESTS   = 'MOD::RECEIVE_CONTACT_REQUESTS'

// export const FETCH_PROTECTED_DATA_REQUEST = 'AUTH::FETCH_PROTECTED_DATA_REQUEST'
// export const RECEIVE_PROTECTED_DATA   = 'AUTH::RECEIVE_PROTECTED_DATA'

/**
 * Function to reduce redux boilerplate code
 * See: http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 * @returns action
 **/
function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

// ----------------------------------------------------
// Redux action creators
// ----------------------------------------------------

export const getUser               = makeActionCreator(GET_USER,              'userid')
export const getCurrentUser        = makeActionCreator(GET_CURRENT_USER)
// export const getCurrentUsertitle   = makeActionCreator(GET_CURRENT_USERTITLE)
export const getCurrentUserid      = makeActionCreator(GET_CURRENT_USER_ID)
// export const getCurrentUserMinimal = makeActionCreator(GET_CURRENT_USER_MINIMAL)
export const followUser            = makeActionCreator(FOLLOW_USER,           'userid')
export const replyThread           = makeActionCreator(REPLY_THREAD,          'threadid')
export const commentProfile        = makeActionCreator(COMMENT_PROFILE,       'userid')
export const toggleSearchSidebar   = makeActionCreator(TOGGLE_SEARCH_SIDEBAR)
export const closeSearchSidebar    = makeActionCreator(CLOSE_SEARCH_SIDEBAR)
export const openSearchSidebar     = makeActionCreator(OPEN_SEARCH_SIDEBAR)
export const toggleSidebar         = makeActionCreator(TOGGLE_SIDEBAR)
export const openSidebar           = makeActionCreator(OPEN_SIDEBAR)
export const closeSidebar          = makeActionCreator(CLOSE_SIDEBAR)
// export const openStreamSidebar     = makeActionCreator(OPEN_STREAM_SIDEBAR)
// export const closeStreamSidebar    = makeActionCreator(CLOSE_STREAM_SIDEBAR)
// export const like                  = makeActionCreator(LIKE,                'itemid')
// export const dislike               = makeActionCreator(DISLIKE,             'itemid')
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
export const selectThread          = makeActionCreator(SELECT_THREAD,       'threadid')
export const getUpdates            = makeActionCreator(GET_UPDATES)

// other app actions
export const setActiveBadge        = makeActionCreator(SET_ACTIVE_BADGE,    'id')
export const setDeviceDetails      = makeActionCreator(SET_DEVICE_DETAILS,  'obj')
export const setFetchingStatus     = makeActionCreator(SET_FETCHING_STATUS, 'bool')

// ajax receptors
export const receiveCurrentUser        = makeActionCreator(RECEIVE_CURRENT_USER,       'response')
export const receiveUser               = makeActionCreator(RECEIVE_USER,               'response')
export const receiveUsers              = makeActionCreator(RECEIVE_USERS,              'response')
export const receiveOnlineUsers        = makeActionCreator(RECEIVE_ONLINE_USERS,       'response')
export const receiveFollowers          = makeActionCreator(RECEIVE_FOLLOWERS,          'response')
export const receiveComments           = makeActionCreator(RECEIVE_COMMENTS,           'response')
export const receiveCategory           = makeActionCreator(RECEIVE_CATEGORY,           'response')
export const receivePosts              = makeActionCreator(RECEIVE_POSTS,              'response')
export const receivePostsForThread     = makeActionCreator(RECEIVE_POSTS_FOR_THREAD,   'response')
export const receiveCategories         = makeActionCreator(RECEIVE_CATEGORIES,         'response')
export const receiveThreads            = makeActionCreator(RECEIVE_THREADS,            'response')
export const receiveCategoryThreads    = makeActionCreator(RECEIVE_CATEGORY_THREADS,   'response')
export const receivePost               = makeActionCreator(RECEIVE_POST,               'response')
export const receiveUpdates            = makeActionCreator(RECEIVE_UPDATES,            'response')
export const receiveImages             = makeActionCreator(RECEIVE_IMAGES,             'response')
export const receiveImage              = makeActionCreator(RECEIVE_IMAGE,              'response')
export const receivePictures           = receiveImages
export const receivePicture            = receiveImage
export const receiveVerificationImages = makeActionCreator(RECEIVE_VERIFICATIONIMAGES, 'response')
export const receiveVideos             = makeActionCreator(RECEIVE_VIDEOS,             'response')
export const receiveVideo              = makeActionCreator(RECEIVE_VIDEO,              'response')
export const receiveThread             = makeActionCreator(RECEIVE_THREAD,             'response')
export const receiveReviewItem         = makeActionCreator(RECEIVE_REVIEWITEM,         'response')
export const receiveMessageHistory     = makeActionCreator(RECEIVE_MESSAGEHISTORY,     'response')
export const receiveStream             = makeActionCreator(RECEIVE_STREAM,             'response')
export const receiveMessages           = makeActionCreator(RECEIVE_MESSAGES,           'response')
export const receiveFavorites          = makeActionCreator(RECEIVE_FAVORITES,          'response')
export const receiveLikes              = makeActionCreator(RECEIVE_LIKES,              'response')
export const receiveAlbum              = makeActionCreator(RECEIVE_ALBUM,              'response')
export const receiveLike               = makeActionCreator(RECEIVE_LIKE,               'response')
export const receiveDislike            = makeActionCreator(RECEIVE_DISLIKE,            'response')
export const receiveUnreadCount        = makeActionCreator(RECEIVE_UNREAD_COUNT,       'response')

// export const sendChatMessageStart = makeActionCreator(SEND_CHAT_MSG,             'payload')
export const receiveChat             = makeActionCreator(RECEIVE_CHAT,              'response')
export const receiveChatMsg          = makeActionCreator(RECEIVE_CHAT_MSG,          'response')

export const receiveCountries        = makeActionCreator(RECEIVE_COUNTRIES,         'response')
export const receiveStates           = makeActionCreator(RECEIVE_STATES,            'response')
export const receiveCities           = makeActionCreator(RECEIVE_CITIES,            'response')
export const receiveCountry          = makeActionCreator(RECEIVE_COUNTRY,           'response')
export const receiveState            = makeActionCreator(RECEIVE_STATE,             'response')
export const receiveCity             = makeActionCreator(RECEIVE_CITY,              'response')

export const receiveSearchResult     = makeActionCreator(RECEIVE_SEARCH_RESULT,     'response')

// MOD
export const receiveContactRequests  = makeActionCreator(RECEIVE_CONTACT_REQUESTS)

export const deleteAvatarStarted     = makeActionCreator(DELETE_AVATAR_STARTED)
export const deleteAvatarSuccess     = makeActionCreator(DELETE_AVATAR_SUCCESS,     'userid')
export const deleteAvatarFailure     = makeActionCreator(DELETE_AVATAR_FAILURE,     'error')

export const deleteProfileImgStarted = makeActionCreator(DELETE_PROFILEIMG_STARTED)
export const deleteProfileImgSuccess = makeActionCreator(DELETE_PROFILEIMG_SUCCESS)
export const deleteProfileImgFailure = makeActionCreator(DELETE_PROFILEIMG_FAILURE, 'error')

export const deleteImagesStarted     = makeActionCreator(DELETE_IMAGES_STARTED)
export const deleteImagesSuccess     = makeActionCreator(DELETE_IMAGES_SUCCESS,     'response')
export const deleteImagesFailure     = makeActionCreator(DELETE_IMAGES_FAILURE,     'error')

export const deleteMsgSuccess        = makeActionCreator(DELETE_MSG_SUCCESS,        'id')

export const removePost              = makeActionCreator(REMOVE_POST,               'postid', 'bool')

// --

export const fetchVideoStarted          = makeActionCreator(FETCH_VIDEO_STARTED)
export const fetchVideoFailure          = makeActionCreator(FETCH_VIDEO_FAILURE,            'error')

export const fetchPostsForThreadStarted = makeActionCreator(FETCH_POSTS_FOR_THREAD_STARTED)
export const fetchPostsForThreadFailure = makeActionCreator(FETCH_POSTS_FOR_THREAD_FAILURE, 'error')

export const fetchReviewItemStarted     = makeActionCreator(FETCH_REVIEWITEM_STARTED)
export const fetchReviewItemFailed      = makeActionCreator(FETCH_REVIEWITEM_FAILED,        'error')

// --

export const replyNotification       = makeActionCreator(REPLY_NOTIFICATION,        'payload')
export const forwardNotification     = makeActionCreator(FORWARD_NOTIFICATION,      'itemid')

// export const sendSetting          = makeActionCreator(SEND_SETTING,              'key', 'value')
export const receiveSetting          = makeActionCreator(RECEIVE_SETTING,           'payload')

// AUTH
export const setIsAuthenticating     = makeActionCreator(LOGIN_REQUEST)


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

// TODO
export function login(email, password) { // , redirect="/"
    return function(dispatch) {
        dispatch(setIsAuthenticating())
        return fetch('http://localhost:3000/auth/getToken/', {
                method: 'post',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(() => { // response
                try {
                    // const decoded = jwtDecode(response.token)
                    // dispatch(loginUserSuccess(response.token))
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
// TODO: filters
export const fetchUsers = (limit, filters = null) =>
    api.fetchUsers(limit, filters).then(receiveUsers)

/**
 * fetchUsers Asynchronous Action Creator
 * @returns receiveUsers() - Action
 */
export const fetchOnlineUsers = (limit) =>
    api.fetchOnlineUsers(limit).then(receiveOnlineUsers)

/**
 * fetchFollowers Asynchronous Action Creator
 * @returns receiveFollowers() - Action
 */
export const fetchFollowers = (limit) =>
    api.fetchFollowers(limit).then(receiveFollowers)

/**
 * fetchReviewItem Asynchronous Action Creator
 * @returns receiveReviewItem() - Action
 */
export const fetchReviewItem = (itemid = null) => (dispatch) => {
    dispatch(fetchReviewItemStarted())
    if (itemid) {
        return api.fetchSpecificReviewItem(itemid)
            .then(response => dispatch(receiveReviewItem(response)))
            .catch(error => dispatch(fetchReviewItemFailed(error)))
    }
    return api.fetchReviewItem()
        .then(response => dispatch(receiveReviewItem(response)))
        .catch(error => dispatch(fetchReviewItemFailed(error)))
}

/**
 * fetchCategory Asynchronous Action Creator
 * @returns receiveCategory() - Action
 */
export const fetchCategory = (categoryid) =>
    api.fetchCategory(categoryid).then(receiveCategory)

/**
 * fetchPosts Asynchronous Action Creator
 * @returns receivePosts() - Action
 */
export const fetchPosts = (limit) =>
    api.fetchPosts(limit).then(receivePosts)

/**
 * fetchPostsForThread Asynchronous Action Creator
 * @returns receivePostsForThread() - Action
 */
export const fetchPostsForThread = (threadid, limit) => (dispatch) => {
    dispatch(fetchPostsForThreadStarted())
    return api.fetchPostsForThread(threadid, limit)
      .then(response => dispatch(receivePostsForThread(response)))
      .catch(error => dispatch(fetchPostsForThreadFailure(error)))
}

/**
 * fetchPost Asynchronous Action Creator
 * @returns receivePost() - Action
 */
export const fetchPost = (postid) =>
    api.fetchPost(postid).then(receivePost)

/**
 * fetchCategories Asynchronous Action Creator
 * @returns receiveCategories() - Action
 */
export const fetchCategories = () =>
    api.fetchCategories().then(receiveCategories)

/**
 * fetchMessageHistory Asynchronous Action Creator
 * @returns receiveMessageHistory() - Action
 */
export const fetchMessageHistory = (userid) =>
    api.fetchMessageHistory(userid).then(receiveMessageHistory)

/**
 * fetchUpdates Asynchronous Action Creator
 * @returns fetchUpdates() - Action
 */
export const fetchUpdates = (limit) =>
    api.fetchUpdates(limit).then(receiveUpdates)

/**
 * fetchPictures Asynchronous Action Creator
 * @returns fetchPictures() - Action
 */
export const fetchPictures = (limit) =>
    api.fetchPictures(limit).then(receiveImages)

/**
 * fetchPicture Asynchronous Action Creator
 * @returns fetchPicture() - Action
 */
export const fetchPicture = (pictureid) =>
    api.fetchPicture(pictureid).then(receiveImage)

/**
 * fetchPictures Asynchronous Action Creator
 * @returns fetchPictures() - Action
 */
export const fetchUserVerificationImages = (userid) =>
    api.fetchUserVerificationImages(userid).then(receiveVerificationImages)

/**
 * fetchVideos Asynchronous Action Creator
 * @returns fetchVideos() - Action
 */
export const fetchVideos = (limit) =>
    api.fetchVideos(limit).then(receiveVideos)

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
 * fetchStream Asynchronous Action Creator
 * @returns fetchStream() - Action
 */
export const fetchStream = (limit) =>
    api.fetchStream(limit).then(receiveStream)

/**
 * fetchMessages Asynchronous Action Creator
 * @returns receiveMessages() - Action
 */
export const fetchMessages = (limit) =>
    api.fetchMessages(limit).then(receiveMessages)

/**
 * fetchFavorites Asynchronous Action Creator
 * @returns fetchFavorites() - Action
 */
export const fetchFavorites = (limit) =>
    api.fetchFavorites(limit).then(receiveFavorites)

/**
 * fetchLikes Asynchronous Action Creator
 * @returns fetchLikes() - Action
 */
export const fetchLikes = (limit) =>
    api.fetchLikes(limit).then(receiveLikes)

/**
 * fetchAlbum Asynchronous Action Creator
 * @returns fetchAlbum() - Action
 */
export const fetchAlbum = (userid) =>
    api.fetchAlbum(userid).then(receiveAlbum)

/**
 * fetchThread Asynchronous Action Creator
 * @returns receiveThread() - Action
 */
export const fetchThread = (threadid) =>
    api.fetchThread(threadid).then(receiveThread)

/**
 * fetchThreads Asynchronous Action Creator
 * @returns receiveThreads() - Action
 */
export const fetchThreads = () =>
    api.fetchThreads().then(receiveThreads)

/**
 * fetchThreadsForCategory Asynchronous Action Creator
 * @returns receiveCategoryThreads() - Action
 */
export const fetchThreadsForCategory = (categoryid) =>
    api.fetchThreadsForCategory(categoryid, 'threads').then(receiveCategoryThreads)

/**
 * fetchChat Asynchronous Action Creator
 * @returns receiveChat() - Action
 */
export const fetchChat = () =>
    api.fetchChat().then(receiveChat)


/**
 * fetchContactRequests Asynchronous Action Creator
 * @returns fetchContactRequests() - Action
 */
export const fetchContactRequests = (limit) =>
    api.fetchContactRequests(limit).then(receiveContactRequests)



export const sendChatMessage = (payload) => { // => (dispatch) => {
    // dispatch(sendChatMessageStart(payload))
    return api.sendChatMessage(payload).then(receiveChatMsg)
}

/**
 * recordLike Asynchronous Action Creator
 * @returns recordLike() - Action
 */
export const recordLike = (key, id) =>
    api.recordLike(`${key}s`, id).then(receiveLike)

/**
 * recordDislike Asynchronous Action Creator
 * @returns recordDislike() - Action
 */
export const recordDislike = (key, id) =>
    api.recordDislike(`${key}s`, id).then(receiveDislike)

/**
 * recordApproval Asynchronous Action Creator
 * @returns recordApproval() - Action
 */
export const recordApproval = (id, rating) => {
    // TODO: use action
    return api.recordCrowdDecision(REVIEW_APPROVE, id, rating).then(reviewApprove)
}

/**
 * recordDisapproval Asynchronous Action Creator
 * @returns recordDisapproval() - Action
 */
export const recordDisapproval = (id, rating) => {
    // TODO: use action
    return api.recordCrowdDecision(REVIEW_DISAPPROVE, id, rating).then(reviewDisapprove)
}

// TODO
export const markRead = (what, id) =>
    api.markRead(what, id).then(receiveUnreadCount)

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
//     api.removeUserField('avatar').then(deleteAvatar)
export const removeAvatar = (userid) => (dispatch) => {
    dispatch(deleteAvatarStarted())
    return api.removeUserField('avatar')
                .then(dispatch(deleteAvatarSuccess(userid)))
                .catch(error => dispatch(deleteAvatarFailure(error)))
}

// export const removeProfileImg = () =>
//     api.removeUserField('profileimg').then(deleteProfileImg)
export const removeProfileImg = () => (dispatch) => {
    dispatch(deleteProfileImgStarted())
    return api.removeUserField('profileimg')
                .then(dispatch(deleteProfileImgSuccess()))
                .catch(error => dispatch(deleteProfileImgFailure(error)))
}

export const removeImages = (itemids) => (dispatch) => {
    dispatch(deleteImagesStarted())
    return api.deleteItems(itemids)
                .then(dispatch(deleteImagesSuccess(itemids)))
                .catch(error => dispatch(deleteImagesFailure(error)))
}

export const removeChatMsg = (itemid) => (dispatch) => {
    return api.removeItem('chat', itemid)
                .then(dispatch(deleteMsgSuccess(itemid)))
}

export const changeSetting = (key, value) =>
    api.changeSetting(key, value).then(receiveSetting)

// -- registration checking actions ----------------------------------

export const findUser = (username) =>
    api.find('users', username, true)
      .then(receiveSearchResult)
