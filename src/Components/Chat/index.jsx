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
        userid: this.props.currentUserid,
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
      <div>
        <List>
          <ListItem
                style={styles.listitem}
                primaryText={<span style={styles.chatText}>
                  <span id={'1'} style={styles.username} onTouchTap={this.navigateToUser}>Brendan Lim</span>
                  {' '}
                  <span style={styles.content}>ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd ssss dsadssd</span>
                </span>}
                leftAvatar={<Avatar src="img/avatar/face-12.jpg" />}
                autoGenerateNestedIndicator={false}
                disableKeyboardFocus={true}
                disabled={true}
              />
          <ListItem
                style={styles.listitem}
                primaryText={<span style={styles.chat}>
                  <span id={'343'} style={styles.username} onTouchTap={this.navigateToUser}>Tester</span>
                  {' '}
                  <span style={styles.content}>OK, I'll do just that.</span>
                </span>}
                leftAvatar={<Avatar src="img/avatar/face-11.jpg" />}
                autoGenerateNestedIndicator={false}
                disableKeyboardFocus={true}
                disabled={true}
              />
        </List>
        <Divider />

        <TextField
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
  // chat: state.chat,
  currentUserid: state.currentUser.userid,
  currentUsername: state.currentUser.username,
})

export default withRouter(connect(
  mapStateToProps,
  { sendChatMessage }
)(Chat))
