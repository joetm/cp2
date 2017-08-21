
import { fetchUnreadCountFromAPI, fetchDataFromAPI, fetchStreamItemsFromAPI } from '../__mocks__/mockServer'

// -------------------------------------------------------------------------
// DEV: ajax fetch data by key from the MockState + dispatch receive methods
// -------------------------------------------------------------------------

export const fetchCurrentUser = () =>
    fetchDataFromAPI('currentUser')
        .then((response) => response)

export const fetchUser = (userid) =>
    fetchDataFromAPI('users', userid)
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

export const fetchNotifications = () =>
    fetchStreamItemsFromAPI('message')
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
