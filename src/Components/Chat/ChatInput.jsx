 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import SendIcon from 'material-ui/svg-icons/content/send'

import { sendChatMessage } from '../../actions'
import routes from '../../routes'


const styles = {
    wrapper: {
      position: 'relative',
      paddingBottom: '10px',
    },
    textfieldWrapper: {
      position: 'relative',
      marginRight: '50px',
      marginLeft: '10px',
    },
    sendIcon: {
      cursor: 'pointer',
      position: 'absolute',
      top: '30px',
      right: '10px',
    },
    textField: {
      marginRight: '50px',
    },
}


class ChatInput extends React.Component {
  navigateToUser = (e) => {
    this.props.history.push(`${routes.PROFILE}/${e.target.id}`)
  }
  handleChangeChatMsg = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.submitMsg()
    }
  }
  submitMsg = () => {
    let content = this.refs.chatinput.getValue().trim()
    if (content !== '') {
      const payload = {
        content,
        userid: this.props.currentUserid,
        username: this.props.currentUsername,
        avatar: this.props.currentUserAvatar,
      }
      // console.log(`send: ${content}`, payload)
      this.props.sendChatMessage(payload)
      // clear the input field
      this.refs.chatinput.getInputNode().value = ''
    }
    // TODO: focus the textfield
    this.refs.chatinput.focus()
  }
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.textfieldWrapper}>
          <TextField
              hintText={this.props.hintText || "What's on your mind?"}
              floatingLabelText={this.props.floatingLabelText || "Your Message"}
              fullWidth={this.props.fullWidth || true}
              ref="chatinput"
              onKeyPress={this.props.sendMsgHandler || this.handleChangeChatMsg}
              style={styles.textField}
              autoFocus
          />
        </div>
        <SendIcon
          style={styles.sendIcon}
          onTouchTap={this.submitMsg}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // TODO -> use deepstream
  currentUserid: state.currentUser.id,
  currentUsername: state.currentUser.username,
  currentUserAvatar: state.currentUser.avatar,
})

export default connect(
  mapStateToProps,
  { sendChatMessage }
)(ChatInput)
