/** @flow */

import React from 'react'

import Loader from '../Shared/Loader'
import PostsWrapper from './PostsWrapper'
import Headline from '../Shared/Headline'


const Posts = (props) => {
  const { posts, embedded } = props
  return (
    <div>
      {
        !embedded &&
        <Headline level="2">Posts</Headline>
      }
      <div>
        <Loader isLoading={!posts.length} />
        <PostsWrapper posts={posts} />
      </div>
    </div>
  )
}

export default Posts
