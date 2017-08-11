/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'

import Post from './Post'


const Posts = (props) => {
    const { posts } = props
    /**
     * Render the component.
     */
    return (
      <div>
          <Subheader>Category here</Subheader>
          {posts.map((post, i) => <Post key={i} post={post} />)}
      </div>
    )
}

export default Posts
