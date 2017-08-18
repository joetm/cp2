/** @flow */

import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle } from 'material-ui/Card'
import LikeAction from 'material-ui/svg-icons/action/thumb-up'
import FavoriteAction from 'material-ui/svg-icons/action/favorite'
import CommentAction from 'material-ui/svg-icons/communication/chat-bubble-outline'
import Avatar from 'material-ui/Avatar'

import { LikeButton, FavoriteButton, CommentButton } from './Button'

import { navigateTo } from '../../common/helpers'


const Update = (props) => {
  const { id, username, src, avatar, title,
    gridColumnsFull, gridColumnsTablet, gridColumnsPhone } = props
  return (
    <div
      className={`mdc-layout-grid__cell mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsFull)} mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsTablet)}-tablet mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsPhone)}-phone`}
    >
      <Card>
        <CardMedia
          onClick={navigateTo.bind(this)}
        >
          <img src={src} alt="" />
        </CardMedia>
        <CardHeader
          title={username}
          subtitle={'Master Jedi'}
          avatar={<Avatar src={avatar} />}
          onClick={navigateTo.bind(this)}
        />
        <CardTitle
          title={title}
          onClick={navigateTo.bind(this)}
          actAsExpander={false}
          expandable={false}
        />
        <CardActions actAsExpander={false} expandable={false}>
          <LikeButton     tooltip="Like"     icon={<LikeAction     />} />
          <FavoriteButton tooltip="Favorite" icon={<FavoriteAction />} />
          <CommentButton  tooltip="Comment"  icon={<CommentAction  />} />
        </CardActions>
      </Card>
    </div>
  )
}

export default Update
