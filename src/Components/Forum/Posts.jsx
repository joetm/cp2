/** @flow */

import React from 'react'
import { List } from 'material-ui/List'

import Post from './Post'


const Posts = ({ posts }) => {
    /**
     * Render the component.
     */
    return (
      <List>
          {posts.map((post) => <Post key={`post_${post.id}`} post={post} />)}
      </List>
    )
}

export default Posts
