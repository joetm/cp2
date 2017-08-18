
import { fetchDataFromAPI, fetchStreamItemsFromAPI } from '../__mocks__/mockServer'

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

export const fetchMessageHistory = () =>
    fetchDataFromAPI('messageHistory')
        .then((response) => response)

export const fetchPosts = () =>
    fetchStreamItemsFromAPI('post')
        .then((response) => response)

export const fetchAll = () =>
    fetchStreamItemsFromAPI(null)
        .then((response) => response)

export const fetchNotifications = () =>
    fetchStreamItemsFromAPI('message')
        .then((response) => response)

export const fetchLikes = () =>
    fetchStreamItemsFromAPI('like')
        .then((response) => response)

// TODO: use threadid
export const fetchThread = (threadid) =>
    fetchStreamItemsFromAPI('thread', threadid)
        .then((response) => response)



export const recordLike = (payload) =>
    sendDataToAPI(payload)
        .then((response) => response)

export const recordDislike = (payload) =>
    sendDataToAPI(payload)
        .then((response) => response)
