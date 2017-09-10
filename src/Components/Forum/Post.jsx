/** @flow */

import React from 'react'
// import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import { withRouter } from 'react-router-dom'

import Avatar from '../Shared/Avatar'
import routes from '../../routes'


const Post = props => {
  const { post, history, match } = props
  const { user } = post
  /**
   * Render the component.
   * @returns <ListItem />
   */
  return (
      <ListItem
        key={`upd_${post.id}`}
        leftAvatar={<Avatar username={user.username} src={user.avatar} macro={true} />}
        primaryText={post.title}
        secondaryText={user.username}
        secondaryTextLines={2}
        autoGenerateNestedIndicator={true}
        onTouchTap={() => history.push(`${match.url}${routes.THREADS}/${post.id}`)}
      />
  )
}

export default withRouter(Post)
