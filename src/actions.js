
/**
 * Redux actions
 **/

import api from './api'
// import jwtDecode from 'jwt-decode' // TODO


/*
 * Redux action types
 */

// -------------------------
// Synchronous action types
// -------------------------

export const GET_CURRENT_USERTITLE    = 'USER::GET_CURRENT_USERTITLE'
export const GET_POSTS                = 'FORUM::GET_POSTS'
export const GET_POST                 = 'FORUM::GET_POST'
export const GET_THREAD               = 'FORUM::GET_THREAD'
export const EDIT_POST                = 'FORUM::EDIT_POST'
export const REPLY_THREAD             = 'FORUM::REPLY_THREAD'
export const TOGGLE_SEARCH_SIDEBAR    = 'FORUM::TOGGLE_SEARCH_SIDEBAR'
export const OPEN_SEARCH_SIDEBAR      = 'FORUM::OPEN_SEARCH_SIDEBAR'
export const CLOSE_SEARCH_SIDEBAR     = 'FORUM::CLOSE_SEARCH_SIDEBAR'
export const TOGGLE_SIDEBAR           = 'FORUM::TOGGLE_SIDEBAR'
export const OPEN_SIDEBAR             = 'FORUM::OPEN_SIDEBAR'
export const CLOSE_SIDEBAR            = 'FORUM::CLOSE_SIDEBAR'
export const SELECT_THREAD            = 'FORUM::SELECT_THREAD'
export const SEND_MESSAGE             = 'CHAT::SEND_MESSAGE'
export const FETCH_MESSAGEHISTORY     = 'CHAT::FETCH_MESSAGEHISTORY'
export const REVIEW_APPROVE           = 'REVIEW::APPROVE'
export const REVIEW_DISAPPROVE        = 'REVIEW::DISAPPROVE'
export const LIKE                     = 'SOCIAL::LIKE'
export const UNDO_LIKE                = 'SOCIAL::UNDO_LIKE'
export const SET_DEVICE_DETAILS       = 'APP::SET_DEVICE_DETAILS'

// -------------------------
// Asynchronous action types
// -------------------------

export const FETCH_USERS              = 'USER::FETCH_USERS'
export const FETCH_USER               = 'USER::FETCH_USER'
export const FETCH_USER_BY_USERNAME   = 'USER::FETCH_USER_BY_USERNAME'
export const FETCH_ONLINE_USERS       = 'USER::FETCH_ONLINE_USERS'
export const FETCH_FOLLOWERS          = 'SOCIAL::FETCH_FOLLOWERS'
export const FETCH_CURRENT_USER       = 'USER:FETCH_CURRENT_USER'
export const FETCH_CATEGORIES         = 'FORUM::FETCH_CATEGORIES'
export const FETCH_CATEGORY           = 'FORUM::FETCH_CATEGORY'
export const FETCH_THREADS            = 'FORUM::FETCH_THREADS'
export const FETCH_CATEGORY_THREADS   = 'FORUM::FETCH_CATEGORY_THREADS'
export const FETCH_IMAGES             = 'STREAM::FETCH_IMAGES'
export const FETCH_IMAGE              = 'STREAM::FETCH_IMAGE'
export const FETCH_THREAD             = 'FORUM::FETCH_THREAD'
export const FETCH_ALBUM              = 'ALBUM::FETCH_ALBUM'
export const FETCH_VERIFICATIONIMAGES = 'STREAM::FETCH_VERIFICATIONIMAGES'
export const FETCH_PROFILEIMAGES      = 'PROFILE::FETCH_PROFILEIMAGES'
export const FETCH_VIDEOS             = 'STREAM::FETCH_VIDEOS'
export const FETCH_VIDEO              = 'VIDEO::FETCH_VIDEO'
export const FETCH_UPDATES            = 'STREAM::FETCH_UPDATES'
export const FETCH_STREAM             = 'STREAM::FETCH_STREAM'
export const FETCH_MESSAGES           = 'STREAM::FETCH_MESSAGES'
export const FETCH_FAVORITES          = 'STREAM::FETCH_FAVORITES'
export const FETCH_LIKES              = 'STREAM::FETCH_LIKES'
export const FETCH_CHAT               = 'CHAT::FETCH_CHAT'
export const FETCH_POSTS              = 'FORUM::FETCH_POSTS'
export const FETCH_POST               = 'FORUM::FETCH_POST'
export const FETCH_REVIEWITEM         = 'REVIEW::FETCH_REVIEWITEM'
export const FETCH_REVIEWLEADERBOARD  = 'REVIEW::FETCH_REVIEWLEADERBOARD'
export const FETCH_POSTS_FOR_THREAD   = 'FORUM::FETCH_POSTS_FOR_THREAD'
export const FETCH_COUNTRIES          = 'APP::FETCH_COUNTRIES'
export const FETCH_STATES             = 'APP::FETCH_STATES'
export const FETCH_CITIES             = 'APP::FETCH_CITIES'

