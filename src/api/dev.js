
import * as jsonAPI from '../../__mocks__/mockJsonAPI'
import fetch from 'unfetch'

import { CHAT } from '../routes'
// import { REVIEW_APPROVE, REVIEW_DISAPPROVE } from '../actions'

const JSON_HEADER = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const throwError = (msg) => { throw new Error(msg) }

const prefixSlash = (key) => {
 return key.substring(0, 1) !== '/' ? `/${key}` : key
}

// -------------------------------------------------------------------
// API functions
// -------------------------------------------------------------------

const createNewItem = (field, payload) =>
    fetch(`${jsonAPI.ENDPOINT}${prefixSlash(field)}`, {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(payload),
    })
    .then(
      response => {
        // console.log('response', response)
        if (response.status === 201) {
          return response.json()
        }
        throw new Error(`Something went wrong: [${response.status}] ${response.statusText}`)
      }
    ).then(
      data => data,
      error => throwError(error.message || 'Something went wrong')
    )

const patchItem = (key, itemid = null, payload) => {
    const itemRoute = itemid ? `/${itemid}` : ''
    const url = `${jsonAPI.ENDPOINT}${prefixSlash(key)}${itemRoute}`
    // console.log('patchItem', itemid, payload, url)
    return fetch(url, {
      method: 'PATCH',
      headers: JSON_HEADER,
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(
      data => data,
      error => throwError(error.message || 'Something went wrong')
    )
}

const deleteItem = (key, itemid) => {
    const url = `${jsonAPI.ENDPOINT}${prefixSlash(key)}/${itemid}`
    console.log('deleteItem', key, itemid, url)
    return fetch(url, {
      method: 'DELETE',
      headers: JSON_HEADER
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => throwError(error.message || 'Something went wrong'))
}

const fetchItems = (key, limit = null) => {
    let url = `${jsonAPI.ENDPOINT}${prefixSlash(key)}`
    if (limit) {
        url = `${url}?_start=1&_limit=${limit}`
    }
    // console.log('fetchItems', key, limit, url)
    return fetch(url, { headers: JSON_HEADER })
      .then(response => response.json())
      .then(data => {
        return limit !== 1 ? data : data[0]
      })
      .catch(error => throwError(error.message || 'Something went wrong'))
}

const fetchItem = (key, itemid) => {
    const url = `${jsonAPI.ENDPOINT}${prefixSlash(key)}/${itemid}`
    // console.log('PATCH', key, itemid, url)
    return fetch(url, { headers: JSON_HEADER })
      .then(response => response.json())
      .then(data => data)
      .catch(error => throwError(error.message || 'Something went wrong'))
}

const incrementItem = (key, itemid = null, field, increment = 1) => {
    // TODO
    // 2 requests -> this is to be done on the server
    const url = `${jsonAPI.ENDPOINT}${prefixSlash(key)}/${itemid}`
    // console.log('fetch item', key, itemid, field, increment, url)
    return fetch(url, {
      headers: JSON_HEADER
    })
      .then(response => response.json())
      .then(item => {
          // console.log('patch item', key, itemid, field, item[field])
          return patchItem(key, itemid, {[field]: item[field] + increment})
      })
      .catch(error => throwError(error.message || "Something went wrong"))
}

const fetchSubitemsForItem = (key, itemid, subitemtype = 'streamitems', limit = null) => {
    let url = `${jsonAPI.ENDPOINT}${prefixSlash(key)}/${itemid}/${subitemtype}`
    if (limit) {
        url = `${url}?_start=1&_limit=${limit}`
    }
    console.log('fetchSubitemsForItem', key, itemid, subitemtype, limit, url)
    return fetch(url, { headers: JSON_HEADER })
      .then(response => response.json())
      .then(data => {
        return limit !== 1 ? data : data[0]
      })
      .catch(error => throwError(error.message || 'Something went wrong'))
}

// -------------------------------------------------------------------
// creators
// -------------------------------------------------------------------

const selectItemsCreator = (field) => (limit = null) =>
    fetchItems(field, limit)

const selectFirstItemCreator = (field) => () =>
    fetchItems(field, 1)

const selectSpecificItemCreator = (field) => (selection = null) =>
    fetchItem(field, selection)

const selectSubitemsForItemCreator = (key) => (...args) =>
    fetchSubitemsForItem(key, ...args)

// -------------------------------------------------------------------

export const fetchCurrentUser = selectItemsCreator('currentUser')
export const fetchUsers = selectItemsCreator('users')
// TODO
export const fetchOnlineUsers = selectItemsCreator('users')
//
export const fetchChat = selectItemsCreator('chat')
export const fetchPosts = selectItemsCreator('posts')
export const fetchCategories = selectItemsCreator('categories')
export const fetchThreads = selectItemsCreator('threads')
export const fetchAlbum = selectItemsCreator('images')
export const fetchUpdates = selectItemsCreator('streamitems')
export const fetchPictures = selectItemsCreator('images')
export const fetchFollowers = selectItemsCreator('followers')
export const fetchVideos = selectItemsCreator('videos')
export const fetchStream = selectItemsCreator('streamitems')
export const fetchMessages = selectItemsCreator('messages')
export const fetchLikes = selectItemsCreator('likes')
export const fetchFavorites = selectItemsCreator('favorites')
export const fetchReviewLeaderboard = selectItemsCreator('reviewLeaderboard')
// alias
export const fetchImages = fetchPictures

// -------------------------------------------------------------------

export const fetchPostsForThread = selectSubitemsForItemCreator('threads')
export const fetchThreadsForCategory = selectSubitemsForItemCreator('categories')
export const fetchLikesForVideo = selectSubitemsForItemCreator('videos')

// -------------------------------------------------------------------

export const fetchUser = selectSpecificItemCreator('users')
export const fetchPicture = selectSpecificItemCreator('images')
export const fetchImage  = fetchPicture
export const fetchPost = selectSpecificItemCreator('posts')
export const fetchThread = selectSpecificItemCreator('threads')
export const fetchVideo = selectSpecificItemCreator('videos')
export const fetchNotification = selectSpecificItemCreator('messages')
export const fetchMessageHistory = selectSpecificItemCreator('messageHistory')
export const fetchCategory = selectSpecificItemCreator('categories')

// -------------------------------------------------------------------
// this one is different - it selects images by the userid
export const fetchUserVerificationImages = selectSpecificItemCreator('verifications')
export const fetchUserProfileImages = selectSpecificItemCreator('profileimgs')

// -------------------------------------------------------------------

export const fetchReviewItem = selectFirstItemCreator('reviewitems')
export const fetchSpecificReviewItem = selectSpecificItemCreator('reviewitems')

// -------------------------------------------------------------------

// TODO
const fetchFromProtectedAPI = (key, selection, limit = null) => {
    let url = `${jsonAPI.ENDPOINT}/${key}/${selection}`
    if (limit) {
        url = `${url}?_start=1&_limit=${limit}`
    }
    // console.log('fetchFromProtectedAPI', key, selection, limit, url)
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (limit === 1 && data instanceof Array) {
                return data[0]
            }
            return data
        })
        .catch(error => throwError(error.message || 'Something went wrong'))
}

// TODO
export const fetchModItems = (limit = null) =>
    fetchFromProtectedAPI('mod', 'threads', limit)

// -------------------------------------------------------------------

export const sendChatMessage = (payload) => {
    // TODO
    const chatMsg = {
      type: "message", // TODO - not on client - NEEDED?
      content: payload.content,
      userid: payload.userid, // TODO
      likes: 0, // TODO - not on client
      dislikes: 0, // TODO - not on client
      timestamp: +new Date(),
    }
    return createNewItem(CHAT, chatMsg)
            .then(data => data)
            .catch(error => throwError(error.message || 'Something went wrong'))
}

// -------------------------------------------------------------------
// Incrementors
// -------------------------------------------------------------------

export const recordLike = (key, id) =>
  incrementItem(key, id, 'likes')

export const recordDislike = (key, id) =>
  incrementItem(key, id, 'dislikes')

export const recordApproval = (key, id) =>
  incrementItem(key, id, 'approvals')

export const recordDisapproval = (key, id) =>
  incrementItem(key, id, 'disapprovals')

// -------------------------------------------------------------------

// TODO
export const recordCrowdDecision = (vote, id, rating = null) => {
  const payload = { id, rating }
  // TODO: REVIEW_APPROVE / REVIEW_DISAPPROVE
  // TODO: do this with patch
  return jsonAPI.sendDataToAPI(payload)
    .then(response => response.json())
    .then(data => data)
    .catch(error => throwError(error.message || 'Something went wrong'))
}

// TODO
export const markRead = (what, id) => {
  console.log('markRead', what, id)
  return jsonAPI.markReadRequest(what, id)
    .then(response => response.json())
    .then(
      data => data,
      error => throwError(error.message || 'Something went wrong')
    )
}

// -------------------------------------------------------------------
// ajax calls for files
// -------------------------------------------------------------------

const makeAjaxCallCreator = (url) => () =>
  fetch(url)
    .then(response => response.json())
    .then(
      data => data,
      error => throwError(error.message || 'Something went wrong')
    )

export const fetchCountries = makeAjaxCallCreator('/data/countries.json')
export const fetchStates    = makeAjaxCallCreator('/data/states.json')
export const fetchCities    = makeAjaxCallCreator('/data/cities.json')

// -------------------------------------------------------------------

export const changeSetting = (field, value) =>
  patchItem('currentUser', null, {[field]: value})

export const removeUserField = (field) =>
  patchItem('currentUser', null, {[field]: null})

// -------------------------------------------------------------------

export const removeItem = (key, itemid) =>
  deleteItem(key, itemid)

// TODO?
// export const removeItems = (key, itemids) =>
//   deleteItems(key, itemids)

// -------------------------------------------------------------------

export const find = (key, field, returnEmpty = false) => {
  const url = `${jsonAPI.ENDPOINT}${prefixSlash(key)}?q=${encodeURIComponent(field)}`
  // console.log('find', key, field, returnEmpty, url)
  return fetch(url, { headers: JSON_HEADER })
  .then(response => response.json())
  .then(data => {
    const found = !!data.length
    // console.log('search result', data, 'found', found)
    if (returnEmpty) {
      return found
    }
    return data
  })
  .catch(error => throwError(error.message || `Not found: [${error}]`))
}
