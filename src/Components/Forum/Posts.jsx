/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchPosts } from '../../actions'
import Loader from '../Shared/Loader'
import PostsWrapper from './PostsWrapper'


const Posts = (props) => {
    const { posts } = props
    return (
        <div>
            <h2>Posts</h2>
            <div>
                <Loader isLoading={!posts.length} />
                <PostsWrapper posts={posts} />
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    isFetching: state.posts.isFetching,
    posts: state.posts.items,
})

export default connect(
    mapStateToProps,
    { fetchPosts }
)(Posts)
