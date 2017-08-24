/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip';
import SendIcon from 'material-ui/svg-icons/content/send'
import TextField from 'material-ui/TextField'
import parser from 'bbcode-to-react'

import Spacer from '../Shared/Spacer'
import CellPadding from '../Shared/CellPadding'
import { fetchMessageHistory, sendMessage } from '../../actions'


// DEV
const MYUSERID = 1


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


class MessageHistory extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      inputRows: 1,
      userid: null,
    }
    // bindings
    this._handleKeyPress = this._handleKeyPress.bind(this)
    this.submitMsg = this.submitMsg.bind(this)
  }
  componentDidMount() {
    const userid = this.props.match.params.opponentid
    this.props.fetchMessageHistory(userid)
    this.setState({userid, loading: false})
  }
  /**
   * Handle key press event on message field.
   * @param e - Event
   */
   _handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.submitMsg()
    }
  }
  /**
   * Submit the input field.
   */
  submitMsg() {
    let msg = this.refs.inputfield.getValue().trim()
    if (msg) {
      this.props.sendMessage(this.props.messageHistory.userid, msg, this.props.currentUser)
      // clear the input field
      this.refs.inputfield.getInputNode().value = ''
      // reset number of rows in the input field
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

    console.log('messages', messages)

    return (
      <div>
      <h2>Private Message History</h2>

      {messageHistory.username &&
        <Subheader style={styles.subheader}>
        with {messageHistory.username}
        </Subheader>
      }

      <div className="mdc-layout-grid">
      <div className="mdc-layout-grid__inner">

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
            style={{clear:'both'}}
            >
              <Chip
              style={{...styles.chip, ...{float: this.props.currentUserid === item.userid ? 'right': 'left'}}}
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
      </div>
      </div>

      <Spacer />

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  messageHistory: state.messageHistory,
  currentUserid: state.currentUser.userid,
  currentUser: state.currentUser,
})

export default connect(
  mapStateToProps,
  { fetchMessageHistory, sendMessage }
  )(MessageHistory)
