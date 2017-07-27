'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INVALIDATE_SUBREDDIT = exports.SELECT_SUBREDDIT = exports.RECEIVE_POSTS = exports.REQUEST_POSTS = undefined;
exports.selectSubreddit = selectSubreddit;
exports.invalidateSubreddit = invalidateSubreddit;
exports.fetchPostsIfNeeded = fetchPostsIfNeeded;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUEST_POSTS = exports.REQUEST_POSTS = 'REQUEST_POSTS';
var RECEIVE_POSTS = exports.RECEIVE_POSTS = 'RECEIVE_POSTS';
var SELECT_SUBREDDIT = exports.SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
var INVALIDATE_SUBREDDIT = exports.INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit: subreddit
  };
}

function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit: subreddit
  };
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit: subreddit
  };
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit: subreddit,
    posts: json.data.children.map(function (child) {
      return child.data;
    }),
    receivedAt: Date.now()
  };
}

function fetchPosts(subreddit) {
  return function (dispatch) {
    dispatch(requestPosts(subreddit));
    return (0, _isomorphicFetch2.default)('https://www.reddit.com/r/' + subreddit + '.json').then(function (response) {
      return response.json();
    }).then(function (json) {
      return dispatch(receivePosts(subreddit, json));
    });
  };
}

function shouldFetchPosts(state, subreddit) {
  var posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

function fetchPostsIfNeeded(subreddit) {
  return function (dispatch, getState) {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}