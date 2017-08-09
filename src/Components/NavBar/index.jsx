/** @flow */

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Menu from 'material-ui/Menu';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { darkBlack } from 'material-ui/styles/colors'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// --
import HomeIcon from 'material-ui/svg-icons/action/account-balance'
import ReviewIcon from 'material-ui/svg-icons/action/find-replace'
import ProfileIcon  from 'material-ui/svg-icons/action/perm-identity'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import LogOutIcon   from 'material-ui/svg-icons/action/exit-to-app'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'
import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import ForumIcon from 'material-ui/svg-icons/social/group'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import NotificationsNoneIcon from 'material-ui/svg-icons/social/notifications-none'
import NotificationsActiveIcon from 'material-ui/svg-icons/social/notifications-active'

import { navigateTo } from '../../common/helpers'
import { colors } from '../../common/theme'
import './style.css'
// --
import userRecord from '../Profile/userRecord'
// --
import Avatar from '../Shared/Avatar'
import CustomBadge from './CustomBadge'
import RouterMenuItem from './RouterMenuItem'
import LoginButton from '../Shared/Buttons/LoginButton'
import SignupButton from '../Shared/Buttons/SignupButton'


// DEV
let NUMS = {
    FORUM: 123,
    STREAM: 45,
    NOTIFICATIONS: 10
}
NUMS.ALLNOTIFICATIONS = NUMS.FORUM + NUMS.STREAM + NUMS.NOTIFICATIONS


const _NAVITEM_ID = {
    HOME: 1,
    ALLNOTIFICATIONS: 10,
      FORUM: 12,
      STREAM: 13,
      NOTIFICATIONS: 14,
    REVIEW: 55,
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


class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeBadge: 0,
            notificationDetailsShowing: false,
        }
        // bindings
        this.toggleNotificationBadges = this.toggleNotificationBadges.bind(this)
    }
    toggleNotificationBadges() {
        this.setState({notificationDetailsShowing: !this.state.notificationDetailsShowing})
    }
    toggleState = (num) => {
        // TODO
        // console.log('num', num)
        if(num.id) { num = num.id }
        else if(! +num) { num = 0 }
        this.setState({activeBadge: num})
        console.log('activeBadge', num)
    }
    /**
     * Render the component.
     */
    render() {
        const navbarIsAffixed = this.props.scrollPosition > 250
        // styles.normalIcon = {...styles.normalIcon, ...{color: this.state.activeBadge === _NAVITEM_ID.REVIEW ? colors.palette.primary1Color : darkBlack}}
        let AllNotificationsIcons;
        if (!NUMS.ALLNOTIFICATIONS) {
            AllNotificationsIcons = NotificationsNoneIcon
        } else {
            if (!this.state.notificationDetailsShowing) {
                AllNotificationsIcons = NotificationsActiveIcon
            } else {
                AllNotificationsIcons = NotificationsIcon
            }
        }
        return (
            <Toolbar
                style={styles.navbar}
            >

                <ToolbarGroup firstChild={true}>
                    <NavLink
                        to="/"
                        activeStyle={{color: colors.palette.primary1Color}}
                    >
                        <IconButton
                            id={_NAVITEM_ID.HOME}
                            tooltip="Home"
                            style={styles.firstItem}
                            onTouchTap={this.toggleState}
                            iconStyle={{color: this.state.activeBadge === _NAVITEM_ID.HOME ? colors.palette.primary1Color : darkBlack}}
                        >
                            <HomeIcon />
                        </IconButton>
                    </NavLink>

                    <div
                        class="inline-block"
                        onMouseEnter={() => {this.setState({notificationDetailsShowing: true})}}
                        onMouseLeave={() => {this.setState({notificationDetailsShowing: false})}}
                    >
                        <CustomBadge
                            id={_NAVITEM_ID.ALLNOTIFICATIONS}
                            badgeContent={NUMS.ALLNOTIFICATIONS}
                            secondary={true}
                            badgeStyle={styles.badgeStyle}
                            style={styles.badgeRootStyle}
                            tooltip="New Activity"
                            icon={<AllNotificationsIcons />}
                            toggleState={this.toggleNotificationBadges}
                        />

                        <ReactCSSTransitionGroup
                            transitionName="badgeTransition"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                            transitionAppear={true}
                            transitionAppearTimeout={500}
                            style={{display:'inline-block'}}
                        >
                            {
                            !this.state.notificationDetailsShowing ? null :
                            [
                                <NavLink
                                    to="/forum"
                                    key={`badge_${_NAVITEM_ID.FORUM}`}
                                    activeStyle={{color: colors.palette.primary1Color}}
                                >
                                    <CustomBadge
                                        id={_NAVITEM_ID.FORUM}
                                        badgeContent={NUMS.FORUM}
                                        secondary={true}
                                        badgeStyle={styles.badgeStyle}
                                        style={styles.badgeRootStyle}
                                        tooltip="New Forum Activity"
                                        icon={<ForumIcon />}
                                        toggleState={this.toggleState}
                                        active={this.state.activeBadge === _NAVITEM_ID.FORUM}
                                    />
                                </NavLink>,
                                <NavLink
                                    to="/stream/1"
                                    key={`badge_${_NAVITEM_ID.STREAM}`}
                                    activeStyle={{color: colors.palette.primary1Color}}
                                >
                                    <CustomBadge
                                        id={_NAVITEM_ID.STREAM}
                                        badgeContent={NUMS.STREAM}
                                        secondary={true}
                                        badgeStyle={styles.badgeStyle}
                                        style={styles.badgeRootStyle}
                                        tooltip="New Activity"
                                        icon={<UpdatesIcon />}
                                        toggleState={this.toggleState}
                                        active={this.state.activeBadge === _NAVITEM_ID.STREAM}
                                    />
                                </NavLink>,
                                <NavLink
                                    to="/notifications/1"
                                    key={`badge_${_NAVITEM_ID.NOTIFICATIONS}`}
                                    activeStyle={{color: colors.palette.primary1Color}}
                                >
                                    <CustomBadge
                                        id={_NAVITEM_ID.NOTIFICATIONS}
                                        badgeContent={NUMS.NOTIFICATIONS}
                                        secondary={true}
                                        badgeStyle={styles.badgeStyle}
                                        style={styles.badgeRootStyle}
                                        tooltip="Notifications"
                                        icon={<EmailIcon />}
                                        toggleState={this.toggleState}
                                        active={this.state.activeBadge === _NAVITEM_ID.NOTIFICATIONS}
                                    />
                                </NavLink>
                            ]
                            }
                        </ReactCSSTransitionGroup>
                    </div>

                    <NavLink
                        to="/review"
                        activeStyle={{color: colors.palette.primary1Color}}
                    >
                        <ReviewIcon
                            id={_NAVITEM_ID.REVIEW}
                            style={styles.normalIcon}
                            onTouchTap={this.toggleState}
                        />
                    </NavLink>
                </ToolbarGroup>

                <ToolbarGroup>
                    <Link
                        to={`/profile/${userRecord.userid}`}
                    >
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
