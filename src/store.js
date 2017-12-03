
import { browserHistory } from 'react-router-dom'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { middleware as reduxPackMiddleware } from 'redux-pack'

import * as Reducers from './reducers'


// see https://egghead.io/lessons/javascript-redux-the-middleware-chain
const middlewares = []
middlewares.push(routerMiddleware(browserHistory)) // Build the middleware for intercepting and dispatching navigation actions - see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
middlewares.push(promise)
middlewares.push(thunkMiddleware)
middlewares.push(reduxPackMiddleware)
if (process.env.NODE_ENV !== 'production') {
  const loggerOptions = {
    titleFormatter: (action, time, took) => {
      const reduxPackLifecycle = action.meta && action.meta['redux-pack/LIFECYCLE'] ?
        `(${action.meta['redux-pack/LIFECYCLE']})` : ''
      return `${action.type}${reduxPackLifecycle} @ ${time} (in ${took.toFixed(2)} ms)`
    }
  }
  middlewares.push(createLogger(loggerOptions))
}

const enhancer = compose(
  applyMiddleware(...middlewares), // apply middleware for navigating
)

const store = createStore(
  combineReducers({
    appState: Reducers.cpAppReducer,
    // multiple items
    updates: Reducers.updateReducer,
    images: Reducers.imageReducer,
      verificationImages: Reducers.imageReducer,
      profileImages: Reducers.imageReducer,
    album: Reducers.albumReducer,
    videos: Reducers.videoReducer,
    favorites: Reducers.favoriteReducer,
    likes: Reducers.likeReducer,
    // categories: Reducers.categoryReducer,
    // threads: Reducers.threadReducer,
    // posts: Reducers.postReducer,
    followers: Reducers.followerReducer,
    users: Reducers.userReducer,
    online: Reducers.onlineReducer,
    // single items
    reviewitem: Reducers.reviewReducer,
    // --
    currentUser: Reducers.currentUserReducer,
    messageHistory: Reducers.messageHistoryReducer,
    chat: Reducers.chatReducer,
    messages: Reducers.messageReducer,
    // mod
    mod: Reducers.modReducer,
    // auth: Reducers.authReducer,
    router: routerReducer // add the routerReducer to the store on the `router` key
  }),
  enhancer
)

export default store
