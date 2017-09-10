 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import FullScreenIcon from 'material-ui/svg-icons/action/aspect-ratio'
import IconButton from 'material-ui/IconButton'

import { sendChatMessage, fetchChat } from '../../actions'
import { gray, black, lightGray } from '../../common/colors'
import routes from '../../routes'
import ChatInput from './ChatInput'
import Loader from '../Shared/Loader'
import Spacer from '../Shared/Spacer'


const _OFFSET = 260

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
  headerBar: {
    height: '40px',
    lineHeight: '40px',
    fontWeight: 400,
    backgroundColor: lightGray,
    padding: '10px',
  },
  expandIcon: {
    float: 'right',
    cursor: 'pointer',
    margin: 0,
    padding: 0,
  },
}


class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatHeight: props.maxHeight || (window.innerHeight - _OFFSET)
    }
  }
  componentDidMount() {
    this.props.fetchChat()
    window.onresize = () => {
      this.setState({chatHeight: window.innerHeight - _OFFSET})
    }
  }
  componentWillUnmount() {
    window.onresize = null
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
          !isEmbedded &&
            <h2>Chat</h2>
        }

        {
          isEmbedded &&
            <div style={styles.headerBar}>
              Chat
              <IconButton
                tooltip="Expand"
                style={styles.expandIcon}
                onTouchTap={() => history.push(`${routes.CHAT}`)}
              >
                <FullScreenIcon />
              </IconButton>
            </div>
        }

        <Loader isLoading={!chat.length} />

        <List style={{
          ...styles.chatList,
          ...this.props.style,
          height: this.state.chatHeight,
        }}>
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
