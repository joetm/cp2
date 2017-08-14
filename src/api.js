
import { fetchData } from '../__mocks__/mockServer'

// -------------------------------------------------------------------------
// DEV: ajax fetch data by key from the MockState + dispatch receive methods
// -------------------------------------------------------------------------

export const fetchUser = (userid) => {
    // TODO : use userid
    fetchData('user')
        .then((response) => response)
}

export const fetchReviewItem = () => {
    fetchData('reviewitem')
        .then((response) => response)
}

export const fetchPosts = () => {
    fetchData('posts')
        .then((response) => response)
}
