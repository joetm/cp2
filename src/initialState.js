
/**
 * Redux Initial Store State for PROD
 **/

// default view mode
import { GROUPED_GALLERY } from './common/viewModes'
import { DEFAULT_THEME } from './common/theme'

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
    categories: {
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
    online: {
        isFetching: true,
        users: [],
        num: 0,
    },
    // -- personalized content
    messages: {
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
    category: {
        isFetching: true,
        threads: [],
    },
    thread: {
        isFetching: true,
        items: [],
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
    },
    // -- crowd review
    reviewitem: {
        id: null,
        isFetching: true,
        error: null,
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
    reviewLeaderboard: {
        isFetching: true,
        items: []
    },
    // -- current user
    verificationImages: {
        isFetching: true,
        items: [],
    },
    profileImages: {
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
        // stats
        profileViews: 0,
        unreadPosts: 0,
        unreadImages: 0,
        unreadVideos: 0,
        unreadMessages: 0,
        unreadLikes: 0,
        numPosts: 0,
        numThreads: 0,
        numImages: 0,
        numVideos: 0,
        numLikes: 0,
        numFollowers: 0,
        // settings
        showBirthday: false,
        showLocation: false,
        showOnlineStatus: false,
        fullscreenImages: true,
        viewMode: GROUPED_GALLERY,
        scaleImages: false,
        theme: DEFAULT_THEME,
    },
    mod: {
        isFetching: true,
        items: [],
    },
}

export default initialState
