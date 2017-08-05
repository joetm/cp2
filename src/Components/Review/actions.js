/*
 * action types
 */

export const REMOVE = 'REMOVE'
/*
 * action creators
 */

export function remove(id) {
    return {
    	type: REMOVE,
    	id,
    }
}
