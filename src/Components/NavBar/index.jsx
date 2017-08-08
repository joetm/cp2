/** @flow */

import React from 'react'
import { Link } from 'react-router-dom'
import Menu from 'material-ui/Menu';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { darkBlack } from 'material-ui/styles/colors'
// --
import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
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
import userRecord from '../Profile/userRecord'
// --
import Avatar from '../Shared/Avatar'
import CustomBadge from './CustomBadge'
import RouterMenuItem from './RouterMenuItem'
import LoginButton from '../Shared/Buttons/LoginButton'
import SignupButton from '../Shared/Buttons/SignupButton'


const _NAVITEM_ID = {
    HOME: 1,
    FORUM: 2,
    STREAM: 3,
    NOTIFICATIONS: 4,
    REVIEW: 5,
    PROFILE: 98,
    SETTINGS: 99,
}

const styles = {
    navbar: {
        // position: navbarIsAffixed ? 'fixed' : 'relative',
        // top: '0px',
        // width: '100%',
        zIndex: 9999999,
        backgroundColor: '#fff',
        color: darkBlack,
    },
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
        // styles.normalIcon = {...styles.normalIcon, ...{color: this.state.activeBadge === _NAVITEM_ID.REVIEW ? colors.palette.primary1Color : darkBlack}}
        return (
            <Toolbar
                style={styles.navbar}
            >

                <ToolbarGroup firstChild={true}>
                    <Link to="/" activeStyle={{color: colors.palette.primary1Color}}>
                        <IconButton
                            id={_NAVITEM_ID.HOME}
                            tooltip="Home"
                            style={styles.firstItem}
                            onTouchTap={this.toggleState}
                            iconStyle={{color: this.state.activeBadge === _NAVITEM_ID.HOME ? colors.palette.primary1Color : darkBlack}}
                        >
                            <HomePin />
                        </IconButton>
                    </Link>
                    <Link to="/forum" activeStyle={{color: colors.palette.primary1Color}}>
                        <CustomBadge
                            id={_NAVITEM_ID.FORUM}
                            badgeContent={123}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="New Forum Activity"
                            icon={<ForumPin />}
                            toggleState={this.toggleState}
                            active={this.state.activeBadge === _NAVITEM_ID.FORUM}
                        />
                    </Link>
                    <Link to="/stream/1" activeStyle={{color: colors.palette.primary1Color}}>
                        <CustomBadge
                            id={_NAVITEM_ID.STREAM}
                            badgeContent={23}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="New Activity"
                            icon={<UpdatesIcon />}
                            toggleState={this.toggleState}
                            active={this.state.activeBadge === _NAVITEM_ID.STREAM}
                        />
                    </Link>
                    <Link to="/notifications/1" activeStyle={{color: colors.palette.primary1Color}}>
                        <CustomBadge
                            id={_NAVITEM_ID.NOTIFICATIONS}
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="Notifications"
                            icon={<EmailIcon />}
                            toggleState={this.toggleState}
                            active={this.state.activeBadge === _NAVITEM_ID.NOTIFICATIONS}
                        />
                    </Link>
                    <Link to="/review" activeStyle={{color: colors.palette.primary1Color}}>
                        <ReviewPin
                            id={_NAVITEM_ID.REVIEW}
                            style={styles.normalIcon}
                            onTouchTap={this.toggleState}
                        />
                    </Link>
                </ToolbarGroup>

                <ToolbarGroup>
                    <Link to={`/profile/${userRecord.userid}`}>
                        <Avatar
                            id={_NAVITEM_ID.PROFILE}
                            visible={true}
                            src={'/img/avatar/face.jpg'}
                            mini={true}
                            tooltip="Your Profile"
                            onTouchTap={this.toggleState}
                            active={this.state.activeBadge === _NAVITEM_ID.PROFILE}
                        />
                    </Link>
                    <IconMenu
                        id={_NAVITEM_ID.SETTINGS}
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