export const FETCH_MOD_ITEMS          = 'MOD::FETCH_MOD_ITEMS'

export const RECEIVE_LIKE             = 'STREAM::RECEIVE_LIKE'
export const RECEIVE_COUNTRY          = 'APP::RECEIVE_COUNTRY'
export const RECEIVE_STATE            = 'APP::RECEIVE_STATE'
export const RECEIVE_CITY             = 'APP::RECEIVE_CITY'
export const RECEIVE_SEARCH_RESULT    = 'SEARCH::RECEIVE_SEARCH_RESULT'

export const SEND_CHAT_MSG            = "CHAT::SEND_CHAT_MSG"

export const DELETE_AVATAR            = 'CONTENT::DELETE_AVATAR'
export const DELETE_PROFILEIMG        = 'CONTENT:DELETE_PROFILEIMG'
export const DELETE_IMAGES            = 'CONTENT:DELETE_IMAGES'
export const DELETE_CHAT_MSG          = 'CHAT::DELETE_CHAT_MSG'

export const CHANGE_SETTING           = 'APP::CHANGE_SETTING'

// ----------------------------------------------------
// Synchronous action helpers
// ----------------------------------------------------

/**
 * Function to reduce redux boilerplate code
 * See: http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 * Deprecated (no longer needed with redux-pack)
 * @returns action
 **/
function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = {
      type,
      // fsa compliance
      payload: {},
      error: null
      // meta: {},
    }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

// ----------------------------------------------------
// Synchronous action creators
// ----------------------------------------------------

export const toggleSearchSidebar   = makeActionCreator(TOGGLE_SEARCH_SIDEBAR)
export const closeSearchSidebar    = makeActionCreator(CLOSE_SEARCH_SIDEBAR)
export const openSearchSidebar     = makeActionCreator(OPEN_SEARCH_SIDEBAR)
export const openSidebar           = makeActionCreator(OPEN_SIDEBAR)
export const closeSidebar          = makeActionCreator(CLOSE_SIDEBAR)

export const setDeviceDetails = (payload) => ({ type: SET_DEVICE_DETAILS, payload });

// ----------------------------------------------------
// Asynchronous action helpers
// ----------------------------------------------------

// function shouldFetchSingle(state) {
//   let response
//   if (!state) {
//     response = true
//   } else if (state.isFetching) {
//     response = false
//   } else {
//     response = state.isStale
//   }
//   console.log('shouldFetchSingle', state, response)
//   return response
// }

// ----------------------------------------------------
// Asynchronous action creators
// ----------------------------------------------------

// TODO
export const sendMessage = (payload) => ({ type: SEND_MESSAGE, payload });

/**
 * fetchCurrentUser Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchCurrentUser = () => (dispatch, getState) => {
  dispatch({
    type: FETCH_CURRENT_USER,
    promise: api.fetchCurrentUser(getState),
  })
}

/**
 * fetchUser Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchUser = (userid) => (dispatch, getState) => {
  dispatch({
    type: FETCH_USER,
    promise: api.fetchUser(getState, userid),
  })
}

/**
 * fetchUserByUsername Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchUserByUsername = (username) => (dispatch, getState) => {
  dispatch({
    type: FETCH_USER_BY_USERNAME,
    promise: api.fetchUserByUsername(getState, username),
  })
}

/**
 * fetchUsers Asynchronous Action Creator
 * @returns Redux-pack action
 */
// TODO: filters
export const fetchUsers = (limit, filters = null)  => (dispatch, getState) => {
  dispatch({
    type: FETCH_USERS,
    promise: api.fetchUsers(getState, limit, filters),
  })
}

