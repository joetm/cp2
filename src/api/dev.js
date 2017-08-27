
import {
    fetchUnreadCountFromAPI,
    fetchDataFromAPI,
    fetchStreamItemsFromAPI,
    sendDataToAPI,
    markReadRequest,
    remove,
} from '../../__mocks__/mockServer'

// -------------------------------------------------------------------------
// DEV: ajax fetch data by key from the MockState + dispatch receive methods
// -------------------------------------------------------------------------

export const fetchCurrentUser = () =>
    fetchDataFromAPI('currentUser')
        .then((response) => response)

export const fetchUser = (userid) =>
    fetchDataFromAPI('users', userid)
        .then((response) => response)

export const fetchUsers = () =>
    fetchDataFromAPI('users')
        .then((response) => response)

export const fetchFollowers = () =>
    fetchDataFromAPI('followers')
        .then((response) => response)

export const fetchReviewItem = () =>
    fetchDataFromAPI('reviewitem')
        .then((response) => response)

export const fetchUnreadCount = () =>
    fetchUnreadCountFromAPI()
        .then((response) => response)

export const fetchMessageHistory = (userid) =>
    fetchDataFromAPI('messageHistory', userid)
        .then((response) => {
            if (response === undefined) {
                // this is the first time the message history was accessed for this user
                // TODO: save state
                return {
                    username: "TODO",
                    messages: [],
                }
            }
            return response
        })

export const fetchPosts = () =>
    fetchStreamItemsFromAPI('post')
        .then((response) => response)

export const fetchThreads = () =>
    fetchStreamItemsFromAPI('post')
        .then((response) => {
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
    fetchStreamItemsFromAPI('image')
        .then((response) => response)

export const fetchAll = () =>
    fetchStreamItemsFromAPI(null)
        .then((response) => response)

export const fetchPictures = () =>
    fetchStreamItemsFromAPI('image')
        .then((response) => response)

// alias
export const fetchImages = fetchPictures

export const fetchVideos = () =>
    fetchStreamItemsFromAPI('video')
        .then((response) => response)

export const fetchVideo = () =>
    fetchDataFromAPI('video')
        .then((response) => response)

export const fetchNotifications = () =>
    fetchStreamItemsFromAPI('message')
        .then((response) => response)

export const fetchFavorites = () =>
    fetchStreamItemsFromAPI(null)
        .then((response) => response)

export const fetchLikes = () =>
    fetchStreamItemsFromAPI('like')
        .then((response) => response)

export const fetchThread = (threadid) =>
    fetchDataFromAPI('thread', threadid)
        .then((response) => response)



export const recordLike = (payload) =>
    sendDataToAPI(payload)
        .then((response) => response)

export const recordDislike = (payload) =>
    sendDataToAPI(payload)
        .then((response) => response)


// TODO
export const markRead = (what, id) => {
    console.log('markRead', what, id)
    return markReadRequest(what, id)
        .then((response) => response)
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
    sendDataToAPI(country)
        .then((response) => response)

// TODO
export const updateState = (state) =>
    sendDataToAPI(state)
        .then((response) => response)

// TODO
export const updateCity = (city) =>
    sendDataToAPI(city)
        .then((response) => response)

// TODO
export const removeField = () =>
    remove('profileimg')
        .then((response) => response)

