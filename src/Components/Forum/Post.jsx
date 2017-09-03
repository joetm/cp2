/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import { withRouter } from 'react-router-dom'


const Post = props => {
  const { post, history, match } = props
  /**
   * Render the component.
   * @returns <ListItem />
   */
  return (
      <ListItem
        key={`upd_${post.id}`}
        leftAvatar={<Avatar src={post.user.avatar} />}
        primaryText={post.title}
        secondaryText={post.user.username}
        secondaryTextLines={2}
        autoGenerateNestedIndicator={true}
        onTouchTap={() => history.push(`${match.url}/thread/${post.id}`)}
      />
  )
}

export default withRouter(Post)
