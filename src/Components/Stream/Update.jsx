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

import {navigateTo} from '../../shared/actions'


const actionButtonsStyle = {
  float:'right',
}


//        <CardText expandable={false} actAsExpander={false}>
//          {secondaryText}
//        </CardText>
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
        <CardMedia
          onClick={navigateTo.bind(this)}
        >
          <img src="/img/dummyimg.jpg" alt="" />
        </CardMedia>
        <CardHeader
          title={fromUsername}
          subtitle={'Master Jedi'}
          avatar="/img/avatar/face.jpg"
          onClick={navigateTo.bind(this)}
        />
        <CardTitle
          title={primaryText}
          onClick={navigateTo.bind(this)}
          actAsExpander={false}
          expandable={false}
        />
        <CardActions actAsExpander={false} expandable={false}>
          <LikeButton     id={id} tooltip="Like"     icon={<LikeAction     />} />
          <FavoriteButton id={id} tooltip="Favorite" icon={<FavoriteAction />} />
          <CommentButton  id={id} tooltip="Comment"  icon={<CommentAction  />} />
        </CardActions>
      </Card>
    </div>
  )
}

export default Update
