
import * as jsonAPI from '../../__mocks__/mockJsonAPI'
import fetch from 'unfetch'

import routes from '../routes'
// import { REVIEW_APPROVE, REVIEW_DISAPPROVE } from '../actions'

// -------------------------------------------------------------------
// DEV: ajax fetch data from mock json API + dispatch receive methods
// -------------------------------------------------------------------

const createFetchField = (field) => (limit = null) => {
    return jsonAPI.fetchFromAPI(field, null, limit)
        .then(response => response)
}
const createFetchAndSelectSpecificItem = (field) => (selection = null) => {
    return jsonAPI.fetchFromAPI(field, selection)
        .then(response => response)
}
const createFetchAndSelectFirstItem = (field) => () => {
    return jsonAPI.fetchFromAPI(field, null, 1)
        .then(response => response)
}

// -------------------------------------------------------------------

export const fetchCurrentUser = createFetchField('currentUser')
export const fetchUsers = createFetchField('users')
export const fetchChat = createFetchField('chat')
export const fetchPosts = createFetchField('posts')
export const fetchThreads = createFetchField('threads')
export const fetchAlbum = createFetchField('images')
export const fetchUpdates = createFetchField('streamitems')
export const fetchPictures = createFetchField('images')
export const fetchFollowers = createFetchField('followers')
export const fetchVideos = createFetchField('videos')
export const fetchStream = createFetchField('streamitems')
export const fetchNotifications = createFetchField('messages')
export const fetchLikes = createFetchField('likes')
export const fetchFavorites = createFetchField('favorites')
// alias
export const fetchImages = fetchPictures

// -------------------------------------------------------------------

export const fetchUser = createFetchAndSelectSpecificItem('users')
export const fetchPicture = createFetchAndSelectSpecificItem('images')
export const fetchVideo = createFetchAndSelectSpecificItem('videos')
export const fetchNotification = createFetchAndSelectSpecificItem('messages')
export const fetchThread = createFetchAndSelectSpecificItem('threads')
export const fetchUserVerificationImages = createFetchAndSelectSpecificItem('verifications')
// alias
export const fetchImage  = fetchPicture

// -------------------------------------------------------------------

export const fetchReviewItem = createFetchAndSelectFirstItem('reviewitems')

// -------------------------------------------------------------------

// TODO
export const fetchContactRequests = (limit = null) =>
    jsonAPI.fetchFromProtectedAPI('mod', 'contactRequests', limit)
        .then(response => response)

// -------------------------------------------------------------------

export const fetchUnreadCount = () =>
    jsonAPI.fetchUnreadCountFromAPI()
        .then(response => response)

export const fetchMessageHistory = (userid) =>
    jsonAPI.fetchFromAPI('messageHistory', userid)
        .then(response => {
            if (response === undefined) {
                // this is the first time the message history was accessed for this user
                // TODO: save the new state (?)
                return {
                    username: "TODO",
                    messages: [],
                }
            }
            return response
        })

// -------------------------------------------------------------------

const createNewItem = (field, payload) =>
    fetch(`${jsonAPI.ENDPOINT}${field}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      // console.log('response', response)
      if (response.status === 201) {
        return response.json()
      } else {
        throw new Error(`Something went wrong: [${response.status}] ${response.statusText}`)
      }
    })

// -------------------------------------------------------------------

export const sendChatMessage = (payload) => {
    const chatMsg = {
      type: "message", // TODO - not on client - NEEDED?
      content: payload.content,
      userid: payload.userid, // TODO
      like: 0, // TODO - not on client
      dislike: 0, // TODO - not on client
      timestamp: +new Date(),
    }
    return createNewItem(routes.CHAT, chatMsg)
      .then(data => {
        // console.log('data', data)
        // TODO
        // fake expansion of user data:
        // return {...data, user: {
        //   id: payload.userid,
        //   username: payload.username,
        //   avatar: payload.avatar,
        // }}
        return data
      })
}

// TODO
export const recordLike = (payload) =>
  jsonAPI.sendDataToAPI(payload)
    .then(response => response)

// TODO
export const recordDislike = (payload) =>
  jsonAPI.sendDataToAPI(payload)
    .then(response => response)

// TODO
export const recordCrowdDecision = (vote, id, rating = null) => {
  const payload = { id, rating }
  // TODO: REVIEW_APPROVE / REVIEW_DISAPPROVE
  return jsonAPI.sendDataToAPI(payload)
    .then(response => response)
}

// TODO
export const markRead = (what, id) => {
  console.log('markRead', what, id)
  return jsonAPI.markReadRequest(what, id)
    .then(response => response)
}

// TODO
// export const markAllRead = () =>
//     sendDataToAPI()
//         .then((response) => ({images: 0, messages: 0, posts: 0, videos: 0, likes: 0}))


// -------------------------------------------------------------------

const makeAjaxCallCreator = (url) => () =>
  fetch(url)
    .then(response => response.json())
    .then(data => data)

export const fetchCountries = makeAjaxCallCreator('/data/countries.json')
export const fetchStates = makeAjaxCallCreator('/data/states.json')
export const fetchCities = makeAjaxCallCreator('/data/cities.json')

// -------------------------------------------------------------------

export const changeSetting = (key, value) =>
  jsonAPI.changeSetting(key, value)
    .then(response => response)

// TODO
export const removeUserField = (field) =>
  jsonAPI.removeUserField(field)
    .then(response => response)

export const deleteItems = (items) =>
  jsonAPI.deleteItems(items)
    .then(response => response)
