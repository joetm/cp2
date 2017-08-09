/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {ListItem} from 'material-ui/List'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'

function openThread() {
    console.log(this)
}

const Post = props => {
  const { post } = props
  /**
   * Render the component.
   */
  return (
      <ListItem
        key={`upd_${post.id}`}
        leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
        primaryText={post.username}
        secondaryText={<p>
            {post.title}
          </p>}
        secondaryTextLines={2}
        autoGenerateNestedIndicator={true}
        onTouchTap={openThread.bind(this)}
      />
  )
}

export default Post
