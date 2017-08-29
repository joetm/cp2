/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardActions, CardHeader, CardMedia, CardTitle } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'

import { LikeButton, FavoriteButton, CommentButton } from './Button'
import { navigateTo } from '../../common/helpers'



const Update = (props) => {

  const {
    type, id, username, src, avatar, title, thumb,
    likes, dislikes, replies,
    gridColumnsFull, gridColumnsTablet, gridColumnsPhone,
    history
  } = props

  const showTitle = props.showTitle === false ? false : true

  let url = '/'
  let img
  switch(type) {
    case 'image':
      url = `/images/${id}`
      img = src
    case 'video':
      url = `/videos/${id}`
      img = thumb
  }

  return (
    <div
      className={`mdc-layout-grid__cell mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsFull)} mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsTablet)}-tablet mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsPhone)}-phone`}
    >
      <Card
        onTouchTap={() => history.push(url)}
        style={{cursor: 'pointer'}}
      >
        <CardMedia>
          <img src={img} alt="" />
        </CardMedia>
        <CardHeader
          title={username}
          avatar={<Avatar src={avatar} />}
        />
        {/* subtitle={usertitle} */}
        {
          showTitle === true &&
            <CardTitle
              title={title}
              actAsExpander={false}
              expandable={false}
            />
        }
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
