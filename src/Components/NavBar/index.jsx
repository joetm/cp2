/** @flow */

import React from 'react'
import {Link} from 'react-router-dom'
import Menu from 'material-ui/Menu';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
import {darkBlack} from 'material-ui/styles/colors'
// --
// import Popover from 'material-ui/Popover';
// import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import ForumPin from 'material-ui/svg-icons/social/group'
import HomePin from 'material-ui/svg-icons/action/account-balance'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'
import ReviewPin from 'material-ui/svg-icons/action/find-replace'
import ProfileIcon  from 'material-ui/svg-icons/action/perm-identity'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import LogOutIcon   from 'material-ui/svg-icons/action/exit-to-app'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import { navigateTo } from '../../common/helpers'
import { colors } from '../../common/theme'
// --
import Avatar from '../Shared/Avatar'
import CustomBadge from './CustomBadge'
import RouterMenuItem from './RouterMenuItem'
import userRecord from '../Profile/userRecord'
import LoginButton from './LoginButton'
import SignupButton from './SignupButton'


const styles = {
    firstItem: {
        paddingLeft: '20px',
    },
    separator: {
        margin: 0,
        padding: '10px',
    },
    normalIcon: {
        paddingLeft: '20px',
        cursor: 'pointer',
    }
}


const NavbarSeparator = () => (
    <div style={styles.separator}></div>
)


/*
                    <Link to="/updates/notifications">
                        <CustomBadge
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="Notifications"
                            icon={<EmailIcon />}
                            toggleState={this.toggleState}
                            id={2}
                            active={this.state.activeBadge === 2}
                        />
                    </Link>
*/


class NavBar extends React.PureComponent {
    state = {
        activeBadge: 0,
    }
    toggleState = (num) => {
        // TODO
        // console.log('num', num)
        if(num.id) { num = num.id }
        else if(! +num) { num = 0 }
        this.setState({activeBadge: num})
        console.log('activeBadge', num)
    }
    render() {
        const navbarIsAffixed = this.props.scrollPosition > 250
        const navbarStyle = {
                    // position: navbarIsAffixed ? 'fixed' : 'relative',
                    // top: '0px',
                    // width: '100%',
                    zIndex: 9999999,
                    backgroundColor: '#fff',
                    color: darkBlack,
                }
        return (
            <Toolbar
                style={navbarStyle}
            >
                <ToolbarGroup firstChild={true}>
                    <Link to="/">
                        <IconButton
                            id={1}
                            tooltip="Home"
                            style={styles.firstItem}
                            onTouchTap={this.toggleState}
                            iconStyle={{color: this.state.activeBadge === 1 ? colors.palette.primary1Color : darkBlack}}
                        >
                            <HomePin
                            />
                        </IconButton>
                    </Link>
                    <Link to="/forum">
                        <CustomBadge
                            id={2}
                            badgeContent={123}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="New Forum Activity"
                            icon={<ForumPin />}
                            toggleState={this.toggleState}
                            active={this.state.activeBadge === 2}
                        />
                    </Link>
                    <Link to="/stream/1">
                        <CustomBadge
                            id={3}
                            badgeContent={23}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="New Activity"
                            icon={<UpdatesIcon />}
                            toggleState={this.toggleState}
                            active={this.state.activeBadge === 3}
                        />
                    </Link>
                    <Link to="/review">
                            <ReviewPin
                                id={4}
                                style={styles.normalIcon}
                            />
                    </Link>

                </ToolbarGroup>

                <ToolbarGroup>
                    <Link to={`/profile/${userRecord.userid}`}>
                        <Avatar
                            id={5}
                            visible={true}
                            src={'/img/avatar/face.jpg'}
                            mini={true}
                            tooltip="Your Profile"
                            onTouchTap={this.toggleState}
                            active={this.state.activeBadge === 5}
                        />
                    </Link>
                    <IconMenu
                        style={{cursor:'pointer'}}
                        iconButtonElement={
                            <IconButton><MoreVertIcon /></IconButton>
                        }
                    >
                        <RouterMenuItem
                            url={'/settings'}
                            primaryText="Settings"
                            icon={<SettingsIcon />}
                        />
                        <Divider />
                        <RouterMenuItem
                            url={'/logout'}
                            primaryText="Log Out"
                            icon={<LogOutIcon />}
                        />
                    </IconMenu>
                    <SignupButton />
                    <LoginButton />
                </ToolbarGroup>

            </Toolbar>
        )
    }
}

export default NavBar
