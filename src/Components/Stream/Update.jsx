/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardActions, CardHeader, CardMedia, CardTitle } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'

import { LikeButton, FavoriteButton, CommentButton } from './Button'
import { navigateTo } from '../../common/helpers'



const Update = (props) => {
  const {
    type, id, username, src, avatar, title,
    likes, dislikes, replies,
    gridColumnsFull, gridColumnsTablet, gridColumnsPhone,
    history
  } = props
  let url = '/'
  switch(type) {
    case 'image':
      url = `/images/${id}`
    case 'video':
      url = `/videos/${id}`
  }
  return (
    <div
      className={`mdc-layout-grid__cell mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsFull)} mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsTablet)}-tablet mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsPhone)}-phone`}
    >
      <Card
        onTouchTap={() => history.push(url)}
      >
        <CardMedia>
          <img src={src} alt="" />
        </CardMedia>
        <CardHeader
          title={username}
          subtitle={'Master Jedi'}
          avatar={<Avatar src={avatar} />}
        />
        <CardTitle
          title={title}
          actAsExpander={false}
          expandable={false}
        />
        {/*
          <CardActions actAsExpander={false} expandable={false}>
            <LikeButton     msg={111} />
            <FavoriteButton msg={222} />
            <CommentButton  msg={333} />
          </CardActions>
        */}
      </Card>
    </div>
  )
}

export default withRouter(Update)
