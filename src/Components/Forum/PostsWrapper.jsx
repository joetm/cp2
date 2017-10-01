/** @flow */

import React from 'react'
import { List } from 'material-ui/List'

import Notification from '../Content/Notification'


const PostsWrapper = (props) => {
  const { posts } = props
  return (
    <List>
      {posts.map((post) => <Notification key={`post_${post.id}`} {...post} />)}
    </List>
  )
}

export default PostsWrapper
