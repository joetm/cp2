
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
        // isInvalid: false,
        items: [],
    },
    images: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    videos: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    posts: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    categories: {
        isFetching: true,
        // isInvalid: false,
        items: [],
        threads: [], // TODO
    },
    threads: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    album: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    users: {
        isFetching: true,
    },
    online: {
        isFetching: true,
        // isInvalid: false,
        users: [],
        num: 0,
    },
    // -- personalized content
    messages: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    stream: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    favorites: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    likes: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    playlist: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    followers: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    // -- chat
    chat: {
        isFetching: true,
        // isInvalid: false,
        user: {
            id: null,
            username: null,
            avatar: null,
        },
        items: [],
    },
    messageHistory: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    // -- single item caching
    // -- crowd review
    reviewitem: {
        id: null,
        isFetching: true,
        // isInvalid: false,
        isSaving: false,
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
        // isInvalid: false,
        items: []
    },
    // -- current user
    verificationImages: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    profileImages: {
        isFetching: true,
        // isInvalid: false,
        items: [],
    },
    currentUser: {
        id: null,
        isSaving: false,
        // isInvalid: false,
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
        // isInvalid: false,
        items: [],
    },
}

export default initialState
