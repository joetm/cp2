
import { createStore } from 'redux'
import reviewApp from './reducers'

let reviewStore = createStore(reviewApp) // , window.STATE_FROM_SERVER

// log state changes
const unsubscribeStoreListener = reviewStore.subscribe(() =>
    console.log(reviewStore.getState())
)

export default reviewStore
