
import {
  REMOVE,
} from './actions'

// initial state
import dummyData from './dummyData'
const initialState = {
    updatesList: dummyData
}


function reviewApp(state = initialState, action) {
	switch (action.type) {
		// case SET_VISIBILITY_FILTER:
		//     return Object.assign({}, state, {
		//         visibilityFilter: action.filter
        //       })
	    case REMOVE:
			return {
			   updatesList: state.updatesList.filter((item, index) => item.id !== action.id)
			}
		default:
            return state
	}
}

export default reviewApp
