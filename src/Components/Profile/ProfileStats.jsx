/** @flow */

import React from 'react'

import {Tabs, Tab} from 'material-ui/Tabs'
import {pinkA200} from 'material-ui/styles/colors'
import FontIcon from 'material-ui/FontIcon'
// import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin'
import PhotoPin from 'material-ui/svg-icons/image/photo'
import ChatPin from 'material-ui/svg-icons/communication/chat-bubble-outline'
import ContactsPin from 'material-ui/svg-icons/communication/contacts'
import LikesPin from 'material-ui/svg-icons/action/thumb-up'
import {Route, Link} from 'react-router-dom'

import fakeUserRecord from './userRecord'


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
    followButtonStyle: {
        backgroundColor: '#fff',
        color: '#000',
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


const ProfileStats = () => (
    <div style={styles.statBarStyle}>
        <Tabs style={styles.tabsStyle} initialSelectedIndex={1} inkBarStyle={styles.inkBarStyle}>
            <Tab
                icon={<ChatPin />}
                label={<Link to={`/profile/${fakeUserRecord.userid}/updates`} style={styles.linkStyle}>
                        <StatText title="Posts" value="45" />
                        </Link>
                }
            />
            <Tab
                icon={<PhotoPin />}
                label={<Link to={`/profile/${fakeUserRecord.userid}/album`} style={styles.linkStyle}>
                        <StatText title="Pics" value="234" />
                        </Link>
                }
            />
            <Tab
                icon={<ContactsPin />}
                label={<Link to={`/profile/${fakeUserRecord.userid}/followers`} style={styles.linkStyle}>
                        <StatText title="Followers" value="99" />
                        </Link>
                }
            />
            <Tab
                icon={<LikesPin />}
                label={<Link to={`/profile/${fakeUserRecord.userid}/likes`} style={styles.linkStyle}>
                        <StatText title="Likes" value="23" />
                        </Link>
                }
            />
            <Tab
                label={'Follow'}
            />
        </Tabs>
    </div>
)

export default ProfileStats
