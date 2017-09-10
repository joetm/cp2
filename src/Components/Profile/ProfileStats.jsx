/** @flow */

import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
// TODO
import { pinkA200 } from 'material-ui/styles/colors'
import PhotoIcon from 'material-ui/svg-icons/image/photo'
import PostIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import ContactsIcon from 'material-ui/svg-icons/communication/contacts'
import CrowdIcon from 'material-ui/svg-icons/device/location-searching'
import RaisedButton from 'material-ui/RaisedButton'

import { darkGray } from '../../common/colors'


const styles = {
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


// const StatText = (props) => (
//     <div style={styles.statStyle}>
//         <div style={styles.statTitleStyle}>
//             {props.title}
//         </div>
//         <div style={styles.statValueStyle}>
//             {props.value}
//         </div>
//     </div>
// )


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
            <div style={{backgroundColor: user.isOnline ? pinkA200 : darkGray}}>
                <Tabs
                    style={styles.tabsStyle}
                    initialSelectedIndex={this.state.initialSelectedIndex}
                    inkBarStyle={styles.inkBarStyle}
                >
                    <Tab
                        icon={<PostIcon />}
                        label={`${user.numPosts} Posts`}
                    />
                    <Tab
                        icon={<PhotoIcon />}
                        label={`${user.numImages} Images`}
                    />
                    <Tab
                        icon={<PhotoIcon />}
                        label={`${user.numVideos} Videos`}
                    />
                    <Tab
                        icon={<ContactsIcon />}
                        label={`${user.numFollowers} Followers`}
                    />
                    {/*
                        Not clear, if this likes received or given
                        --> do this later
                    <Tab
                        icon={<LikesPin />}
                        label={`${user.numLikes} Likes`}
                    />
                    */}
                    <Tab
                        icon={<CrowdIcon />}
                        label={"23 Crowd Points"}
                    />
                    <Tab
                      label={
                        <RaisedButton
                          label="Follow"
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
