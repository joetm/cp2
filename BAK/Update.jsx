/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton';
import LikeAction from 'material-ui/svg-icons/action/thumb-up'
import FavoriteAction from 'material-ui/svg-icons/action/favorite'
import CommentAction from 'material-ui/svg-icons/communication/chat-bubble-outline'

import { LikeButton, FavoriteButton, CommentButton} from './Button'

import {navigateTo} from '../actions'


const actionButtonsStyle = {
  float:'right',
}


const Update = (props) => {
  const {id, fromUsername, primaryText, secondaryText, datetime,
    gridColumnsFull, gridColumnsTablet, gridColumnsPhone} = props
  return (
    <div
      class={`mdc-layout-grid__cell mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsFull)} mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsTablet)}-tablet mdc-layout-grid__cell--span-${Math.floor(12 / gridColumnsPhone)}-phone`}
    >
      <Card
          key={`upd_${id}`}
      >
        <CardHeader
          title={fromUsername}
          subtitle={'Master Jedi'}
          avatar="/img/avatar/face.jpg"
          onClick={navigateTo.bind(this)}
        />
        <CardMedia
          onClick={navigateTo.bind(this)}
        >
          <img src="/img/dummyimg.jpg" alt="" />
        </CardMedia>
        <CardTitle
          title={primaryText}
          subtitle={datetime.formattedTime}
          onClick={navigateTo.bind(this)}
          actAsExpander={false}
          expandable={false}
        />
        <CardText expandable={false} actAsExpander={false}>
      		{secondaryText}
        </CardText>
        <CardActions>
          <LikeButton     id={id} tooltip="Like"     icon={<LikeAction     />} />
          <FavoriteButton id={id} tooltip="Favorite" icon={<FavoriteAction />} />
          <CommentButton  id={id} tooltip="Comment"  icon={<CommentAction  />} />
        </CardActions>
      </Card>
    </div>
  )
}

export default Update