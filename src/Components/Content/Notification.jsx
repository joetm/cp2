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

import { undoLike, replyNotification, forwardNotification, deleteNotification } from '../../actions'
import { grey } from '../../common/colors'
import Avatar from '../Shared/Avatar'
// import Avatar from 'material-ui/Avatar'
import routes from '../../routes'


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
        // this.props.undoLike(this.props.id)
        console.log('TODO: delete like')
    }
    /**
     * Render the component.
     */
    render () {
        //
        const { streamitem = {}, user = {}, userid, type, title, content } = this.props

        let text
        let rightIconMenu

        console.log('type', type)

        switch (type) {

          case 'like':
          case 'dislike':

            text = (
              <p>
                {user.username} liked your{' '}
                <a href={`/${streamitem.type}s/${streamitem.id}`}>{streamitem.type}</a>
              </p>
            )

            rightIconMenu = null

            break

          default:

            text = <p>{user.username}{' '}-{' '}{content}</p>

            rightIconMenu = (
              <IconMenu iconButtonElement={(
                  <IconButton
                    tooltip="more"
                    tooltipPosition="bottom-left"
                    onTouchTap={e => e.stopPropagation()}
                  >
                    <MoreVertIcon color={grey} />
                  </IconButton>
              )}>
                  <MenuItem onTouchTap={this.replyNotification}>Reply</MenuItem>
                  <MenuItem onTouchTap={this.forwardNotification}>Forward</MenuItem>
                  <MenuItem onTouchTap={this.deleteNotification}>Delete</MenuItem>
              </IconMenu>
            )
        }

        // const LeftImage = <img src={thumb} alt="" style={{width: '160px'}} />

        return (
            <ListItem
              leftAvatar={<Avatar
                username={user.username}
                style={{cursor: 'pointer'}}
                src={user.avatar}
                macro={true}
                onTouchTap={() => this.props.history.push(`${routes.PROFILE}/${userid}`)}
              />}
              rightIconButton={this.state.showMenu ? rightIconMenu : null}
              primaryText={title}
              secondaryText={text}
              // onMouseEnter={() => this.setState({showMenu: true})}
              // onMouseLeave={() => this.setState({showMenu: false})}
              secondaryTextLines={2}
              style={{cursor: 'inherit'}}
            />
        )
    }
}

// const mapStateToProps = (state) => ({
//     updates: state.updates
// })

export default withRouter(connect(
    null,
    { undoLike, replyNotification, forwardNotification, deleteNotification }
)(Notification))
