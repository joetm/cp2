 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'

import { sendChatMessage } from '../../actions'
import colors from '../../common/theme'
import ChatInput from './ChatInput'


const styles = {
  listitem: {
  },
  chatText: {
    fontSize: '0.8em',
    color: colors.gray,
  },
  username: {
    fontWeight: 400,
    cursor: 'pointer',
  },
  content: {
    // color: colors.gray,
    color: colors.black,
  },
  timestamp: {
    // color: colors.gray,
  },
}


class Chat extends React.Component {
  render() {
    return (
      <div>
        <List>

          {
            this.props.chat.map((chatitem) => (
              <ListItem
                  style={styles.listitem}
                  primaryText={<div style={styles.chatText}>
                    <span style={styles.username} onTouchTap={this.navigateToUser}>{chatitem.username}</span>
                    {' '}
                    <span style={styles.content}>{chatitem.content}</span>
                  </div>}
                  leftAvatar={<Avatar src={chatitem.avatar} />}
                  autoGenerateNestedIndicator={false}
                  disableKeyboardFocus={true}
                  disabled={true}
              />
            ))
          }

        </List>
        <Divider />

        <ChatInput
            hintText="What's on your mind?"
            floatingLabelText="Your Message"
            fullWidth={true}
            ref="chatinput"
            onKeyPress={this.handleChangeChatMsg}
        />

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // TODO -> use deepstream
  chat: state.chat,
  currentUserid: state.currentUser.userid,
  currentUsername: state.currentUser.username,
})

export default withRouter(connect(
  mapStateToProps,
  { sendChatMessage }
)(Chat))
