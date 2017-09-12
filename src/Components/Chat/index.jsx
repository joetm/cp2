 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import FullScreenIcon from 'material-ui/svg-icons/action/aspect-ratio'
import IconButton from 'material-ui/IconButton'
import { findDOMNode } from 'react-dom'

import { sendChatMessage, fetchChat } from '../../actions'
import { jumpToBottom } from '../../common/helpers'
import { gray, black, lightGray } from '../../common/colors'
import routes from '../../routes'
import ChatInput from './ChatInput'
import Loader from '../Shared/Loader'
import Spacer from '../Shared/Spacer'


const _OFFSET = 260

const styles = {
  chatList: { overflowY: 'auto' },
  chatText: {
    fontSize: '0.8em',
    color: gray,
  },
  username: {
    fontWeight: 400,
    cursor: 'pointer',
  },
  avatar: { cursor: 'pointer' },
  content: { color: black },
  timestamp: {
    color: gray,
  },
  headerBar: {
    height: '40px',
    lineHeight: '40px',
    fontWeight: 400,
    backgroundColor: lightGray,
    color: gray,
    padding: '10px',
  },
  iconExpandContainer: {
    float: 'right',
    cursor: 'pointer',
  },
  iconExpand: {
    color: gray,
    margin: '-10px 0 0 0',
    padding: 0,
  },
}


class Chat extends React.Component {
  chatContainer = null
  constructor(props) {
    super(props)
    this.state = {
      chatHeight: props.maxHeight || (window.innerHeight - _OFFSET)
    }
  }
  updateHeight = () => {
    this.setState({chatHeight: window.innerHeight - _OFFSET})
  }
  componentWillMount() {
      this.updateHeight()
  }
  componentDidMount() {
    this.props.fetchChat()
    // change chat height when window is resized
    window.addEventListener("resize", this.updateHeight)
    // TODO: observers are deprecated
    // scroll observer - see https://medium.com/@heatherbooker/how-to-auto-scroll-to-the-bottom-of-a-div-415e967e7a24
    const observer = new MutationObserver(() => jumpToBottom(this.chatContainer))
    observer.observe(this.chatContainer, {childList: true})
    jumpToBottom(this.chatContainer)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight)
  }
  navigateToUser = (userid) => () => {
    const userUrl = `${routes.PROFILE}/${userid}`
    this.props.history.push(userUrl)
  }
  render() {
    const { chat, isEmbedded, history } = this.props
    return (
      <div>

        {
          !isEmbedded ?
            ( <h2>Chat</h2> )
            :
            (
                <div style={styles.headerBar}>
                  Chat
                  <IconButton
                    tooltip="Expand"
                    style={styles.iconExpandContainer}
                    iconStyle={styles.iconExpand}
                    onTouchTap={() => history.push(`${routes.CHAT}`)}
                  >
                    <FullScreenIcon />
                  </IconButton>
                </div>
            )
        }

        <Loader isLoading={!chat.length} />

        <List
          ref={el => this.chatContainer = findDOMNode(el)}
          style={{
            ...styles.chatList,
            ...this.props.style,
            height: this.state.chatHeight,
          }}
        >
          {
            chat.map((item) => (
              <ListItem
                  key={item.id}
                  style={styles.listitem}
                  primaryText={<div style={styles.chatText}>
                    <span
                      style={styles.username}
                      onTouchTap={this.navigateToUser(item.user.id)}
                    >
                      {item.user.username}
                    </span>
                    {' '}
                    <span style={styles.content}>{item.content}</span>
                  </div>}
                  leftAvatar={<Avatar
                    src={item.user.avatar}
                    style={styles.avatar}
                    onTouchTap={this.navigateToUser(item.user.id)}
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
            scrollToBottom={jumpToBottom}
            onKeyPress={this.handleChangeChatMsg}
        />

        {
          !isEmbedded &&
            <div>
              <Spacer />
              <Spacer />
            </div>
        }

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
