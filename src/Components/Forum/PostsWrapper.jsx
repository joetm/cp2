/** @flow */

import React from 'react'
import { List } from 'material-ui/List'

import Post from './Post'


const PostsWrapper = (props) => {
    const { posts } = props
    return (
      <List>
          {posts.map((post) => <Post key={`post_${post.id}`} post={post} />)}
      </List>
    )
}

export default PostsWrapper
