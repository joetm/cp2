 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import SendIcon from 'material-ui/svg-icons/content/send'

import { sendChatMessage } from '../../actions'
import colors from '../../common/theme'


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
  constructor(props) {
    super(props)
    this.state = {}
    // bindings
    this.handleChangeChatMsg = this.handleChangeChatMsg.bind(this)
    this.submitMsg = this.submitMsg.bind(this)
  }
  navigateToUser = (e) => {
    this.props.history.push(`/profile/${e.target.id}`)
  }
  handleChangeChatMsg(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.submitMsg()
    }
  }
  submitMsg() {
    let msg = this.refs.chatinput.getValue().trim()
    if (msg) {
      const payload = {
        msg,
        userId: this.props.currentUserid,
        username: this.props.currentUsername,
      }
      console.log(`send: ${msg}`)
      this.props.sendChatMessage(payload)
      // clear the input field
      this.refs.chatinput.getInputNode().value = ''
    }
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
  // chat: state.chat,
  currentUserid: state.currentUser.id,
  currentUsername: state.currentUser.username,
})

export default connect(
  mapStateToProps,
  { sendChatMessage }
)(ChatInput)
