/*
 * Redux store
 */

import { VisibilityFilters } from './actions'


export const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    feedItems: []
}
