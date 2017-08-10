
import { browserHistory } from 'react-router-dom'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import cuid from 'cuid'

import { cpApp } from './reducers'


/**
 * INITIAL STATE OF APPLICATION
 **/

export const initialState = {
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
        id: 0,
        title: '',
        src: '',
        userid: 0,
        username: '',
    },
    followers: [],
    user: {
        userid: 0,
        username: 'Anonymous',
        status: 'unknown',
        lastActivity: 0,
        // email: '',
    },
}


// see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
const middleware = routerMiddleware(browserHistory) // Build the middleware for intercepting and dispatching navigation actions
// Add the routerReducer to your store on the `router` key
// and apply middleware for navigating
const store = createStore(
    combineReducers({
        ...cpApp,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)

export default store
