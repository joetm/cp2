
import cuid from 'cuid'

/**
 * Redux Initial Store State
 **/

/**
 * INITIAL STATE OF APPLICATION
 **/

const initialState = {
    // -- state --
    sidebarOpen: false,
    // -- content --
    threads: [],
    posts: [],
    post: {
        id: cuid(),
        msg: '',
        username: 'Anonymous',
        userid: 0,
        timeStamp: Date.now() / 1000, // Unix Timestamp in seconds
    },
    albums: [],
    albumimgs: [],
    albumimg: {
        src: '',
        title: '',
    },
    reviewitem: {
        id: 0,
        title: '',
        src: '',
        userid: 0,
        username: '',
    },
    followers: [],
    user: {
        userid: 0,
        username: 'Anonymous',
        status: 'unknown',
        lastActivity: 0,
        // email: '',
    },
}

export default initialState
