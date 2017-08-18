
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
    streamitems: [],
    // -- single item caching --
    thread: {},
    post: {},
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
