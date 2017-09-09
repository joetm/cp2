 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
// --

import { sendChatMessage, fetchChat } from '../../actions'
import { gray, black } from '../../common/theme'
import routes from '../../routes'
import ChatInput from './ChatInput'


const styles = {
  chatList: {
    overflowY: 'auto',
  },
  listitem: {
  },
  chatText: {
    fontSize: '0.8em',
    color: gray,
  },
  username: {
    fontWeight: 400,
    cursor: 'pointer',
  },
  avatar: {
    cursor: 'pointer',
  },
  content: {
    // color: gray,
    color: black,
  },
  timestamp: {
    // color: gray,
  },
}


class Chat extends React.Component {
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
        <List style={{...styles.chatList, ...this.props.style, maxHeight: this.props.maxHeight}}>
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
  isFetching: state.chat.isFetching,
  chat: state.chat.items,
})

export default withRouter(connect(
  mapStateToProps,
  { sendChatMessage, fetchChat }
)(Chat))
