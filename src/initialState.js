
/**
 * Redux Initial Store State for PROD
 **/

/**
 * INITIAL STATE OF APPLICATION
 **/

const initialState = {
    appState: {
        deviceDetails: {},
        sidebarSearchOpen: false,
        sidebarOpen: false,
        streamSidebarOpen: false,
        // --
        isAuthenticating: false,
        isAuthenticated: false,
        // --
        countries: [],
        states: [],
        cities: [],
    },
    // -- common content
    updates: {
        isFetching: true,
        items: [],
    },
    images: {
        isFetching: true,
        items: [],
    },
    videos: {
        isFetching: true,
        items: [],
    },
    posts: {
        isFetching: true,
        items: [],
    },
    threads: {
        isFetching: true,
        items: [],
    },
    album: {
        isFetching: true,
        items: [],
    },
    users: {
        isFetching: true,
    },
    // -- personalized content
    notifications: {
        isFetching: true,
        items: [],
    },
    stream: {
        isFetching: true,
        items: [],
    },
    favorites: {
        isFetching: true,
        items: [],
    },
    likes: {
        isFetching: true,
        items: [],
    },
    playlist: {
        isFetching: true,
        items: [],
    },
    followers: {
        isFetching: true,
        items: [],
    },
    // -- chat
    chat: {
        isFetching: true,
        user: {
            id: null,
            username: null,
            avatar: null,
        },
        items: [],
    },
    messageHistory: {
        isFetching: true,
        items: [],
    },
    // -- single item caching
    thread: {
        isFetching: true,
        item: {},
    },
    post: {
        isFetching: true,
        item: {},
    },
    video: {
        isFetching: true,
        item: {},
    },
    image: {
        isFetching: true,
        item: {},
    },
    // -- crowd review
    reviewitem: {
        id: null,
        isFetching: true,
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
    // -- current user
    verificationImages: {
        isFetching: true,
        items: [],
    },
    currentUser: {
        id: null,
        username: 'anonymous',
        // email: null,
        token: null,
        avatar: '',
        profileimg: '',
        status: 'unknown',
        verified: false,
        gender: false,
        birthday: null,
        showBirthday: false,
        showLocation: false,
        showOnlineStatus: false,
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
        lastActivity: Math.round(Date.now() / 1000),
        joinDate: Math.round(Date.now() / 1000),
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
    mod: {
        contactRequests: [],
    },
}

export default initialState
