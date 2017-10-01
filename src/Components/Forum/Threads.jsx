/** @flow */

import React from 'react'

import Loader from '../Shared/Loader'
import PostsWrapper from './PostsWrapper'


const Threads = (props) => {
  const { threads } = props
  return (
    <div>
      <div>
        <Loader isLoading={!threads.length} />
        <PostsWrapper posts={threads} />
      </div>
    </div>
  )
}

export default Threads
