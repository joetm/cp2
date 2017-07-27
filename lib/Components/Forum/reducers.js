'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _actions = require('./actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function selectedSubreddit() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'reactjs';
  var action = arguments[1];

  switch (action.type) {
    case _actions.SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

function posts() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isFetching: false,
    didInvalidate: false,
    items: []
  };
  var action = arguments[1];

  switch (action.type) {
    case _actions.INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case _actions.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case _actions.RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function postsBySubreddit() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.INVALIDATE_SUBREDDIT:
    case _actions.RECEIVE_POSTS:
    case _actions.REQUEST_POSTS:
      return Object.assign({}, state, _defineProperty({}, action.subreddit, posts(state[action.subreddit], action)));
    default:
      return state;
  }
}

var rootReducer = (0, _redux.combineReducers)({
  postsBySubreddit: postsBySubreddit,
  selectedSubreddit: selectedSubreddit
});

exports.default = rootReducer;