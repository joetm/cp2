
/**
 * Redux Initial Store State for PROD
 **/

/**
 * INITIAL STATE OF APPLICATION
 **/

const initialState = {
    appState: {
        deviceDetails: null,
        sidebarSearchOpen: false,
        sidebarOpen: false,
        isFetching: false,
        activeBadge: 0,
    },
    // -- content --
    all: [],
    images: [],
    videos: [],
    notifications: [],
    likes: [],
    posts: [],
    threads: [],
    album: [],
    // --
    followers: [],
    users: {},
    // -- single item caching --
    thread: {},
    post: {},
    messageHistory: {},
    reviewitem: {},
    // --
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
