
import { browserHistory } from 'react-router-dom'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import { createLogger } from 'redux-logger'

import * as Reducers from './reducers'
import { SET_DEVICE_DETAILS } from './reducers'

// see https://egghead.io/lessons/javascript-redux-the-middleware-chain
const middlewares = []

middlewares.push(routerMiddleware(browserHistory)) // Build the middleware for intercepting and dispatching navigation actions - see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux

middlewares.push(promise)

middlewares.push(createLogger())

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

export default store
