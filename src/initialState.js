
/**
 * Redux Initial Store State for PROD
 **/

/**
 * INITIAL STATE OF APPLICATION
 **/

const initialState = {
    appState: {
        deviceDetails: null,
        sidebarOpen: false,
        isFetching: false,
    },
    navbar: {
        activeBadge: 0,
    },
    // -- content --
    updates: [],
    thread: {},
    threads: [],
    posts: [],
    post: {},
    likes: [],
    notifications: [],
    album: [],
    albums: [],
    messageHistory: {
        username: null,
        userid: null,
        messages: []
    },
    reviewitem: {},
    followers: [],
    users: {},
    currentUser: {
        userid: null,
        username: 'anonymous',
        hash: '',
        avatar: '',
        profileimg: '',
        status: 'unknown',
        verifiedUser: false,
        dailyUploadLimitReached: true,
        lastActivity: Date.now() / 1000,
        // email: 'admin@thisdomain.com',
    },
}

export default initialState
