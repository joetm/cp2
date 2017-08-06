
/**
 * Return a unix timestamp as a human-readable date
 * @param {number} datestamp - Unix timestamp
 * @returns {Object} formattedTime - Human-readable time
 */
export function humanReadableDate(datestamp) {
    const date = new Date(datestamp * 1000)
    const hours = date.getHours()
    const minutes = `0${date.getMinutes()}`
    const seconds = `0${date.getSeconds()}`
    const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
    return {
        formattedTime,
    }
}

/**
 * Return a human-readable relative date, e.g. '3 days ago'
 * @param {number} datestamp - Unix timestamp
 * @returns {Object} formattedTime - Human-readable time
 */
export function humanRelativeDate(datestamp) {
    const delta = Math.round((+new Date - (datestamp * 1000)) / 1000);
    const minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7,
        month = day * 30;
    let formattedTime;
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

export function classifyByDateAgo(obj) {

    const day = 60 * 60 * 24

    const ts = obj.timestamp || obj.datestamp
    const delta = Math.round((+new Date - (ts * 1000)) / 1000);

    const daysAgo = Math.floor(delta / day)
    // console.log('daysAgo', daysAgo)

    // let returnObj = { ...obj, classifier }
    // console.log('returnObj', returnObj)

    return { ...obj, daysAgo }
}

export function translateDayOffset(offset) {
    const dayNames = [
        'Today',
        'Yesterday',
    ]
    if (!dayNames[offset]) {
        return `${offset} days ago`
    } else {
        return dayNames[offset]
    }
}

/**
 * Return a random integer
 * @param {number} min - Minimum of the range
 * @param {number} max - Maximum of the range
 * @returns {number} Integer between min and max
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

/*
 * Other actions
 */

/**
 * Navigation function [TODO]
 * @param {number} arg - Argument
 * @returns {null} null
 */
export function navigateTo(arg) {
    // TODO
    console.log(arg)
}