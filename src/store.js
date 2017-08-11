
import { browserHistory } from 'react-router-dom'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { cpAppReducer, chatReducer, reviewReducer, navBarReducer } from './reducers'

// see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
const middleware = routerMiddleware(browserHistory) // Build the middleware for intercepting and dispatching navigation actions

const store = createStore(
    combineReducers({
        app: cpAppReducer, // TODO - spread this among reducers
        messageHistory: chatReducer,
        reviewitem: reviewReducer,
        navbar: navBarReducer,
        router: routerReducer // add the routerReducer to the store on the `router` key
    }),
    applyMiddleware(middleware) // apply middleware for navigating
)

export default store
