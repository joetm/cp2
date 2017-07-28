"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.humanReadableDate = humanReadableDate;
exports.humanRelativeDate = humanRelativeDate;
/*
 * Redux reducers
 */

function humanReadableDate(datestamp) {
	var date = new Date(datestamp * 1000);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return {
		formattedTime: formattedTime
	};
}

function humanRelativeDate(datestamp) {
	var delta = Math.round((+new Date() - datestamp * 1000) / 1000);
	var minute = 60,
	    hour = minute * 60,
	    day = hour * 24,
	    week = day * 7,
	    month = day * 30;
	var formattedTime = void 0;
	if (delta < 30) {
		formattedTime = 'just now';
	} else if (delta < minute) {
		formattedTime = delta + ' seconds ago';
	} else if (delta < 2 * minute) {
		formattedTime = 'a minute ago';
	} else if (delta < hour) {
		formattedTime = Math.floor(delta / minute) + ' minutes ago';
	} else if (Math.floor(delta / hour) == 1) {
		formattedTime = '1 hour ago';
	} else if (delta < day) {
		formattedTime = Math.floor(delta / hour) + ' hours ago';
	} else if (delta < day * 2) {
		formattedTime = 'yesterday';
	} else if (delta < day * 7) {
		formattedTime = 'one week ago';
	} else if (delta < day * 14) {
		formattedTime = 'two weeks ago';
	} else if (delta < day * 14) {
		formattedTime = 'three weeks ago';
	} else if (delta < day * month) {
		formattedTime = 'one month ago';
	} else if (delta < day * 2 * month) {
		formattedTime = 'two months ago';
	} else if (delta < day * 3 * month) {
		formattedTime = 'three months ago';
	} else if (delta < day * 6 * month) {
		formattedTime = 'half a year ago';
	} else {
		formattedTime = 'more than half a year ago';
	}
	return {
		formattedTime: formattedTime
	};
}