/**
 * fetchUsers Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchOnlineUsers = (limit) => (dispatch, getState) => {
  dispatch({
    type: FETCH_ONLINE_USERS,
    promise: api.fetchOnlineUsers(getState, limit),
  })
}

/**
 * fetchFollowers Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchFollowers = (limit) => (dispatch, getState) => {
  dispatch({
    type: FETCH_FOLLOWERS,
    promise: api.fetchFollowers(getState, limit),
  })
}

/**
 * fetchReviewItem Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchReviewItem = (itemid = null) => (dispatch, getState) => {
  dispatch({
    type: FETCH_REVIEWITEM,
    promise: itemid ?
      api.fetchSpecificReviewItem(getState, itemid)
      :
      api.fetchReviewItem(getState),
  })
}

/**
 * fetchReviewLeaderboard Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchReviewLeaderboard = () => (dispatch, getState) => {
  dispatch({
    type: FETCH_REVIEWLEADERBOARD,
    promise: api.fetchReviewLeaderboard(getState)
  })
}

/**
 * fetchCategory Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchCategory = (categoryid) => (dispatch, getState) => {
  dispatch({
    type: FETCH_CATEGORY,
    promise: api.fetchCategory(getState, categoryid),
  })
}

/**
 * fetchPosts Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchPosts = (limit) => (dispatch, getState) => {
  dispatch({
    type: FETCH_POSTS,
    promise: api.fetchPosts(getState, limit)
  })
}

/**
 * fetchPostsForThread Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchPostsForThread = (threadid, limit) => ({
    type: FETCH_POSTS_FOR_THREAD,
    promise: api.fetchPostsForThread(threadid, limit),
})

/**
 * fetchPost Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchPost = (postid) => (dispatch, getState) => {
  dispatch({
    type: FETCH_POST,
    promise: api.fetchPost(getState, postid),
  })
}

/**
 * fetchCategories Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchCategories = () => (dispatch, getState) => {
  dispatch({
    type: FETCH_CATEGORIES,
    promise: api.fetchCategories(getState)
  })
}

/**
 * fetchMessageHistory Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchMessageHistory = (userid) => (dispatch, getState) => {
  dispatch({
    type: FETCH_MESSAGEHISTORY,
    promise: api.fetchMessageHistory(getState, userid),
  })
}

/**
 * fetchUpdates Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchUpdates = (limit) => (dispatch, getState) => {
  dispatch({
    type: FETCH_UPDATES,
    promise: api.fetchUpdates(getState, limit)
  })
}

/**
 * fetchPictures Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchPictures = (limit) => (dispatch, getState) => {
  dispatch({
    type: FETCH_IMAGES,
    promise: api.fetchPictures(getState, limit)
  })
}

/**
 * fetchPicture Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchPicture = (pictureid) => (dispatch, getState) => {
  dispatch({
    type: FETCH_IMAGE,
    promise: api.fetchPicture(getState, pictureid)
  })
}

/**
 * fetchUserVerificationImages Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchUserVerificationImages = (userid) => (dispatch, getState) => {
  dispatch({
    type: FETCH_VERIFICATIONIMAGES,
    promise: api.fetchUserVerificationImages(getState, userid)
  })
}

/**
 * fetchUserProfileImages Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchUserProfileImages = (userid) => (dispatch, getState) => {
  dispatch({
    type: FETCH_PROFILEIMAGES,
    promise: api.fetchUserProfileImages(getState, userid)
  })
}

/**
 * fetchVideos Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchVideos = (limit) => (dispatch, getState) => {
  dispatch({
    type: FETCH_VIDEOS,
    promise: api.fetchVideos(getState, limit)
  })
}

/**
 * fetchVideo Asynchronous (redux-pack) Action
 * @returns Redux-pack action
 */
export const fetchVideo = (id) => (dispatch, getState) => {
  dispatch({
    type: FETCH_VIDEO,
    promise: api.fetchVideo(getState, id)
  })
}

/**
 * fetchStream Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchStream = (limit) => (dispatch, getState) => {
  dispatch({
    type: FETCH_STREAM,
    promise: api.fetchStream(getState, limit),
  })
}

/**
 * fetchMessages Asynchronous Action Creator
 * @returns Redux-packed Action
 */
export const fetchMessages = (limit) => (dispatch, getState) => {
  dispatch({
  type: FETCH_MESSAGES,
  promise: api.fetchMessages(getState, limit),
  })
}

