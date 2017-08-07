
import {browserHistory} from 'react-router-dom'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'

import rootReducer from './root-reducers'

// import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'
// import reducer from './reducers'
// const loggerMiddleware = createLogger()
// export default function configureStore(preloadedState) {
//   return createStore(
//     reducer,
//     preloadedState,
//     applyMiddleware(
//       thunkMiddleware,
//       loggerMiddleware
//     )
//   )
// }

const reducers = {
    rootReducer,
}

// see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
const middleware = routerMiddleware(browserHistory) // Build the middleware for intercepting and dispatching navigation actions
// Add the reducer to your store on the `router` key and apply middleware for navigating
const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    applyMiddleware(middleware)
)

export default store
