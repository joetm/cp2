
import { createStore } from 'redux'
import reviewApp from './reducers'

let store = createStore(reviewApp) // , window.STATE_FROM_SERVER

// log state changes
const unsubscribeStoreListener = store.subscribe(() =>
    console.log(store.getState())
)

export default store
