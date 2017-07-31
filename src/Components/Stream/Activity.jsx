/** @flow */

import React from 'react'
// import Avatar from 'material-ui/Avatar'
import {CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton';
import LikeAction from 'material-ui/svg-icons/action/thumb-up'
import FavoriteAction from 'material-ui/svg-icons/action/favorite'
import CommentAction from 'material-ui/svg-icons/communication/chat-bubble-outline'
// Material Component: Layout (Grid)
// import '@material/layout-grid/dist/mdc.layout-grid.css'

import {LikeButton, FavoriteButton, CommentButton} from './Button'
import {navigateTo} from '../../shared/actions'
import Avatar from '../Shared/Avatar'


//        <CardText expandable={false} actAsExpander={false}>
//          {secondaryText}
//        </CardText>
const Activity = (props) => {
  const {id, fromUsername, primaryText, secondaryText, datetime,
    gridColumnsFull, gridColumnsTablet, gridColumnsPhone} = props
  return (
    <div
      key={`upd_${id}`}
    >

              <Avatar src={'/img/avatar/face-1.jpg'} mini={true} />


              {fromUsername}
              {'Master Jedi'}


              <img src="/img/dummyimg.jpg" alt="" />

              {primaryText}


              <LikeButton     id={id} tooltip="Like"     icon={<LikeAction     />} />
              <FavoriteButton id={id} tooltip="Favorite" icon={<FavoriteAction />} />
              <CommentButton  id={id} tooltip="Reply"    icon={<CommentAction  />} />

    </div>
  )
}

export default Activity
