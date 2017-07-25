/** @flow */

import React from 'react'

import SettingsIcon from 'material-ui/svg-icons/action/settings'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import MenuItem from 'material-ui/MenuItem'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import HomePin from 'material-ui/svg-icons/action/account-balance'
import {Link} from 'react-router-dom'


import ExpandButton from './ExpandButton.jsx';
import Avatar from './Avatar.jsx'


const styles = {
    navBarStyle: {
        // backgroundColor: '#fff',
        color: '#020202',
    },
    firstItem: {
        paddingLeft: '20px',
    },
}


const Notifications = () => (
    <Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={{top: 12, right: 12}}
    >
      <IconButton tooltip="Notifications">
        <NotificationsIcon />
      </IconButton>
    </Badge>
)


class NavBar extends React.PureComponent {

    state = {
        value: 3,
    };

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <Toolbar style={styles.navBarStyle}>
                <ToolbarGroup firstChild={true}>
                    <Link to="/">
                        <HomePin style={styles.firstItem} />
                    </Link>
                    <ToolbarSeparator />
                    <Notifications />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text="CP" />
                </ToolbarGroup>
                <ToolbarGroup>
                    <Link to="/profile">
                        <Avatar mini={true} />
                    </Link>
                    <Link to="/settings">
                        <SettingsIcon />
                    </Link>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default NavBar
