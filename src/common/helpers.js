
export function validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function classifyByDateAgo(obj) {
    const day = 60 * 60 * 24

    const ts = obj.timestamp || obj.datestamp
    const delta = Math.round((+new Date() - (ts * 1000)) / 1000)

    const daysAgo = Math.floor(delta / day)
    // console.log('daysAgo', daysAgo)

    // let returnObj = { ...obj, classifier }
    // console.log('returnObj', returnObj)

    return { ...obj, daysAgo }
}

/**
 * Categorize a list of updates into 'today', yesterday', etc.
 * @param {number} updatesList - List of updates
 * @returns {Object} categorizedList - Categorized list of updates
 */
export function categorizeList(updatesList) {
    if (!updatesList) {
        return []
    }
    // console.log(updatesList)
    const annotatedList = updatesList.map(obj => {
        return classifyByDateAgo(obj)
    })
    // console.log(annotatedList)
    const categorizedList = []
    annotatedList.forEach(obj => {
        if (categorizedList[obj.daysAgo]) {
            categorizedList[obj.daysAgo].push(obj)
        } else {
            categorizedList[obj.daysAgo] = [obj]
        }
    })
    // console.log(categorizedList)
    return categorizedList
}

/**
 * Return a unix timestamp as a human-readable date
 * @param {number} datestamp - Unix timestamp
 * @returns {Object} formattedTime - Human-readable time
 */
export function humanReadableDate(datestamp) {
    const ret = {
        formattedDate: '',
        formattedTime: '',
    }
    if (!datestamp) {
        return ret
    }
    const date = new Date(+datestamp * 1000)
      const hours = date.getHours()
      const minutes = `0${date.getMinutes()}`
      // const seconds = `0${date.getSeconds()}`
    const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
    ret.formattedTime = `${hours}:${minutes.substr(-2)}` // :${seconds.substr(-2)}`
    ret.formattedDate = `${year}-${month}-${day}`
    return ret
}

/**
 * Return a human-readable relative date, e.g. '3 days ago'
 * @param {number} datestamp - Unix timestamp
 * @returns {Object} formattedTime - Human-readable time
 */
export function humanRelativeDate(datestamp) {
    const delta = Math.round((+new Date() - (datestamp * 1000)) / 1000);
    const minute = 60
    const hour = minute * 60
    const day = hour * 24
    // const week = day * 7
    const month = day * 30
    let formattedTime
    if (delta < 30) {
        formattedTime = 'just now'
    } else if (delta < minute) {
        formattedTime = `${delta} seconds ago`
    } else if (delta < 2 * minute) {
        formattedTime = 'a minute ago'
    } else if (delta < hour) {
        formattedTime = `${Math.floor(delta / minute)} minutes ago`
    } else if (Math.floor(delta / hour) === 1) {
        formattedTime = '1 hour ago'
    } else if (delta < day) {
        formattedTime = `${Math.floor(delta / hour)} hours ago`
    } else if (delta < day * 2) {
        formattedTime = 'yesterday'
    } else if (delta < day * 7) {
        formattedTime = 'one week ago'
    } else if (delta < day * 14) {
        formattedTime = 'two weeks ago'
    } else if (delta < day * 14) {
        formattedTime = 'three weeks ago'
    } else if (delta < day * month) {
        formattedTime = 'one month ago'
    } else if (delta < day * 2 * month) {
        formattedTime = 'two months ago'
    } else if (delta < day * 3 * month) {
        formattedTime = 'three months ago'
    } else if (delta < day * 6 * month) {
        formattedTime = 'half a year ago'
    } else {
        formattedTime = 'more than half a year ago'
    }
    return {
        formattedTime,
    }
}

export function translateDayOffset(offset) {
    const dayNames = [
        'Today',
        'Yesterday',
    ]
    if (!dayNames[offset]) {
        return `${offset} days ago`
    }
    return dayNames[offset]
}

/**
 * Return a random integer
 * @param {number} min - Minimum of the range
 * @param {number} max - Maximum of the range
 * @returns {number} Integer between min and max
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + min
}

/*
 * Other actions
 */

// see https://stackoverflow.com/a/16449334/426266
export const sum = (obj) => {
  let sumOfObjectKeys = 0
  Object.keys(obj).forEach(key => {
    sumOfObjectKeys += parseInt(obj[key], 10)
  })
  return sumOfObjectKeys
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
}

export function parseJSON(response) {
     return response.json()
}

/**
 * Function to scroll to top of page.
 * See http://stackoverflow.com/a/24559613/426266
 */
export function scrollToTop(scrollDuration) {
    const scrollStep = -window.scrollY / (scrollDuration / 15)
    const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep)
        } else {
            clearInterval(scrollInterval)
        }
    }, 15);
}

/**
 * Function to scroll to an element on the page
 */
export function scrollTo(el, scrollDuration) {
    const scrollStep = -window.scrollY / (scrollDuration / 15)
    const targetPos = el.offsetTop
    const scrollInterval = setInterval(() => {
        if (window.scrollY !== targetPos) {
            window.scrollBy(targetPos, scrollStep)
        } else {
            clearInterval(scrollInterval)
        }
    }, 15);
}
