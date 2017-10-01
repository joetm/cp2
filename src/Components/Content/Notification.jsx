/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ListItem } from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
// import Subheader from 'material-ui/Subheader'
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import { replyNotification, forwardNotification, deleteNotification } from '../../actions'
import { PROFILE, FORUM, CATEGORIES, POSTS, THREADS } from '../../routes'
import Avatar from '../Shared/Avatar'


const styles = {
  avatarIcon: {
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    left: '16px',
  }
}


class Notification extends React.Component {
  state = {
    showMenu: true,
  }
  replyNotification = () => {
    // TODO
    // this.props.replyNotification()
    console.log('TODO: reply to notification')
  }
  forwardNotification = () => {
    // TODO
    // this.props.forwardNotification(this.props.id)
    console.log('TODO: forward notification')
  }
  deleteNotification = () => {
    // TODO
    // this.props.deleteNotification(this.props.id)
    console.log('TODO: delete notification')
  }
  deleteLike = () => {
    // TODO
    console.log('TODO: delete like')
  }
  /**
   * Render the component.
   */
  render () {
    //
    const {
      streamitem = {},
      user = {},
      userid,
      username,
      avatar,
      type, id, title, thumb,
      content, history
    } = this.props
    const { showMenu } = this.state

    let primaryText
    let secondaryText
    let rightIconMenu
    let touchTapAction

    switch (type) {
      case 'like':
      case 'dislike':
        secondaryText = (
          <p>
            {user.username} liked your{' '}
            <a href={`/${streamitem.type}s/${streamitem.id}`}>{streamitem.type}</a>
          </p>
        )
        rightIconMenu = null
        touchTapAction = null
        break

      case 'user':
      case 'admin':
      case 'moderator':
      case 'follower':

        primaryText = username
        secondaryText = (
          <p>
            {user.usertitle}
          </p>
        )
        rightIconMenu = null // TODO
        touchTapAction = () => history.push(`${PROFILE}/${user.id}`)

        break

      case 'post':

        secondaryText = (
          <p>{content}</p>
        )

        rightIconMenu = null // TODO
        touchTapAction = () => history.push(`${FORUM}${POSTS}/${id}`)

        break

      case 'category':

        secondaryText = <p>{content}</p>

        rightIconMenu = null // TODO
        touchTapAction = () => history.push(`${FORUM}${CATEGORIES}/${id}`)

        break

      case 'thread':

        secondaryText = <p>{title}</p>

        rightIconMenu = null // TODO
        touchTapAction = () => history.push(`${FORUM}${THREADS}/${id}`)

        break

      default:

        secondaryText = <p>{user.username}{' '}-{' '}{content}</p>

        rightIconMenu = (
          <IconMenu iconButtonElement={(
              <IconButton
                tooltip="more"
                tooltipPosition="bottom-left"
                onTouchTap={e => e.stopPropagation()}
              >
                <MoreVertIcon />
              </IconButton>
          )}>
              <MenuItem onTouchTap={this.replyNotification}>Reply</MenuItem>
              <MenuItem onTouchTap={this.forwardNotification}>Forward</MenuItem>
              <MenuItem onTouchTap={this.deleteNotification}>Delete</MenuItem>
          </IconMenu>
        )

        touchTapAction = null
    }

    return (
        <ListItem
          leftAvatar={
            <Avatar
              username={user.username || username}
              style={styles.avatarIcon}
              src={user.avatar || avatar || thumb}
              macro={true}
              onTouchTap={e => {
                e.stopPropagation()
                history.push(`${PROFILE}/${userid}`)
              }}
            />
          }
          rightIconButton={showMenu ? rightIconMenu : null}
          primaryText={primaryText || title}
          secondaryText={secondaryText}
          // onMouseEnter={() => this.setState({showMenu: true})}
          // onMouseLeave={() => this.setState({showMenu: false})}
          secondaryTextLines={2}
          style={{cursor: typeof touchTapAction === 'function' ? 'pointer' : 'inherit'}}
          onTouchTap={touchTapAction}
        />
    )
  }
}

// const mapStateToProps = (state) => ({
//     updates: state.updates
// })

export default withRouter(connect(
  null,
  { replyNotification, forwardNotification, deleteNotification }
)(Notification))
