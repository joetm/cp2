
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
    isStale: true,
    items: [],
  },
  images: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  videos: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  posts: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  categories: {
    isFetching: false,
    isStale: true,
    items: [],
    threads: [], // TODO
  },
  threads: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  album: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  users: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  online: {
    isFetching: false,
    isStale: true,
    items: [],
    num: 0,
  },
  // -- personalized content
  messages: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  stream: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  favorites: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  likes: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  playlist: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  followers: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  chat: {
    isFetching: false,
    isStale: true,
    user: {
      id: null,
      username: null,
      avatar: null,
    },
    items: [],
  },
  messageHistory: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  verifications: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  profileimgs: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  reviewLeaderboard: {
    isFetching: false,
    isStale: true,
    items: [],
  },
  // -- single item caching
  // -- crowd review
  reviewitem: {
    id: null,
    isFetching: false,
    isStale: true,
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
    leaderboard: {
      isFetching: false,
      isStale: true,
      items: [],
    },
  },
  // -- current user
  currentUser: {
    id: null,
    isFetching: false,
    isStale: true,
    isSaving: false,
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
    isStale: true,
    items: [],
  },
}

export default initialState
