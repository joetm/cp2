
import { createStore } from 'redux'
import reviewApp from './reducers'

let store = createStore(reviewApp) // , window.STATE_FROM_SERVER

export default store
