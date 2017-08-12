/** @flow */

import React from 'react'
import Divider from 'material-ui/Divider'
import SendIcon from 'material-ui/svg-icons/content/send'
import TextField from 'material-ui/TextField'

import Spacer from '../../Shared/Spacer'
import Post from '../Post'


const styles = {
    subheader: {
        textAlign: 'center',
    },
    messageField: {
        margin: '1em 0',
    },
}


class Thread extends React.Component {
    state = {
        loading: true,
        // DEV
        posts: [
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
    componentDidMount() {
        this.setState({loading: false})
    }
    /**
     * Render the component.
     */
    render () {
        return (
            <div>

                <h2>Thread View</h2>

                {
                    this.state.posts.map((post, i) => (
                        <div
                            key={`p_${i}`}
                        >
                            <Post post={post} />
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
                    />
                    <SendIcon />
                </div>

                <Divider />
                <Spacer />

            </div>
        )
    }
}

export default Thread
