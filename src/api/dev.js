
import * as jsonAPI from '../../__mocks__/mockJsonAPI'
import { REVIEW_APPROVE, REVIEW_DISAPPROVE } from '../actions'

// -------------------------------------------------------------------
// DEV: ajax fetch data from mock json API + dispatch receive methods
// -------------------------------------------------------------------

const createFetchField = (field) => (limit = null) => {
    return jsonAPI.fetchFromAPI(field, null, limit)
        .then(response => response)
}
const createFetchAndSelectField = (field) => (selection = null) => {
    return jsonAPI.fetchFromAPI(field, selection)
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

// -------------------------------------------------------------------

export const fetchUser = createFetchAndSelectField('users')
export const fetchPicture = createFetchAndSelectField('images')
export const fetchVideo = createFetchAndSelectField('videos')
export const fetchNotification = createFetchAndSelectField('messages')
export const fetchThread = createFetchAndSelectField('threads')
export const fetchReviewItem = createFetchAndSelectField('reviewitems')

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

// alias
export const fetchImages = fetchPictures
export const fetchImage  = fetchPicture

// -------------------------------------------------------------------

export const sendChatMessage = (payload) =>
    jsonAPI.sendDataToAPI(payload)
        .then(response => {
            if (response === 200) {
                return payload
            }
        })

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
    const payload = {
        id,
        rating
    }
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
export const removeField = (field) =>
    jsonAPI.removeField(field)
        .then(response => response)
