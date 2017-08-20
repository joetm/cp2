
import cuid from 'cuid'

/**
 * Redux Mock Store State for DEV
 **/

/**
 * INITIAL STATE OF APPLICATION
 **/

const mockState = {
    // -- state --
    appState: {
        deviceDetails: null,
        sidebarSearchOpen: false,
        sidebarOpen: false,
        isFetching: false,
        activeBadge: 0,
        // dailyUploadLimits: {
        //     normal: {
        //         images: 1,
        //         videos: 1,
        //     }
        // },
    },
    // -- content --
    streamitems: [
        {
            type: "like",
            id: cuid(),
            title: "Post title here, if available",
            content: null,
            src: null,
            userid: 2,
            username: "Gonzales",
            avatar: '/img/avatar/face-13.jpg',
            tags: [],
            timestamp: 1501229377,
        },
        {
            type: "like",
            id: cuid(),
            title: "Thread 222 title here, if available",
            content: null,
            src: null,
            userid: 9,
            username: "Joe",
            avatar: '/img/avatar/face-4.jpg',
            tags: [],
            timestamp: 1501229577,
        },
        {
            type: "like",
            id: cuid(),
            title: "AlbumImage title here, if available",
            content: null,
            src: "https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg",
            userid: 9,
            username: "Joe",
            avatar: '/img/avatar/face-4.jpg',
            tags: [],
            timestamp: 1501229577,
        },
        {
            type: "message",
            id: cuid(),
            title: "Brunch this weekend?",
            content: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
            src: null,
            userid: 3,
            username: "Gamel, John J.",
            avatar: "/img/avatar/face.jpg",
            tags: [],
            timestamp: 1502788349,
        },
        {
            type: "message",
            id: cuid(),
            title: "System Message",
            content: "Quota exceeded",
            src: null,
            userid: 4,
            username: "System Bot",
            avatar: '',
            tags: [],
            timestamp: 1502788549,
        },
        {
            type: "message",
            id: cuid(),
            title: "Hello???",
            content: "...",
            src: null,
            userid: 3,
            username: "Gamel, John J.",
            avatar: "/img/avatar/face-2.jpg",
            tags: [],
            timestamp: 1502789349,
        },
        {
            type: "image",
            id: cuid(),
            title: "Brunch this weekend?",
            content: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
            src: "https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg",
            userid: 6,
            username: "Brandan Lim",
            avatar: "/img/avatar/face-1.jpg",
            tags: [],
            timestamp: 1501229377,
        },
        {
            type: "post",
            id: cuid(),
            title: "Oui oui",
            content: "Do you have Paris recommendations? Have you ever been?",
            src: null,
            userid: 8,
            username: "Grace Ng",
            avatar: "/img/avatar/face-7.jpg",
            tags: [],
            timestamp: 1501229177,
        },
        {
            type: "image",
            id: cuid(),
            title: "Birdthday gift",
            content: "Do you have any ideas what we can get Heidi for her birthday? How about a pony?",
            src: "https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg",
            userid: 5,
            username: "Kerem Suer",
            avatar: "/img/avatar/face-3.jpg",
            tags: [],
            timestamp: 1501229077,
        },
        {
            type: "image",
            id: cuid(),
            title: "Recipe to try",
            content: "We should eat this: grated squash. Corn and tomatillo tacos.",
            src: "https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg",
            userid: 3,
            username: "Raquel Parrado",
            avatar: "/img/avatar/face-4.jpg",
            tags: [],
            timestamp: 1501220077,
        },
        {
            type: "like",
            id: cuid(),
            title: "Brunch this weekend?",
            content: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
            src: null,
            userid: 7,
            username: "Brandan Lim",
            avatar: "/img/avatar/face-5.jpg",
            tags: [],
            timestamp: 1501200077,
        },
        {
            type: "post",
            id: cuid(),
            title: "Oui oui",
            content: "Do you have Paris recommendations? Have you ever been?",
            src: null,
            userid: 2,
            username: "Grace Ng",
            avatar: "/img/avatar/face-6.jpg",
            tags: [],
            timestamp: 1501000077,
        },
        {
            type: "post",
            id: cuid(),
            title: "Birdthday gift",
            content: "Do you have any ideas what we can get Heidi for her birthday? How about a pony?",
            src: null,
            userid: 8,
            username: "Kerem Suer",
            avatar: "/img/avatar/face-7.jpg",
            tags: [],
            timestamp: 1501000057,
        },
        {
            type: "video",
            id: cuid(),
            title: "Recipe to try",
            content: "We should eat this: grated squash. Corn and tomatillo tacos.",
            src: "https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg",
            userid: 2,
            username: "Raquel Parrado",
            avatar: "/img/avatar/face-8.jpg",
            tags: [],
            timestamp: 1500000057,
        },
        {
            type: "post",
            id: cuid(),
            title: "Cars & Dinos",
            content: "Dinosaurs are like cars.",
            src: null,
            userid: 9,
            username: "Joe",
            avatar: "/img/avatar/face-9.jpg",
            tags: ["cars", "thread-123"],
            timestamp: 1501135362,
        },
        {
            type: "post",
            id: cuid(),
            title: "Dinos & Cars",
            content: "Cars are like dinosaurs.",
            src: null,
            userid: 10,
            username: "Moe",
            avatar: "/img/avatar/face-10.jpg",
            tags: ["dinosaurs", "thread-123"],
            timestamp: 1501185342,
        },
        {
            type: "post",
            id: cuid(),
            title: "Testing the Forums",
            content: "Forums are like dinosaurs.",
            src: null,
            userid: 11,
            username: "Toe",
            avatar: "/img/avatar/face-11.jpg",
            tags: ["forums", "dinosaurs", "thread-124"],
            timestamp: 1501188342,
        },
        {
            type: "post",
            id: cuid(),
            title: "Testing the Dinos",
            content: "Dinos are like forums.",
            src: null,
            userid: 12,
            username: "Hogo",
            avatar: "/img/avatar/face-12.jpg",
            tags: ["forums", "dinosaurs", "thread-124"],
            timestamp: 1501198342,
        },
        {
            type: "image",
            id: cuid(),
            title: "1 Mock 1 image 1 title",
            content: "",
            src: "https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg",
            userid: 12,
            username: "GG",
            avatar: "/img/avatar/face-13.jpg",
            tags: ["hello"],
            timestamp: 1501239377,
        },
    ],
    // -- single item caching --
    thread: {
        "cj6dn68b7000i335mgh0lj8rb": {
            threadid: 123,
            title: "My awesome thread",
            username: "admin",
            userid: 1,
            timestamp: 1500000097,
            // TODO: add posts as post ids?
            posts: [
                {
                    type: "post",
                    id: cuid(),
                    title: "THREAD VIEW: Cars & Dinos",
                    content: "Dinosaurs are like cars.",
                    src: null,
                    userid: 9,
                    username: "Joe",
                    avatar: "/img/avatar/face-13.jpg",
                    tags: ["cars", "thread-123"],
                    timestamp: 1501135362,
                },
                {
                    type: "post",
                    id: cuid(),
                    title: "THREAD VIEW: Dinos & Cars",
                    content: "Cars are like dinosaurs.",
                    src: null,
                    userid: 10,
                    username: "Moe",
                    avatar: "/img/avatar/face-12.jpg",
                    tags: ["dinosaurs", "thread-123"],
                    timestamp: 1501185342,
                },
                {
                    type: "post",
                    id: cuid(),
                    title: "THREAD VIEW: Testing the Forums",
                    content: "Forums are like dinosaurs.",
                    src: null,
                    userid: 11,
                    username: "Toe",
                    avatar: "/img/avatar/face-11.jpg",
                    tags: ["forums", "dinosaurs", "thread-124"],
                    timestamp: 1501188342,
                },
                {
                    type: "post",
                    id: cuid(),
                    title: "THREAD VIEW: Testing the Dinos",
                    content: "Dinos are like forums.",
                    src: null,
                    userid: 12,
                    username: "Hogo",
                    avatar: "/img/avatar/face-10.jpg",
                    tags: ["forums", "dinosaurs", "thread-124"],
                    timestamp: 1501198342,
                },
            ]
        }
    },
    post: {
        id: cuid(),
        title: "Testing the Dinos",
        content: "Dinos are like forums.",
        username: 'Anonymous',
        userid: 0,
        tags: ["forums", "dinosaurs", "thread-124"],
        timeStamp: Math.round(Date.now() / 1000), // Unix Timestamp in seconds
    },
    messageHistory: {
        "3": {
            // userid: 3,
            username: "Gonzales",
            messages: [
                {
                    type: "message",
                    id: cuid(),
                    title: null,
                    content: "Wassup, [b]homie[/b]?",
                    src: null,
                    userid: 2,
                    username: "Gonzales",
                    avatar: '/img/avatar/face-13.jpg',
                    tags: [],
                    timestamp: 1501229377,
                },
                {
                    type: "message",
                    id: cuid(),
                    title: null,
                    content: "wha?",
                    src: null,
                    userid: 1,
                    username: "me",
                    avatar: '/img/avatar/face.jpg',
                    tags: [],
                    timestamp: 1501229387,
                },
                {
                    type: "message",
                    id: cuid(),
                    title: null,
                    content: "[quote]wha?[/quote][i]wassss[/i]uuuuup?",
                    src: null,
                    userid: 2,
                    username: "Gonzales",
                    avatar: '/img/avatar/face-13.jpg',
                    tags: [],
                    timestamp: 1501239377,
                },
                {
                    type: "message",
                    id: cuid(),
                    title: null,
                    content: "wassssuuuuup?",
                    src: null,
                    userid: 1,
                    username: "me",
                    avatar: '/img/avatar/face.jpg',
                    tags: [],
                    timestamp: 1501249377,
                },
                {
                    type: "message",
                    id: cuid(),
                    title: null,
                    content: "...uuuuu...",
                    src: null,
                    userid: 2,
                    username: "Gonzales",
                    avatar: '/img/avatar/face-13.jpg',
                    tags: [],
                    timestamp: 1501259377,
                },
                {
                    type: "message",
                    id: cuid(),
                    title: null,
                    content: "...uuuuu...",
                    src: null,
                    userid: 1,
                    username: "me",
                    avatar: '/img/avatar/face.jpg',
                    tags: [],
                    timestamp: 1501269377,
                },
                {
                    type: "message",
                    id: cuid(),
                    title: null,
                    content: "...uuuuup?!",
                    src: null,
                    userid: 1,
                    username: "me",
                    avatar: '/img/avatar/face.jpg',
                    tags: [],
                    timestamp: 1501279377,
                },
            ]
        },
    },
    reviewitem: {
        id: cuid(),
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
    users: {
        "1": {
            userid: 1,
            username: 'admin',
            hash: '239SAHJ#*HKDGB(#JDS)(U$WJ$KJDSJHOIDSHG*#J',
            avatar: '/img/avatar/face.jpg',
            profileimg: 'https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg',
            status: 'online',
            verifiedUser: false,
            dailyUploadLimitReached: false,
            lastActivity: 1502379924,
            // email: 'admin@thisdomain.com',
        },
        "2": {
            userid: 2,
            username: 'Gonzales',
            hash: 'fdiu39*U#UHDS*(#$HJKDJKHI#UHJKJKD',
            avatar: '/img/avatar/face-13.jpg',
            profileimg: 'https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg',
            status: 'offline',
            verifiedUser: true,
            dailyUploadLimitReached: false,
            lastActivity: 1502379924,
            // email: 'admin@thisdomain.com',
        }
    },
    currentUser: {
        userid: 1,
        username: 'admin',
        hash: '239SAHJ#*HKDGB(#JDS)(U$WJ$KJDSJHOIDSHG*#J',
        avatar: '/img/avatar/face.jpg',
        profileimg: 'https://apod.nasa.gov/apod/image/1705/ic410_WISEantonucci_960.jpg',
        status: 'online',
        verifiedUser: false,
        dailyUploadLimitReached: false,
        lastActivity: 1502379924,
        // email: 'admin@thisdomain.com',
    },
}

export default mockState
