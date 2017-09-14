
import * as jsonAPI from '../../__mocks__/mockJsonAPI'
import fetch from 'unfetch'

import routes from '../routes'
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
    const baseRoute = prefixSlash(key)
    const itemRoute = itemid ? `/${itemid}` : ''
    const url = `${jsonAPI.ENDPOINT}${baseRoute}${itemRoute}`
    // console.log('fetchItem', baseRoute, itemid, payload, url)
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

const fetchItems = (key, limit) => {
    const baseRoute = prefixSlash(key)
    let url = `${jsonAPI.ENDPOINT}${baseRoute}`
    if (limit) {
        url = `${url}?_start=1&_limit=${limit}`
    }
    // console.log('fetchItems', baseRoute, itemid, url)
    return fetch(url, { headers: JSON_HEADER })
      .then(response => response.json())
      .then(data => {
        return limit !== 1 ? data : data[0]
      })
      .catch(error => throwError(error.message || 'Something went wrong'))
}

const fetchItem = (key, itemid) => {
    const baseRoute = prefixSlash(key)
    const itemRoute = `/${itemid}`
    const url = `${jsonAPI.ENDPOINT}${baseRoute}${itemRoute}`
    // console.log('PATCH', baseRoute, itemid, url)
    return fetch(url, { headers: JSON_HEADER })
      .then(response => response.json())
      .then(data => data)
      .catch(error => throwError(error.message || 'Something went wrong'))
}

const incrementItem = (key, itemid = null, field, increment = 1) => {
  // TODO
  // 2 requests -> this is to be done on the server
  const baseRoute = prefixSlash(key)
  const url = `${jsonAPI.ENDPOINT}${baseRoute}/${itemid}`
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

// -------------------------------------------------------------------
// creators
// -------------------------------------------------------------------

const selectItemsCreator = (field) => (limit = null) =>
    fetchItems(field, limit)

const selectFirstItemCreator = (field) => () =>
    fetchItems(field, 1)

const selectSpecificItemCreator = (field) => (selection = null) =>
    fetchItem(field, selection)

// -------------------------------------------------------------------

export const fetchCurrentUser = selectItemsCreator('currentUser')
export const fetchUsers = selectItemsCreator('users')
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
// alias
export const fetchImages = fetchPictures

// -------------------------------------------------------------------

export const fetchUser = selectSpecificItemCreator('users')
export const fetchPicture = selectSpecificItemCreator('images')
export const fetchImage  = fetchPicture
export const fetchPost = selectSpecificItemCreator('posts')
export const fetchThread = selectSpecificItemCreator('threads')
export const fetchVideo = selectSpecificItemCreator('videos')
export const fetchNotification = selectSpecificItemCreator('messages')

// -------------------------------------------------------------------
// TODO - this one is different - it selects images by the userid
export const fetchUserVerificationImages = selectSpecificItemCreator('verifications')

// -------------------------------------------------------------------

export const fetchReviewItem = selectFirstItemCreator('reviewitems')

// -------------------------------------------------------------------

// TODO
export const fetchContactRequests = (limit = null) =>
    jsonAPI.fetchFromProtectedAPI('mod', 'contactRequests', limit)
        .then(response => response.json())
        .then(data => data)
        .catch(error => throwError(error.message || "Something went wrong"))

// -------------------------------------------------------------------

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
            return response.json()
        })
        .then(data => data)
        .catch(error => throwError(error.message || "Something went wrong"))

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
            .then(data => data)
            .catch(error => throwError(error.message || 'Something went wrong'))
}

// -------------------------------------------------------------------

export const recordLike = (key, id) =>
  incrementItem(key, id, 'likes', 1)

export const recordDislike = (key, id) =>
  incrementItem(key, id, 'dislikes', 1)

// -------------------------------------------------------------------

// TODO
export const recordCrowdDecision = (vote, id, rating = null) => {
  const payload = { id, rating }
  // TODO: REVIEW_APPROVE / REVIEW_DISAPPROVE
  return jsonAPI.sendDataToAPI(payload)
    .then(response => response.json())
    .then(
      data => data,
      error => throwError(error.message || 'Something went wrong')
    )
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

// TODO
// export const markAllRead = () =>
//     sendDataToAPI()
//         .then((response) => ({images: 0, messages: 0, posts: 0, videos: 0, likes: 0}))


// -------------------------------------------------------------------

const makeAjaxCallCreator = (url) => () =>
  fetch(url)
    .then(response => response.json())
    .then(
      data => data,
      error => throwError(error.message || 'Something went wrong')
    )

export const fetchCountries = makeAjaxCallCreator('/data/countries.json')
export const fetchStates = makeAjaxCallCreator('/data/states.json')
export const fetchCities = makeAjaxCallCreator('/data/cities.json')

// -------------------------------------------------------------------

export const changeSetting = (field, value) =>
  patchItem('currentUser', null, {[field]: value})

export const removeUserField = (field) =>
  patchItem('currentUser', null, {[field]: null})

// -------------------------------------------------------------------

export const deleteItems = (items) =>
  jsonAPI.deleteItems(items)
    .then(response => response.json())
    .catch(error => throwError(error.message || 'Something went wrong'))

// -------------------------------------------------------------------

export const find = (key, field, returnEmpty = false) => {
  const url = `${jsonAPI.ENDPOINT}${prefixSlash(key)}?q=${encodeURIComponent(field)}`
  console.log('find', key, field, url)
  return fetch(url, {headers: JSON_HEADER})
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
