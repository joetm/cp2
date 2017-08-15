
/**
 * A mock REST server for DEV
 **/

import mockState from './mockState'


const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const fetchDataFromAPI = (key, selection) => {
    // TODO: selection -> return only the queried fields
    return delay(500)
        .then(() => {
            try {
                // console.log('fetchDataFromAPI::selection', selection)
                // console.log('fetchDataFromAPI::key', key)
                // console.log('fetchDataFromAPI::mockState[key]', mockState[key])
                // console.log('fetchDataFromAPI::mockState', mockState)
                if (selection !== undefined) {
                    return mockState[key][""+selection]
                }
                return mockState[key]
            } catch (e) {
                throw new Error(e)
            }
        })
}
