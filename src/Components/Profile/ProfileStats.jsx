/** @flow */

import React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Tab } from 'material-ui/Tabs'
import { pinkA200 } from 'material-ui/styles/colors'
import PhotoPin from 'material-ui/svg-icons/image/photo'
import ChatPin from 'material-ui/svg-icons/communication/chat-bubble-outline'
import ContactsPin from 'material-ui/svg-icons/communication/contacts'
import LikesPin from 'material-ui/svg-icons/action/thumb-up'
import RaisedButton from 'material-ui/RaisedButton'


const styles = {
    statBarStyle: {
        backgroundColor: pinkA200,
    },
    tabsStyle: {
        paddingLeft: '300px',
    },
    inkBarStyle: {
        backgroundColor: 'yellow',
    },
    statStyle: {
        marginTop: '0.4em',
    },
    statTitleStyle: {
        fontSize: '0.6em',
        lineHeight: '0.6em',
        marginBottom: '0.4em',
    },
    statValueStyle: {
        color: '#fff',
        fontSize: '1em',
        lineHeight: '1em',
        marginTop: '0.2em',
        marginBottom: '0.2em',
    },
    followButtonContainerStyle: {
        width: '200px',
        margin: 'auto auto',
    },
    followButton: {
        cursor: 'pointer',
    },
    linkStyle: {
        textDecoration: 'none',
        color: '#fff',
    },
}


const StatText = (props) => (
    <div style={styles.statStyle}>
        <div style={styles.statTitleStyle}>
            {props.title}
        </div>
        <div style={styles.statValueStyle}>
            {props.value}
        </div>
    </div>
)


class ProfileStats extends React.Component {
    state = {
        initialSelectedIndex: 1,
    }
    followUser = (e) => {
        e.stopPropagation()
        console.log('follow the user {TODO}')
    }
    render() {
        const { user } = this.props
        return (
            <div style={styles.statBarStyle}>
                <Tabs
                    style={styles.tabsStyle}
                    initialSelectedIndex={this.state.initialSelectedIndex}
                    inkBarStyle={styles.inkBarStyle}
                >
                    <Tab
                        icon={<ChatPin />}
                        label={<Link
                                    to={`/profile/${user.id}/updates`}
                                    style={styles.linkStyle}
                                >
                                    <StatText title="Posts" value={user.numPosts} />
                                </Link>
                        }
                    />
                    <Tab
                        icon={<PhotoPin />}
                        label={<Link
                                    to={`/profile/${user.id}/album`}
                                    style={styles.linkStyle}
                                >
                                    <StatText title="Pics" value={user.numImages} />
                                </Link>
                        }
                    />
                    <Tab
                        icon={<ContactsPin />}
                        label={<Link
                                    to={`/profile/${user.id}/followers`}
                                    style={styles.linkStyle}
                                >
                                    <StatText title="Followers" value={user.numFollowers} />
                                </Link>
                        }
                    />
                    <Tab
                        icon={<LikesPin />}
                        label={<Link
                                    to={`/profile/${user.id}/likes`}
                                    style={styles.linkStyle}
                                >
                                    <StatText title="Likes" value={user.numLikes} />
                                </Link>
                        }
                    />
                    <Tab
                        label={
                            <RaisedButton
                                label="Secondary"
                                secondary={true}
                                style={styles.followButton}
                                onTouchTap={this.followUser}
                            />
                        }
                    />
                </Tabs>
            </div>
        )
    }
}

export default ProfileStats
