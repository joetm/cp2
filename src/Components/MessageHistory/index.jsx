/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip';
import SendIcon from 'material-ui/svg-icons/content/send'
import TextField from 'material-ui/TextField'
import parser from 'bbcode-to-react'

import Spacer from '../Shared/Spacer'
import CellPadding from '../Shared/CellPadding'
import store from '../../store'
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
    state = {
        loading: true,
        // DEV
        user: { userid: 1, name: "Joe"},
        opponent: { userid: 2, name: "Gonzales"},
    }
    componentDidMount() {
        this.setState({loading: false})
    }
    /**
     * Handle key press event on message field.
     * @param e - Event
     */
    _handleKeyPress(e) {
        if (!e.shiftKey && e.key === 'Enter') {
            this.props.sendMessage(2, e.target.value)
            // clear input
            e.target.value = ''
        } else if (e.key === 'Enter') {
            // TODO: detect and insert line breaks


        }
    }
    /**
     * Render the component.
     */
    render () {
        const msgHistory = this.props.messageHistory
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
                                rows={1}
                                onKeyPress={this._handleKeyPress.bind(this)}
                            />
                            <SendIcon />
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
    messageHistory: state.app.messageHistory
})

export default connect(
    mapStateToProps,
    { sendMessage }
)(MessageHistory)
