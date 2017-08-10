
import cuid from 'cuid'

/**
 * Redux Mock Store State for DEV
 **/

/**
 * INITIAL STATE OF APPLICATION
 **/

const mockState = {
    // -- state --
    sidebarOpen: false,
    // -- content --
    threads: [],
    posts: [],
    post: {
        id: cuid(),
        msg: '',
        username: 'Anonymous',
        userid: 0,
        timeStamp: Date.now() / 1000, // Unix Timestamp in seconds
    },
    albums: [],
    albumimgs: [],
    albumimg: {
        src: '',
        title: '',
    },
    reviewitem: {
        id: 123,
        primaryText: "Brunch this weekend?",
        secondaryText: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
        fromUsername: "Brandan Lim",
        fromUserid: 123,
        likes: 44,
        dislikes: 9,
        src: 'http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg',
        timestamp: 1501229377,
    },
    followers: [],
    user: {
        userid: 1,
        username: 'me',
        status: 'online',
        lastActivity: 1502379924,
        // email: 'admin@thisdomain.com',
    },
}

export default mockState
