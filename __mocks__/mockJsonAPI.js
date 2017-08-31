
/**
 * A mock REST server for DEV
 **/

import fetch from 'unfetch'


// TODO: move this into ENV
const PORT = 2222
const API = `http://localhost:${PORT}`


// fake delay
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}


export const fetchFromAPI = (key, selection = null, limit = null) => {
    let url = selection ? `${API}/${key}/${selection}` : `${API}/${key}`
    if (!!limit) {
        url = `${url}?_limit=${limit}`
    }
    return fetch(url)
        .then(r => r.json())
        .then(data => data)
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
                const url = `${API}/streamitems`
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
export const remove = (field) => {
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
