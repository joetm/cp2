 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import FullScreenIcon from 'material-ui/svg-icons/action/aspect-ratio'
import { findDOMNode } from 'react-dom'

import { sendChatMessage, fetchChat } from '../../actions'
import { jumpToBottom } from '../../common/helpers'
import { gray, lightGray } from '../../common/colors'
import { CHAT } from '../../routes'
import ChatInput from './ChatInput'
import Loader from '../Shared/Loader'
import Spacer from '../Shared/Spacer'
import BoxHeader from '../Shared/BoxHeader'
import ScrollToTop from '../Shared/ScrollToTop'
import ChatItem from './ChatItem'


const _OFFSET = 260

const styles = {
  chatList: { overflowY: 'auto' },
  headerBar: {
    height: '40px',
    lineHeight: '40px',
    fontWeight: 400,
    // backgroundColor: lightGray,
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
  render() {
    const { chat, isEmbedded, history } = this.props
    return (
      <div>

        {
          !isEmbedded ?
            (
              <ScrollToTop>
                <h2>Chat</h2>
              </ScrollToTop>
            )
            :
            (
                <BoxHeader
                    headline="Chat"
                    icon={<FullScreenIcon />}
                    iconTooltip="Expand"
                    iconUrl={CHAT}
                    history={history}
                />
            )
        }

        <Loader isLoading={!chat.length} />

        <List
          ref={el => { this.chatContainer = findDOMNode(el) }}
          style={{...styles.chatList, ...this.props.style, height: this.state.chatHeight}}
        >
          {
            chat.map(item => (
                <ChatItem
                    key={`msg_${item.id}`}
                    {...item}
                />
            ))
          }
        </List>

        <Divider />

        <ChatInput
            hintText="What's on your mind?"
            floatingLabelText="Your Message"
            fullWidth={true}
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
