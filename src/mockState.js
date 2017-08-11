
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
    activities: [
        {
            type: "image",
            primaryText: "Brunch this weekend?",
            secondaryText: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
            src: "https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg",
            fromUsername: "Brandan Lim",
            timestamp: 1501229377,
        },
        {
            type: "post",
            primaryText: "Oui oui",
            secondaryText: "Do you have Paris recommendations? Have you ever been?",
            fromUsername: "Grace Ng",
            timestamp: 1501229177,
        },
        {
            type: "image",
            primaryText: "Birdthday gift",
            secondaryText: "Do you have any ideas what we can get Heidi for her birthday? How about a pony?",
            src: "https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg",
            fromUsername: "Kerem Suer",
            timestamp: 1501229077,
        },
        {
            type: "image",
            primaryText: "Recipe to try",
            secondaryText: "We should eat this: grated squash. Corn and tomatillo tacos.",
            src: "https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg",
            fromUsername: "Raquel Parrado",
            timestamp: 1501220077,
        },
        {
            type: "like",
            primaryText: "Brunch this weekend?",
            secondaryText: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
            fromUsername: "Brandan Lim",
            timestamp: 1501200077,
        },
        {
            type: "post",
            primaryText: "Oui oui",
            secondaryText: "Do you have Paris recommendations? Have you ever been?",
            fromUsername: "Grace Ng",
            timestamp: 1501000077,
        },
        {
            type: "post",
            primaryText: "Birdthday gift",
            secondaryText: "Do you have any ideas what we can get Heidi for her birthday? How about a pony?",
            fromUsername: "Kerem Suer",
            timestamp: 1501000057,
        },
        {
            type: "video",
            primaryText: "Recipe to try",
            secondaryText: "We should eat this: grated squash. Corn and tomatillo tacos.",
            thumb: "https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg",
            fromUsername: "Raquel Parrado",
            timestamp: 1500000057,
        },
    ],
    threads: [],
    posts: [],
    post: {
        id: cuid(),
        msg: '',
        username: 'Anonymous',
        userid: 0,
        timeStamp: Math.round(Date.now() / 1000), // Unix Timestamp in seconds
    },
    albums: [],
    albumimgs: [],
    albumimg: {
        src: '',
        title: '',
    },
    messageHistory: {
        username: "Gonzales",
        userid: 2,
        messages: [
            {
                username: "Gonzales",
                userid: 2,
                avatar: '/img/avatar/face-13.jpg',
                msg: "Wassup, [b]homie[/b]?",
                timestamp: 1501229377,
            },
            {
                username: "me",
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                msg: "wha?",
                timestamp: 1501229387,
            },
            {
                username: "Gonzales",
                userid: 2,
                avatar: '/img/avatar/face-13.jpg',
                msg: "[quote]wha?[/quote][i]wassss[/i]uuuuup?",
                timestamp: 1501239377,
            },
            {
                username: "me",
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                msg: "wassssuuuuup?",
                timestamp: 1501249377,
            },
            {
                username: "Gonzales",
                userid: 2,
                avatar: '/img/avatar/face-13.jpg',
                msg: "...uuuuu...",
                timestamp: 1501259377,
            },
            {
                username: "me",
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                msg: "...uuuuu...",
                timestamp: 1501269377,
            },
            {
                username: "me",
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                msg: "...uuuuup?!",
                timestamp: 1501279377,
            },
        ]
    },
    reviewitem: {
        id: 123,
        primaryText: "Brunch this weekend?",
        secondaryText: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
        fromUsername: "Brandan Lim",
        fromUserid: 123,
        approvals: 0,
        disapprovals: 0,
        likes: 44,
        dislikes: 9,
        src: 'http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg',
        timestamp: 1501229377,
    },
    followers: [],
    user: {
        userid: 1,
        username: 'me',
        hash: '239SAHJ#*HKDGB(#JDS)(U$WJ$KJDSJHOIDSHG*#J',
        status: 'online',
        dailyUploadLimitReached: false,
        dailyUploadLimits: {
            images: 1,
            videos: 1,
        },
        lastActivity: 1502379924,
        // email: 'admin@thisdomain.com',
    },
}

export default mockState