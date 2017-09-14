/** @flow */

import React from 'react'

import Loader from '../Shared/Loader'
import PostsWrapper from './PostsWrapper'


const Posts = (props) => {
    const { posts, embedded } = props
    return (
        <div>
            {
                !embedded &&
                <h2>Posts</h2>
            }
            <div>
                <Loader isLoading={!posts.length} />
                <PostsWrapper posts={posts} />
            </div>
        </div>
    )
}

export default Posts
