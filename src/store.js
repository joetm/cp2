
import { browserHistory } from 'react-router-dom'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { cpApp } from './reducers'

// see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
const middleware = routerMiddleware(browserHistory) // Build the middleware for intercepting and dispatching navigation actions
// Add the routerReducer to your store on the `router` key
// and apply middleware for navigating
const store = createStore(
    combineReducers({
        app: cpApp,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)

export default store
