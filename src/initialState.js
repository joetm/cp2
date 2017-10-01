
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
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    images: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    videos: {
        isFetching: false,
        // isInvalid: true,
        items: [],
    },
    posts: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    categories: {
        isFetching: false,
        // isInvalid: false,
        items: [],
        threads: [], // TODO
    },
    threads: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    album: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    users: {
        isFetching: false,
        items: [],
    },
    online: {
        isFetching: false,
        // isInvalid: false,
        items: [],
        num: 0,
    },
    // -- personalized content
    messages: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    stream: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    favorites: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    likes: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    playlist: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    followers: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    chat: {
        isFetching: false,
        // isInvalid: false,
        user: {
            id: null,
            username: null,
            avatar: null,
        },
        items: [],
    },
    messageHistory: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    verificationImages: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    profileImages: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    reviewLeaderboard: {
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
    // -- single item caching
    // -- crowd review
    reviewitem: {
        id: null,
        isFetching: false,
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
    // -- current user
    currentUser: {
        id: null,
        isFetching: false,
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
        isFetching: false,
        // isInvalid: false,
        items: [],
    },
}

export default initialState
