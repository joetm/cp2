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
import { sendMessage } from '../../reducers'


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
    },
    messageField: {
        margin: '1em 0',
    },
}


class MessageHistory extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            inputRows: 1,
        }
        // bindings
        this._handleKeyPress = this._handleKeyPress.bind(this)
    }
    componentDidMount() {
        this.setState({loading: false})
    }
    /**
     * Handle key press event on message field.
     * @param e - Event
     */
    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!e.shiftKey) {
                this.submitMsg(e.target.value)
            }
        }
    }
    /**
     * Submit the input field.
     */
    submitMsg(msg) {
        msg = msg.trim()
        if (msg) {
            this.props.sendMessage(this.props.messageHistory.userid, msg)
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
        const msgHistory = this.props.messageHistory
        // console.log('render', msgHistory)
        return (
            <div>
                <h2>Private Message History</h2>

                <Subheader style={styles.subheader}>
                    with {msgHistory.username}
                </Subheader>

                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">

                    <CellPadding
                        full={2}
                        tablet={1}
                        phone={0}
                    />

                    <div class="mdc-layout-grid__cell
                                mdc-layout-grid__cell--span-8
                                mdc-layout-grid__cell--span-6-tablet
                                mdc-layout-grid__cell--span-4-phone">

                        {
                            msgHistory.messages.map((item, i) => (
                                <div
                                    key={`msg_${i}`}
                                    style={{clear:'both'}}
                                >
                                    <Chip
                                        style={{...styles.chip, ...{float: MYUSERID === item.userid ? 'right': 'left'}}}
                                    >
                                        <Avatar src={item.avatar} />
                                        {parser.toReact(item.msg)}
                                    </Chip>
                                </div>
                            ))
                        }

                        <div style={styles.messageField}>
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
                            <SendIcon
                                onTouchTap={() => {}}
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
    messageHistory: state.messageHistory
})

export default connect(
    mapStateToProps,
    { sendMessage }
)(MessageHistory)
