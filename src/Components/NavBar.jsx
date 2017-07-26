/** @flow */

import React from 'react'

import SettingsIcon from 'material-ui/svg-icons/action/settings'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
//import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'
import MenuItem from 'material-ui/MenuItem'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import HomePin from 'material-ui/svg-icons/action/account-balance'
import ForumPin from 'material-ui/svg-icons/communication/chat'
import {Link} from 'react-router-dom'

import ExpandButton from './ExpandButton'
import Avatar from './Avatar'


const styles = {
    navBarStyle: {
        // backgroundColor: '#fff',
        color: '#020202',
    },
    firstItem: {
        paddingLeft: '20px',
    },
    separator: {
        margin: 0,
        padding: '10px',
    },
    badgeRootStyle: {
        margin: 0,
        padding: '0px 10px',
    },
    badgeStyle: {
        top: -6,
        right: 0,
    },
}


const NavbarSeparator = (props) => (
    <div style={styles.separator}></div>
)


const Notifications = () => (
    <Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={styles.badgeStyle}
      style={styles.badgeRootStyle}
    >
      <IconButton tooltip="Notifications">
        <EmailIcon />
      </IconButton>
    </Badge>
)

const Updates = () => (
    <Badge
      badgeContent={23}
      secondary={true}
      badgeStyle={styles.badgeStyle}
      style={styles.badgeRootStyle}
    >
      <IconButton tooltip="New Updates">
        <UpdatesIcon />
      </IconButton>
    </Badge>
)


class NavBar extends React.PureComponent {

    state = {
        value: 3,
    }

    handleChange = (event, index, value) => this.setState({value})

    render() {
        return (
            <Toolbar style={styles.navBarStyle}>
                <ToolbarGroup firstChild={true}>
                    <Link to="/">
                        <IconButton tooltip="Home" style={styles.firstItem}>
                            <HomePin />
                        </IconButton>
                    </Link>
                    <Link to="/forum">
                        <IconButton tooltip="Forum">
                            <ForumPin />
                        </IconButton>
                    </Link>
                    <Link to="/notifications">
                        <Notifications />
                    </Link>
                    <Link to="/updates">
                        <Updates />
                    </Link>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text="CP" />
                </ToolbarGroup>
                <ToolbarGroup>
                    <Link to="/profile">
                        <IconButton tooltip="Your Profile">
                            <Avatar src={'/img/avatar/face.jpg'} mini={true} />
                        </IconButton>
                    </Link>
                    <NavbarSeparator />
                    <Link to="/settings">
                        <IconButton tooltip="Settings">
                            <SettingsIcon />
                        </IconButton>
                    </Link>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default NavBar
