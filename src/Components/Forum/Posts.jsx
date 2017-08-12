/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'

import Post from './Post'


const Posts = ({ posts }) => {
    /**
     * Render the component.
     */
    return (
      <div>
          {posts.map((post, i) => <Post key={`post_${i}`} post={post} />)}
      </div>
    )
}

export default Posts
