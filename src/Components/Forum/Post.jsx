/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {ListItem} from 'material-ui/List'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'


const Post = props => {
  const { post, history } = props
  /**
   * Render the component.
   */
  return (
      <ListItem
        key={`upd_${post.id}`}
        leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
        primaryText={post.title}
        secondaryText={post.username}
        secondaryTextLines={2}
        autoGenerateNestedIndicator={true}
        onTouchTap={() => history.push(`/thread/${post.id}`)}
      />
  )
}

export default Post
