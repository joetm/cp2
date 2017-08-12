
/**
 * A mock REST server for DEV
 **/

import mockState from './mockState'


const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const fetchData = (key) =>
    delay(500)
        .then(() => {
            try {
                return mockState[key]
            } catch (e) {
                throw new Error(e)
            }
        })
