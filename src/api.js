
import { fetchDataFromAPI } from '../__mocks__/mockServer'

// -------------------------------------------------------------------------
// DEV: ajax fetch data by key from the MockState + dispatch receive methods
// -------------------------------------------------------------------------

export const fetchCurrentUser = () =>
    fetchDataFromAPI('currentUser')
        .then((response) => response)

export const fetchUser = (userid) =>
    // TODO : use userid
    fetchDataFromAPI('user')
        .then((response) => response)


export const fetchReviewItem = () =>
    fetchDataFromAPI('reviewitem')
        .then((response) => response)


export const fetchPosts = () =>
    fetchDataFromAPI('posts')
        .then((response) => response)

