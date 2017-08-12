
/**
 * Redux Initial Store State for PROD
 **/

/**
 * INITIAL STATE OF APPLICATION
 **/

const initialState = {
    deviceDetails: null,
    sidebarOpen: false,
    // -- state --
    navbar: {
        activeBadge: 0,
    },
    // -- content --
    updates: [],
    threads: [],
    posts: [],
    post: {},
    albums: [],
    albumimgs: [],
    messageHistory: {
        username: null,
        userid: null,
        messages: []
    },
    reviewitem: {},
    followers: [],
    user: {},
}

export default initialState
