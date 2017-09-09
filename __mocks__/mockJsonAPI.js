
/**
 * A mock REST server for DEV
 **/

import fetch from 'unfetch'


// TODO: move this into ENV
const PORT = 2222
export const ENDPOINT = `http://localhost:${PORT}`


// fake delay
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}


export const fetchFromAPI = (field, selection = null, limit = null, filters = null) => {
    let url = selection ? `${ENDPOINT}/${field}/${selection}` : `${ENDPOINT}/${field}`
    let SEPARATOR = '?'
    if (limit) {
        url = `${url}?_start=1&_limit=${limit}`
        SEPARATOR = '&'
    }
    // if (filters) {
    //     console.log('filters', filters)
    //     for (let key in filters) {
    //         if (filters.hasOwnProperty(key) && filters[key]) {
    //             url = `${url}${SEPARATOR}${key}=${filters[key]}`
    //             SEPARATOR = '&'
    //         }
    //     }
    // }
    console.log('fetchFromAPI', 'field:', field, 'selection:', selection, 'limit:', limit, 'url:', url)
    return fetch(url)
        .then(r => r.json())
        .then(data => {
            if (limit === 1 && data instanceof Array) {
                return data[0]
            }
            return data
        })
        // .catch(error => throw new Error(error))
}


// TODO
export const fetchFromProtectedAPI = (key, selection, limit = null) => {
    let url = `${ENDPOINT}/${key}/${selection}`
    if (limit) {
        url = `${url}?_start=1&_limit=${limit}`
    }
    // console.log('fetchFromAPI', key, selection, limit, url)
    return fetch(url)
        .then(r => r.json())
        .then(data => {
            if (limit === 1 && data instanceof Array) {
                return data[0]
            }
            return data
        })
        // .catch(error => throw new Error(error))
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
                const url = `${ENDPOINT}/streamitems`
                return fetch(url)
                  .then(r => r.json())
                  .then(data => {
                    data.forEach((item) => {
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
                  })

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
export const changeSetting = (key, value) => {
    return delay(500)
        .then(() => {
            try {
                return {
                    [key]: value
                }
            } catch (e) {
                throw new Error(e)
            }
        })
}

// TODO
export const removeUserField = (field) => {
    return delay(500)
        .then(() => {
            try {
                // console.log(`TODO: delete ${field}`)
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
