 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import { PROFILE } from '../../routes'
import { removeChatMsg } from '../../actions'
// import Avatar from '../Shared/Avatar'


const styles = {
  chatText: {
    fontSize: '0.8em',
  },
  username: {
    fontWeight: 400,
    cursor: 'pointer',
  },
  avatar: { cursor: 'pointer' },
  deleteButton: {
    cursor: 'pointer',
    float: 'right',
  },
}


class ChatItem extends React.Component {
    navigateToUser = (userid) => () => {
      this.props.history.push(`${PROFILE}/${userid}`)
    }
    render() {
      const {
        id,
        user,
        content,
        timestamp,
        removeChatMsg
      } = this.props
      return (
        <ListItem
          primaryText={<div style={styles.chatText}>
            <span
              style={{...styles.username, color: this.props.muiTheme.palette.secondaryTextColor}}
              onTouchTap={() => this.navigateToUser(user.id)}
            >
              {user.username}
            </span>
            {' '}
            <span style={{color: this.props.muiTheme.palette.textColor}}>{content}</span>
          </div>}
          leftAvatar={
            <Avatar
              src={user.avatar}
              style={styles.avatar}
              onTouchTap={() => this.navigateToUser(user.id)}
            />
          }
          rightIconButton={
            <IconButton
              onTouchTap={() => removeChatMsg(id)}
              iconStyle={{color: this.props.muiTheme.palette.secondaryTextColor}}
            >
              <DeleteIcon />
            </IconButton>
          }
          autoGenerateNestedIndicator={false}
          disableKeyboardFocus={true}
          disabled={true}
        />
      )
    }
}

export default withRouter(muiThemeable()(connect(
  null,
  { removeChatMsg }
)(ChatItem)))
