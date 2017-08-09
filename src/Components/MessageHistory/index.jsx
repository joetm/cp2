/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip';
import SendIcon from 'material-ui/svg-icons/content/send'
import TextField from 'material-ui/TextField'

import Spacer from '../Shared/Spacer'
import CellPadding from '../Shared/CellPadding'


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
    wrapper: {
        clear: 'both',
        maxWidth: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}


class MessageHistory extends React.PureComponent {
    state = {
        // DEV
        user: { userid: 1, name: "Joe"},
        opponent: { userid: 2, name: "Gonzales"},
        messages: [
            {
                username: "Gonzales",
                userid: 2,
                avatar: '/img/avatar/face-13.jpg',
                msg: "Wassup, homie?",
            },
            {
                username: "me",
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                msg: "wha?",
            },
            {
                username: "Gonzales",
                userid: 2,
                avatar: '/img/avatar/face-13.jpg',
                msg: "wassssuuuuup?",
            },
            {
                username: "me",
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                msg: "wassssuuuuup?",
            },
            {
                username: "Gonzales",
                userid: 2,
                avatar: '/img/avatar/face-13.jpg',
                msg: "...uuuuu...",
            },
            {
                username: "me",
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                msg: "...uuuuu...",
            },
            {
                username: "me",
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                msg: "...uuuuup?!",
            },
        ],
    }
    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            const messages = this.state.messages
            messages.push({
                username: 'me',
                userid: 1,
                avatar: '/img/avatar/face.jpg',
                // msg: this.refs.inputfield.input.value
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
        return (
            <div>

                <h2>Private Message History</h2>

                <Subheader style={styles.subheader}>
                    with {this.state.opponent.name}
                </Subheader>

                {CellPadding}

                <div class="mdc-layout-grid">
                  <div class="mdc-layout-grid__inner">
                    <div class="mdc-layout-grid__cell
                                mdc-layout-grid__cell--span-6
                                mdc-layout-grid__cell--span-8-tablet
                                mdc-layout-grid__cell--span-4-phone">

                    {
                        this.state.messages.map((item, i) => (
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

                    </div>
                  </div>
                </div>


                <div>
                    <TextField
                        id="new-message"
                        hintText="Enter Message..."
                        floatingLabelText="New Message"
                        ref="inputfield"
                        onKeyPress={this._handleKeyPress.bind(this)}
                    />
                    <SendIcon />
                </div>


                <Divider />

                <Spacer />

            </div>
        )
    }
}

export default MessageHistory
