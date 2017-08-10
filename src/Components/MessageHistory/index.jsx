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

import Spacer from '../Shared/Spacer'
import CellPadding from '../Shared/CellPadding'
import store from '../../store'
import { sendMessage, mapStateToProps } from '../../reducers'


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
    _handleKeyPress(e) {
        if (!e.shiftKey && e.key === 'Enter') {
            const messages = this.state.messages
            messages.push({
                username: 'me',
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                msg: e.target.value
            })
            this.setState(messages)
            // clear input
            e.target.value = ''
        }
    }
    /**
     * Render the component.
     */
    render () {
        const msgHistory = store.getState().app.messageHistory
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
                                        {item.msg}
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

export default MessageHistory
