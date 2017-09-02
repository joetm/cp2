
import * as jsonAPI from '../../__mocks__/mockJsonAPI'

// -------------------------------------------------------------------
// DEV: ajax fetch data from mock json API + dispatch receive methods
// -------------------------------------------------------------------

export const fetchCurrentUser = () =>
    jsonAPI.fetchFromAPI('currentUser')
        .then(response => response)

export const fetchUser = (userid) =>
    jsonAPI.fetchFromAPI('users', userid)
        .then(response => response)

export const fetchUsers = (limit) =>
    jsonAPI.fetchFromAPI('users', null, limit)
        .then(response => response)

export const fetchFollowers = (limit) =>
    jsonAPI.fetchFromAPI('followers', null, limit)
        .then(response => response)

export const fetchReviewItem = () =>
    jsonAPI.fetchFromAPI('reviewitem')
        .then(response => response)

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

export const fetchPosts = (limit) =>
    jsonAPI.fetchFromAPI('posts', null, limit)
        .then(response => response)

export const fetchThreads = (limit) =>
    jsonAPI.fetchFromAPI('posts', null, limit)
        .then(response => {
            // TODO : only return the first post in a thread
            const ret = []
            const threadids = []
            response.forEach(item => {
                if (item.threadid) {
                    if (threadids.indexOf(item.threadid) === -1) {
                        threadids.push(item.threadid)
                        ret.push(item)
                    }
                }
            })
            return ret
        })

export const fetchAlbum = (userid) =>
    jsonAPI.fetchFromAPI('images')
        .then(response => response)

export const fetchUpdates = (limit) =>
    jsonAPI.fetchFromAPI('streamitems', null, limit)
        .then(response => response)

export const fetchPictures = (limit) =>
    jsonAPI.fetchFromAPI('images', null, limit)
        .then(response => response)

export const fetchPicture = (imageid) =>
    jsonAPI.fetchFromAPI('image', imageid)
        .then(response => response)

// alias
export const fetchImages = fetchPictures
export const fetchImage  = fetchPicture

export const fetchVideos = (limit) =>
    jsonAPI.fetchFromAPI('videos', null, limit)
        .then(response => response)

export const fetchVideo = (videoid) =>
    jsonAPI.fetchFromAPI('video')
        .then(response => response)

export const fetchStream = (limit) =>
    jsonAPI.fetchFromAPI('streamitems', null, limit)
        .then(response => response)

export const fetchNotifications = (limit) =>
    jsonAPI.fetchFromAPI('messages', null, limit)
        .then(response => response)

export const fetchFavorites = (limit) =>
    jsonAPI.fetchFromAPI('favorites', null, limit)
        .then(response => response)

export const fetchLikes = (limit) =>
    jsonAPI.fetchFromAPI('likes', null, limit)
        .then(response => response)

export const fetchThread = (threadid) =>
    jsonAPI.fetchFromAPI('thread', threadid)
        .then(response => response)


export const sendChatMessage = (payload) =>
    jsonAPI.sendDataToAPI(payload)
        .then(response => response)

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


export const fetchCountries = () =>
    fetch('/data/countries.json')
        .then(response => response.json())
        .then(countries => countries)

// TODO
export const fetchStates = () =>
    fetch('/data/states.json')
        .then(response => response.json())
        .then(states => states)

// TODO
export const fetchCities = () =>
    fetch('/data/cities.json')
        .then(response => response.json())
        .then(cities => cities)


// TODO
export const updateCountry = (country) =>
    jsonAPI.sendDataToAPI(country)
        .then(response => response)

// TODO
export const updateState = (state) =>
    jsonAPI.sendDataToAPI(state)
        .then(response => response)

// TODO
export const updateCity = (city) =>
    jsonAPI.sendDataToAPI(city)
        .then(response => response)

// TODO
export const removeField = () =>
    jsonAPI.remove('profileimg')
        .then(response => response)

