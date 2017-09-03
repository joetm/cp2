 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import { sendChatMessage, fetchChat } from '../../actions'
import { colors } from '../../common/theme'
import routes from '../../routes'
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
  avatar: {
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


class Chat extends React.PureComponent {
  componentDidMount() {
    this.props.fetchChat()
  }
  navigateToUser = (userid) => () => {
    const userUrl = `${routes.PROFILE}/${userid}`
    this.props.history.push(userUrl)
  }
  render() {
    return (
      <div>
        <List>
          {
            this.props.chat.map((chatitem) => (
              <ListItem
                  key={chatitem.id}
                  style={styles.listitem}
                  primaryText={<div style={styles.chatText}>
                    <span
                      style={styles.username}
                      onTouchTap={this.navigateToUser(chatitem.user.id)}
                    >
                      {chatitem.user.username}
                    </span>
                    {' '}
                    <span style={styles.content}>{chatitem.content}</span>
                  </div>}
                  leftAvatar={<Avatar
                    src={chatitem.user.avatar}
                    style={styles.avatar}
                    onTouchTap={this.navigateToUser(chatitem.user.id)}
                  />}
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
})

export default withRouter(connect(
  mapStateToProps,
  { sendChatMessage, fetchChat }
)(Chat))
