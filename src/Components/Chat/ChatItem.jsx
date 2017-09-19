 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import { PROFILE } from '../../routes'
import { removeChatMsg } from '../../actions'
// import Avatar from '../Shared/Avatar'
import { gray, black } from '../../common/colors'


const styles = {
  chatText: {
    fontSize: '0.8em',
    color: gray,
  },
  timestamp: {
    color: gray,
  },
  username: {
    fontWeight: 400,
    cursor: 'pointer',
  },
  content: { color: black },
  avatar: { cursor: 'pointer' },
  deleteButton: {
    cursor: 'pointer',
    float: 'right',
  },
  deleteIcon: {
    color: gray,
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
                style={styles.username}
                onTouchTap={() => this.navigateToUser(user.id)}
              >
                {user.username}
              </span>
              {' '}
              <span style={styles.content}>{content}</span>
            </div>}
            leftAvatar={
              <Avatar
                src={user.avatar}
                style={styles.avatar}
                onTouchTap={() => this.navigateToUser(user.id)}
              />
            }
            rightIconButton={
              <IconButton onTouchTap={() => removeChatMsg(id)}>
                <DeleteIcon iconStyle={styles.deleteIcon} />
              </IconButton>
            }
            autoGenerateNestedIndicator={false}
            disableKeyboardFocus={true}
            disabled={true}
        />
      )
    }
}

export default withRouter(connect(
  null,
  { removeChatMsg }
)(ChatItem))
