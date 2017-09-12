/** @flow */

import React from 'react'
import { connect } from 'react-redux'

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

export default Posts
