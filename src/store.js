
import { browserHistory } from 'react-router-dom'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import * as Reducers from './reducers'
import { SET_DEVICE_DETAILS } from './reducers'

// see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
const middleware = routerMiddleware(browserHistory) // Build the middleware for intercepting and dispatching navigation actions

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch
    if (!console.group) {
        return rawDispatch
    }
    return (action) => {
        // TODO : something dispatches an `undefined` action




        if (action === undefined) {
            return
        }




        // do not log the device details request
        // if (action.type === SET_DEVICE_DETAILS) {
        //     const returnValue = rawDispatch(action)
        // }
        console.group(action.type)
        console.log('%c previous state', 'color: gray', store.getState())
        console.log('%c action', 'color: blue', action)
        const returnValue = rawDispatch(action)
        console.log('%c next state', 'color: green', store.getState())
        console.groupEnd(action.type)
        return returnValue
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
    applyMiddleware(middleware) // apply middleware for navigating
)

if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
}

export default store
