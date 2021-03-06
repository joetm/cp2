 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
import FullScreenIcon from 'material-ui/svg-icons/action/aspect-ratio'
import { findDOMNode } from 'react-dom'

import { sendChatMessage, fetchChat } from '../../actions'
import { jumpToBottom } from '../../common/helpers'
import { CHAT } from '../../routes'
import ChatInput from './ChatInput'
import Loader from '../Shared/Loader'
import Spacer from '../Shared/Spacer'
import BoxHeader from '../Shared/BoxHeader'
import ScrollToTop from '../Shared/ScrollToTop'
import Headline from '../Shared/Headline'
import ChatItem from './ChatItem'


const _OFFSET = 260

const styles = {
  chatList: { overflowY: 'auto' },
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
                <Headline level="2">Chat</Headline>
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
