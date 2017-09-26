/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from 'material-ui/Tabs'
import PhotoIcon from 'material-ui/svg-icons/image/photo'
import PostIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import ContactsIcon from 'material-ui/svg-icons/communication/contacts'
import CrowdIcon from 'material-ui/svg-icons/device/location-searching'
import RaisedButton from 'material-ui/RaisedButton'

import routes from '../../routes'


const styles = {
    tabsStyle: {
        paddingLeft: '300px',
    },
    inkBarStyle: {
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


class ProfileStats extends React.Component {
    constructor(props) {
        super(props)
        // pre-select the right tab based on the url
        let selected = 1
        const currUrl = props.location.pathname
        if (currUrl.endsWith(routes.FOLLOWERS)) {
            selected = 3
        } else if (currUrl.endsWith(routes.VIDEOS)) {
            selected = 2
        } else if (currUrl.endsWith(routes.POSTS)) {
            selected = 0
        }
        this.state = {
            initialSelectedIndex: selected,
        }
    }
    followUser = (e) => {
        e.stopPropagation()
        console.log('follow the user {TODO}')
    }
    handleTabChange = (tab) => {
        this.props.history.push(tab.props.route)
    }
    render() {
        const { user, palette } = this.props
        console.log('palette', palette)
        const { url } = this.props.match
        return (
            <div style={{backgroundColor: user.isOnline ? palette.primary2Color : palette.primary1Color}}>
                <Tabs
                    style={styles.tabsStyle}
                    initialSelectedIndex={this.state.initialSelectedIndex}
                    inkBarStyle={styles.inkBarStyle}
                >
                    <Tab
                        icon={<PostIcon />}
                        route={`${url}${routes.POSTS}`}
                        label={`${user.numPosts} Posts`}
                        onActive={this.handleTabChange}
                    />
                    <Tab
                        icon={<PhotoIcon />}
                        route={`${url}${routes.IMAGES}`}
                        label={`${user.numImages} Images`}
                        onActive={this.handleTabChange}
                    />
                    <Tab
                        icon={<PhotoIcon />}
                        route={`${url}${routes.VIDEOS}`}
                        label={`${user.numVideos} Videos`}
                        onActive={this.handleTabChange}
                    />
                    <Tab
                        icon={<ContactsIcon />}
                        route={`${url}${routes.FOLLOWERS}`}
                        label={`${user.numFollowers} Followers`}
                        onActive={this.handleTabChange}
                    />
                    {/*
                        Not clear, if this likes received or given
                        --> do this later
                    <Tab
                        icon={<LikesPin />}
                        route={`${url}${routes.LIKES}`}
                        label={`${user.numLikes} Likes`}
                        onActive={this.handleTabChange}
                    />
                    */}
                    <Tab
                        icon={<CrowdIcon />}
                        route={routes.REVIEW}
                        label={"23 Crowd Points"}
                        onActive={this.handleTabChange}
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

export default withRouter(ProfileStats)
