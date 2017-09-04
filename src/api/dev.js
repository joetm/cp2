
import * as jsonAPI from '../../__mocks__/mockJsonAPI'

// -------------------------------------------------------------------
// DEV: ajax fetch data from mock json API + dispatch receive methods
// -------------------------------------------------------------------

const makeAPICallCreator = (field, limit = null) => (selection = null) => {
    return jsonAPI.fetchFromAPI(field, selection, limit)
        .then(response => response)
}

// -------------------------------------------------------------------

export const fetchCurrentUser = makeAPICallCreator('currentUser')
export const fetchUsers = makeAPICallCreator('users')
export const fetchChat = makeAPICallCreator('chat')
export const fetchPosts = makeAPICallCreator('posts')
export const fetchThreads = makeAPICallCreator('threads')
export const fetchAlbum = makeAPICallCreator('images')
export const fetchUpdates = makeAPICallCreator('streamitems')
export const fetchPictures = makeAPICallCreator('images')
export const fetchFollowers = makeAPICallCreator('followers')
export const fetchVideos = makeAPICallCreator('videos')
export const fetchStream = makeAPICallCreator('streamitems')
export const fetchNotifications = makeAPICallCreator('messages')
export const fetchLikes = makeAPICallCreator('likes')
export const fetchFavorites = makeAPICallCreator('favorites')

// -------------------------------------------------------------------

export const fetchUser = makeAPICallCreator('users', 1)
export const fetchPicture = makeAPICallCreator('images', 1)
export const fetchVideo = makeAPICallCreator('videos', 1)
export const fetchNotification = makeAPICallCreator('messages', 1)
export const fetchThread = makeAPICallCreator('threads', 1)
export const fetchReviewItem = makeAPICallCreator('reviewitems', 1)

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

export const recordLike = (payload) =>
    jsonAPI.sendDataToAPI(payload)
        .then(response => response)

export const recordDislike = (payload) =>
    jsonAPI.sendDataToAPI(payload)
        .then(response => response)


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
