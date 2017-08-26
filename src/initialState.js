
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
        // --
        isAuthenticated: false,
        // --
        countries: [],
        states: [],
        cities: [],
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
    reviewitem: {
        id: null,
        primaryText: null,
        secondaryText: null,
        fromUsername: null,
        fromUserid: null,
        approvals: null,
        disapprovals: null,
        likes: null,
        dislikes: null,
        src: null,
        timestamp: null,
    },
    // --
    currentUser: {
        userid: null,
        username: 'anonymous',
        hash: '',
        avatar: '',
        profileimg: '',
        status: 'unknown',
        verified: false,
        dailyUploadLimitReached: true,
        lastActivity: Date.now() / 1000,
        email: null,
        // auth
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        statusText: '',
    },
}

export default initialState
