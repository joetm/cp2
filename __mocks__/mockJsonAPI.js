
/**
 * A mock REST server for DEV
 **/


// TODO: move this into ENV
const PORT = 2222
export const ENDPOINT = `http://localhost:${PORT}`


// fake delay
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// TODO
export const sendDataToAPI = (payload) => {
    return delay(500)
        .then(() => {
            try {
                return 200
            } catch (e) {
                throw new Error(e)
            }
        })
}

// TODO
export const markReadRequest = (what, id) => {
    return delay(500)
        .then(() => {
            // TODO
            const unread = { images: 0, messages: 0, posts: 0, videos: 0, likes: 0 }
            unread[what] = 999
            return unread
        })
}

// TODO
export const deleteItems = (items) => {
    return delay(500)
        .then(() => {
            try {
                // TODO
                return items
            } catch (e) {
                throw new Error(e)
            }
        })
}
