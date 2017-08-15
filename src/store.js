
import { browserHistory } from 'react-router-dom'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import * as Reducers from './reducers'
import { SET_DEVICE_DETAILS } from './reducers'

// see https://egghead.io/lessons/javascript-redux-the-middleware-chain
const middlewares = []

// see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
// const middleware = routerMiddleware(browserHistory) // Build the middleware for intercepting and dispatching navigation actions
middlewares.push(routerMiddleware(browserHistory))

// addLoggingToDispatch middleware
const logger = (store) => (next) => {
    if (!console.group) {
        return next
    }
    return (action) => {
        // console.log('action', action)
        // do not log the device details request
        // if (action.type === SET_DEVICE_DETAILS) {
        //     return next(action)
        // }
        console.group(action.type)
        console.log('%c previous state', 'color: gray', store.getState())
        console.log('%c action', 'color: blue', action)
        const returnValue = next(action)
        console.log('%c next state', 'color: green', store.getState())
        console.groupEnd(action.type)
        return returnValue
    }
}

// See https://egghead.io/lessons/javascript-redux-wrapping-dispatch-to-recognize-promises
// addPromiseSupportToDispatch middleware
const promise = (store) => (next) => (action) => {
    const next = store.dispatch
    return (action) => {
        // is action a promise?
        if (typeof action.then === 'function') {
            return action.then(next)
        }
        // no promise -> regular action
        return next(action)
    }
}


const store = createStore(
    combineReducers({
        app: Reducers.cpAppReducer, // TODO - spread this among reducers
        messageHistory: Reducers.chatReducer,
        reviewitem: Reducers.reviewReducer,
        updates: Reducers.streamReducer,
        user: Reducers.userReducer,
        navbar: Reducers.navBarReducer,
        router: routerReducer // add the routerReducer to the store on the `router` key
    }),
    applyMiddleware(...middlewares) // apply middleware for navigating
)

wrapDispatchWithMiddleware(store, logger)
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
}
wrapDispatchWithMiddleware(store, promise)
middlewares.push(promise)


export default store
