/** @flow */

import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Avatar from './Avatar'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
// --
import HomePin from 'material-ui/svg-icons/action/account-balance'
import GroupPin from 'material-ui/svg-icons/social/group'
import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'
// --
import ProfileIcon  from 'material-ui/svg-icons/action/perm-identity'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import LogOutIcon   from 'material-ui/svg-icons/action/exit-to-app'

import {navigateTo} from './actions'
import CustomBadge from './CustomBadge'
import RouterMenuItem from './RouterMenuItem'

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
}


const NavbarSeparator = () => (
    <div style={styles.separator}></div>
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
                        <CustomBadge
                            badgeContent={123}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="New Forum Activity"
                            icon={<GroupPin />}
                        />
                    </Link>
                    <Link to="/updates/notifications">
                        <CustomBadge
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="Notifications"
                            icon={<EmailIcon />}
                        />
                    </Link>
                    <Link to="/updates">
                        <CustomBadge
                            badgeContent={23}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="New Updates"
                            icon={<UpdatesIcon />}
                        />
                    </Link>
                </ToolbarGroup>
                <ToolbarGroup>
                    <IconMenu
                      iconButtonElement={
                        <IconButton tooltip="Your Profile">
                            <Avatar src={'/img/avatar/face.jpg'} mini={true} />
                        </IconButton>
                      }
                    >
                        <RouterMenuItem url={'/profile'} primaryText="Your Profile" icon={<ProfileIcon />} />
                        <RouterMenuItem url={'/settings'} primaryText="Settings" icon={<SettingsIcon />} />
                        <Divider />
                        <RouterMenuItem url={'/logout'} primaryText="Log Out" icon={<LogOutIcon />} />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default NavBar
