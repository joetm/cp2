/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import SendIcon from 'material-ui/svg-icons/content/send'
import TextField from 'material-ui/TextField'
import parser from 'bbcode-to-react'

import Spacer from '../Shared/Spacer'
import CellPadding from '../Shared/CellPadding'
import { fetchMessageHistory, sendMessage } from '../../actions'
import Headline from '../Shared/Headline'
import GridWrap from '../Shared/GridWrap'


const styles = {
  chip: {
    margin: 4,
    display: 'flex',
    flexWrap: 'wrap',
  },
  subheader: {
    textAlign: 'center',
    paddingLeft: 0,
    marginLeft: 0,
  },
  chatArea: {
    clear: 'both',
  },
  messageFieldContainer: {
    margin: '2em 0',
    display: 'block',
    clear: 'both',
  },
  errorMsg: {
    textAlign: 'center',
  },
}


class MessageHistory extends React.Component {
  state = {
    inputRows: 1,
  }
  componentDidMount() {
    this.props.fetchMessageHistory(this.props.match.params.opponentid)
  }
  /**
   * Handle key press event on message field.
   * @param e - Event
   */
  _handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.submitMsg()
    }
  }
  /**
   * Submit the input field.
   */
  submitMsg = () => {
    const { sendMessage, messageHistory = {}, currentUser } = this.props
    const { userid, username, avatar } = currentUser
    let msg = this.refs.inputfield.getValue().trim()
    if (msg) {
      sendMessage({ userid, username, avatar, msg })
      // clear the input field
      this.refs.inputfield.getInputNode().value = ''
      // TODO: reset number of rows in the input field
      this.setState({inputRows: 1})
      // TODO: reset the height of the text field
      // this.refs.inputfield.input.state.height = 24
    }
  }
  /**
   * Render the component.
   */
  render () {
    const { messageHistory } = this.props
    const messages = messageHistory.messages !== undefined ? messageHistory.messages : []
    const errorMsg = !messages.length ? <div style={styles.errorMsg}>No messages.</div> : null

    return (
      <div>
      <Headline>Private Message History</Headline>

      {
        messageHistory.username &&
          <Subheader style={styles.subheader}>
            with {messageHistory.username}
          </Subheader>
      }

      <GridWrap>

      <CellPadding
      full={2}
      tablet={1}
      phone={0}
      />

      <div className="mdc-layout-grid__cell
      mdc-layout-grid__cell--span-8
      mdc-layout-grid__cell--span-6-tablet
      mdc-layout-grid__cell--span-4-phone">

      <div style={styles.chatArea}>
        { errorMsg }
        {
          messages.map((item, i) => (
            <div
            key={`msg_${i}`}
            style={{clear: 'both'}}
            >
              <Chip
              style={{...styles.chip, ...{float: this.props.currentUserid === item.userid ? 'right' : 'left'}}}
              >
                <Avatar src={item.avatar} />
                { parser.toReact(item.content) }
                {/* item.content */}
              </Chip>
            </div>
            ))
        }
      </div>

      <div style={styles.messageFieldContainer}>
      <div className="textFieldWrapper"
      style={{
        display: 'inline-block',
        marginRight: '-30px',
        width: '100%',
        border: '1px solid red'
      }}
      >
      <TextField
      id="new-message"
      hintText="Enter Message..."
      floatingLabelText="New Message"
      ref="inputfield"
      fullWidth={true}
      multiLine={true}
      rows={this.state.inputRows}
      onKeyPress={this._handleKeyPress}
      />
      </div>
      <SendIcon
      style={{cursor: 'pointer', position: 'relative', top: '30px', right: 0}}
      onTouchTap={this.submitMsg}
      />
      </div>

      </div>

      </GridWrap>

      <Spacer />

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  messageHistory: state.messageHistory,
  currentUserid: state.currentUser.id,
  currentUser: state.currentUser,
})

export default connect(
  mapStateToProps,
  { fetchMessageHistory, sendMessage }
  )(MessageHistory)