/**
 * fetchFavorites Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchFavorites = (limit) => (dispatch, getState) => {
  dispatch({
    type: FETCH_FAVORITES,
    promise: api.fetchFavorites(getState, limit),
  })
}

/**
 * fetchLikes Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchLikes = (limit) => (dispatch, getState) => {
  dispatch({
    type: FETCH_LIKES,
    promise: api.fetchLikes(getState, limit),
  })
}

/**
 * fetchLikesForVideo Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchLikesForVideo = (itemid) => ({
   type: FETCH_LIKES,
   promise: api.fetchLikesForVideo(itemid, 'likes'),
})

/**
 * fetchAlbum Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchAlbum = (userid) => (dispatch, getState) => {
  dispatch({
    type: FETCH_ALBUM,
    promise: api.fetchAlbum(getState, userid),
  })
}

/**
 * fetchThread Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchThread = (threadid) => (dispatch, getState) => {
  dispatch({
    type: FETCH_THREAD,
    promise: api.fetchThread(getState, threadid)
  })
}

/**
 * fetchThreads Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchThreads = () => (dispatch, getState) => {
  dispatch({
    type: FETCH_THREADS,
    promise: api.fetchThreads(getState),
  })
}

/**
 * fetchThreadsForCategory Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchThreadsForCategory = (categoryid) => ({
  type: FETCH_CATEGORY_THREADS,
  promise: api.fetchThreadsForCategory(categoryid, 'threads'),
})

/**
 * fetchChat Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchChat = () => (dispatch, getState) => {
  dispatch({
    type: FETCH_CHAT,
    promise: api.fetchChat(getState),
  })
}

/**
 * fetchModItems Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchModItems = (limit) => ({
  type: FETCH_MOD_ITEMS,
  promise: api.fetchModItems(limit),
})

export const sendChatMessage = (payload) => ({
  type: SEND_CHAT_MSG,
  promise: api.sendChatMessage(payload),
})

/**
 * recordLike Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const recordLike = (key, id) => ({
  type: RECEIVE_LIKE,
  promise: api.recordLike(`${key}s`, id),
})

/**
 * recordApproval Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const recordApproval = (id, rating) => ({
  type: REVIEW_APPROVE,
  promise: api.recordCrowdDecision(REVIEW_APPROVE, id, rating),
})

/**
 * recordDisapproval Asynchronous Action Creator
 * @returns recordDisapproval() - Action
 */
export const recordDisapproval = (id, rating) => ({
  type: REVIEW_DISAPPROVE,
  promise: api.recordCrowdDecision(REVIEW_DISAPPROVE, id, rating),
})

/**
 * fetchCountries Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchCountries = () => ({
  type: FETCH_COUNTRIES,
  promise: api.fetchCountries(),
})

/**
 * fetchStates Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchStates = () => ({
  type: FETCH_STATES,
  promise: api.fetchStates(),
})

/**
 * fetchCities Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const fetchCities = () => ({
  type: FETCH_CITIES,
  promise: api.fetchCities(),
})

/**
 * updateCountry Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const updateCountry = () => ({
  type: RECEIVE_COUNTRY,
  promise: api.updateCountry(),
})

/**
 * updateState Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const updateState = () => ({
  type: RECEIVE_STATE,
  promise: api.updateState(),
})

/**
 * updateCity Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const updateCity = () => ({
  type: RECEIVE_CITY,
  promise: api.updateCity(),
})

/**
 * removeAvatar Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const removeAvatar = () => ({
  type: DELETE_AVATAR,
  promise: api.removeUserField('avatar'),
})

/**
 * removeProfileImg Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const removeProfileImg = () => ({
  type: DELETE_PROFILEIMG,
  promise: api.removeUserField('profileimg'),
})

/**
 * removeImages Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const removeImages = (itemids) => ({
  type: DELETE_IMAGES,
  promise: api.deleteItems(itemids),
})

/**
 * removeChatMsg Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const removeChatMsg = (itemid) => ({
  type: DELETE_CHAT_MSG,
  promise: api.removeItem('chat', itemid),
})

/**
 * changeSetting Asynchronous Action Creator
 * @returns Redux-pack action
 */
export const changeSetting = (key, value) => ({
  type: CHANGE_SETTING,
  promise: api.changeSetting(key, value),
})
