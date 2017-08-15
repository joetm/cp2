
/**
 * A mock REST server for DEV
 **/

import mockState from './mockState'


const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const fetchDataFromAPI = (key, selection) => {
    return delay(500)
        .then(() => {
            try {
                // selection -> return only the queried fields
                if (selection !== undefined) {
                    return mockState[key]["" + selection]
                }
                return mockState[key]
            } catch (e) {
                throw new Error(e)
            }
        })
}

const sendDataToAPI = (payload) => {
    return delay(500)
        .then(() => {
            try {
                return 200
            } catch (e) {
                throw new Error(e)
            }
        })
}
