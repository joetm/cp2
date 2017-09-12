
import { browserHistory } from 'react-router-dom'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import * as Reducers from './reducers'


// see https://egghead.io/lessons/javascript-redux-the-middleware-chain
const middlewares = []
middlewares.push(routerMiddleware(browserHistory)) // Build the middleware for intercepting and dispatching navigation actions - see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
middlewares.push(promise)
middlewares.push(thunkMiddleware)
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
}

const enhancer = compose(
  applyMiddleware(...middlewares), // apply middleware for navigating
)

const store = createStore(
    combineReducers({
        appState: Reducers.cpAppReducer,
        // multiple items
        updates: Reducers.updatesReducer,
        images: Reducers.imagesReducer,
        verificationImages: Reducers.imagesReducer,
        videos: Reducers.videosReducer,
        favorites: Reducers.favoritesReducer,
        likes: Reducers.likesReducer,
        messages: Reducers.messagesReducer,
        album: Reducers.albumReducer,
        categories: Reducers.categoriesReducer,
        threads: Reducers.threadsReducer,
        posts: Reducers.postsReducer,
        followers: Reducers.followersReducer,
        users: Reducers.userReducer,
        // single items
        reviewitem: Reducers.reviewReducer,
        thread: Reducers.threadReducer,
        post: Reducers.postReducer,
        video: Reducers.videoReducer,
        image: Reducers.imageReducer,
        // --
        currentUser: Reducers.currentUserReducer,
        messageHistory: Reducers.messageHistoryReducer,
        chat: Reducers.chatReducer,
        // mod
        mod: Reducers.modReducer,
        // auth: Reducers.authReducer,
        router: routerReducer // add the routerReducer to the store on the `router` key
    }),
    enhancer
)

export default store
