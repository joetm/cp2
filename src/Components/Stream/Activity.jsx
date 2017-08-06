/** @flow */

import React from 'react'
// import Avatar from 'material-ui/Avatar'
import {CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {colors} from '../../shared/theme'
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
// import LikeAction from 'material-ui/svg-icons/action/thumb-up'
// import FavoriteAction from 'material-ui/svg-icons/action/favorite'
// import CommentAction from 'material-ui/svg-icons/communication/chat-bubble-outline'
// Material Component: Layout (Grid)
// import '@material/layout-grid/dist/mdc.layout-grid.css'

import {navigateTo} from '../../shared/helpers'
import Avatar from '../Shared/Avatar'
import Thumbnail from './Thumbnail'


const styles = {
    activity: {
      padding: '16px',
      display: 'block',
    },
    activitytext: {
      display: 'inline-block',
      // flex: 1,
      // flexBasis: '0.000000001px',
      margin: 0,
      padding: 0,
      border: 0,
    },
    activitytitle: {
      display: 'block',
      marginBottom: '8px',
      maxHeight: '4rem',
      overflow: 'hidden',
      fontSize: '1.6rem',
      fontWeight: 500,
      lineHeight: '2rem',
      cursor: 'pointer',
    },
    activitysubtitle: {
      display: 'block',
      marginLeft: 0,
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: colors.grey,
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 400,
      lineHeight: '1.2rem',
    },
    thumbnail: {
      display: 'inline-block',
      position: 'relative',
      marginRight: '8px',
      height: '68px',
      width: '120px',
      '-ms-flex': 'none',
      '-webkit-flex': 'none',
      flex: 'none',
    },
}



// <Avatar src={'/img/avatar/face-1.jpg'} mini={true} />
const Activity = (props) => {
  const {id, fromUsername, primaryText, secondaryText, datetime,
    gridColumnsFull, gridColumnsTablet, gridColumnsPhone} = props
  return (
      <div
        key={`upd_${id}`}
      >

          <div style={styles.activity}>

            <Thumbnail src="/img/dummyimg.jpg" style={styles.thumbnail} />

            <div style={styles.activitytext}>
                <span style={styles.activitytitle}>{primaryText}</span>
                <span style={styles.activitysubtitle}>{fromUsername}</span>
            </div>

          </div>
          <Divider />

      </div>
  )
}

export default Activity
