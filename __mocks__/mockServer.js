
/**
 * A mock REST server for DEV
 **/

import mockState from './mockState'


const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const fetchDataFromAPI = (key, selection) => {
    return delay(500)
        .then(() => {
            try {
                // selection -> return only the queried fields
                if (selection !== undefined) {
                    return mockState[key]["" + selection]
                }
                return mockState[key]
            } catch (e) {
                throw new Error(e)
            }
        })
}

export const fetchStreamItemsFromAPI = (filter) => {
    return delay(500)
        .then(() => {
            try {

                // filter for two types, e.g. ["images","videos"]
                if (Array.isArray(filter)) {

                    let results = []
                    filter.forEach(filteritem => {
                        results.concat(
                            mockState.streamitems.filter(item =>
                                item.type === filter
                            )
                        )
                    })
                    return results

                // no filter defined -> return all items
                } else if (filter === null) {

                    return mockState.streamitems

                // filter by provided type
                } else {

                    return mockState.streamitems.filter(item =>
                        item.type === filter
                    )

                }
            } catch (e) {
                throw new Error(e)
            }
        })
}

export const fetchUnreadCountFromAPI = () => {
    return delay(500)
        .then(() => {
            try {
                // return mockState.appState.unread
                const unread = {
                    posts: 0,
                    images: 0,
                    videos: 0,
                    messages: 0,
                    likes: 0,
                }
                mockState.streamitems.forEach((item) => {
                    switch(item.type) {
                        case 'post':
                            unread.posts = unread.posts + 1
                            break
                        case 'image':
                            unread.images = unread.images + 1
                            break
                        case 'video':
                            unread.videos = unread.videos + 1
                            break
                        case 'message':
                            unread.messages = unread.messages + 1
                            break
                        case 'like':
                            unread.likes = unread.likes + 1
                            break
                    }
                })
                return unread
            } catch (e) {
                throw new Error(e)
            }
        })
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
