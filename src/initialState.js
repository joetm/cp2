
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
        isAuthenticating: false,
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
        // email: null,
        token: null,
        avatar: '',
        profileimg: '',
        status: 'unknown',
        verified: false,
        birthday: null,
        showBirthday: false,
        numPosts: 0,
        numThreads: 0,
        numImages: 0,
        numVideos: 0,
        numLikes: 0,
        numFollowers: 0,
        country: null,
        state: null,
        city: null,
        groups: [],
        homepage: '',
        facebook: null,
        google: null,
        dailyUploadLimitReached: true,
        lastActivity: Date.now() / 1000,
        joinDate: Date.now() / 1000,
        timezoneOffset: 0,
        IP: '66.66.66.66',
        unreadPosts: 0,
        unreadImages: 0,
        unreadVideos: 0,
        unreadMessages: 0,
        unreadLikes: 0,
        profileViews: 0,
        followerCount: 0,
    },
}

export default initialState
