/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { darkBlack } from 'material-ui/styles/colors'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// --
import HomeIcon from 'material-ui/svg-icons/action/account-balance'
import ReviewIcon from 'material-ui/svg-icons/social/whatshot'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import LogOutIcon   from 'material-ui/svg-icons/action/exit-to-app'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'
import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import ForumIcon from 'material-ui/svg-icons/social/group'
import SearchIcon from 'material-ui/svg-icons/action/search'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import NotificationsNoneIcon from 'material-ui/svg-icons/social/notifications-none'
import NotificationsActiveIcon from 'material-ui/svg-icons/social/notifications-active'

import { setActiveBadge, toggleSidebar } from '../../reducers'
import { colors } from '../../common/theme'
import './style.css'
import { getUserMinimal } from '../../reducers'
// --
import Avatar from '../Shared/Avatar'
import CustomBadge from './CustomBadge'
import RouterMenuItem from './RouterMenuItem'
import LoginButton from '../Shared/Buttons/LoginButton'
import SignupButton from '../Shared/Buttons/SignupButton'


// DEV
const NUMS = {
    FORUM: 123,
    STREAM: 45,
    MESSAGES: 10
}
NUMS.ALLNOTIFICATIONS = NUMS.FORUM + NUMS.STREAM + NUMS.MESSAGES


const _NAVITEM_ID = {
    HOME: 1,
    ALLNOTIFICATIONS: 10,
      FORUM: 12,
      STREAM: 13,
      MESSAGES: 14,
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
    },
    searchIcon: {
        marginRight: '20px',
        cursor: 'pointer',
    },
}


// const NavbarSeparator = () => (
//     <div style={styles.separator}></div>
// )


class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notificationDetailsShowing: false,
            isForum: false,
        }
        // bindings
        this.toggleNotificationBadges = this.toggleNotificationBadges.bind(this)
        this.searchAction = this.searchAction.bind(this)
        this.isForum = this.isForum.bind(this)
    }
    componentDidMount() {
        this.props.getUserMinimal()
    }
    isForum() {
        return this.props.location.pathname.startsWith('/forum')
    }
    searchAction() {
        // on the forum, open the sidebar
        if (this.isForum()) {
            this.props.toggleSidebar()
        } else {
            // TODO
            console.log('EXPAND SEARCH')
        }
    }
    toggleNotificationBadges() {
        this.setState({notificationDetailsShowing: !this.state.notificationDetailsShowing})
    }
    toggleState(num) {
        let n = num
        if (n.id) { n = n.id }
        else if (! +n) { n = 0 }
        this.props.setActiveBadge(n)
    }
    /**
     * Render the component.
     */
    render() {
        // TODO
        // const navbarIsAffixed = this.props.scrollPosition > 250
        //
        let AllNotificationsIcons
        if (!NUMS.ALLNOTIFICATIONS) {
            AllNotificationsIcons = NotificationsNoneIcon
        } else {
            if (!this.state.notificationDetailsShowing) {
                AllNotificationsIcons = NotificationsIcon
            } else {
                AllNotificationsIcons = NotificationsActiveIcon
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
                            iconStyle={{color: this.props.activeBadge === _NAVITEM_ID.HOME ? colors.palette.primary1Color : darkBlack}}
                        >
                            <HomeIcon />
                        </IconButton>
                    </NavLink>

                    <div
                        className="inline-block"
                        onMouseEnter={() => { this.setState({notificationDetailsShowing: true}) }}
                        onMouseLeave={() => { this.setState({notificationDetailsShowing: false}) }}
                    >

                        <CustomBadge
                            to={null}
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
                                    <CustomBadge
                                        to="/stream/1"
                                        id={_NAVITEM_ID.STREAM}
                                        badgeContent={NUMS.STREAM}
                                        secondary={true}
                                        badgeStyle={styles.badgeStyle}
                                        style={styles.badgeRootStyle}
                                        tooltip="New Activity"
                                        icon={<UpdatesIcon />}
                                        toggleState={this.toggleState}
                                        active={this.props.activeBadge === _NAVITEM_ID.STREAM}
                                    />,
                                    <CustomBadge
                                        to="/forum"
                                        id={_NAVITEM_ID.FORUM}
                                        badgeContent={NUMS.FORUM}
                                        secondary={true}
                                        badgeStyle={styles.badgeStyle}
                                        style={styles.badgeRootStyle}
                                        tooltip="New Forum Activity"
                                        icon={<ForumIcon />}
                                        toggleState={this.toggleState}
                                        active={this.props.activeBadge === _NAVITEM_ID.FORUM}
                                    />,
                                    <CustomBadge
                                        to="/notifications/1"
                                        id={_NAVITEM_ID.MESSAGES}
                                        badgeContent={NUMS.MESSAGES}
                                        secondary={true}
                                        badgeStyle={styles.badgeStyle}
                                        style={styles.badgeRootStyle}
                                        tooltip="Messages"
                                        icon={<EmailIcon />}
                                        toggleState={this.toggleState}
                                        active={this.props.activeBadge === _NAVITEM_ID.MESSAGES}
                                    />
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

                    <IconButton
                        tooltip={this.isForum() ? "Toggle Sidebar" : "Search"}
                        onTouchTap={this.searchAction}
                        style={styles.searchIcon}
                    >
                        <SearchIcon />
                    </IconButton>

                    <Link
                        to={`/profile/${this.props.userid}`}
                    >
                        <Avatar
                            id={_NAVITEM_ID.PROFILE}
                            visible={true}
                            src={this.props.avatar}
                            mini={true}
                            tooltip="Your Profile"
                            onTouchTap={this.toggleState}
                            active={this.props.activeBadge === _NAVITEM_ID.PROFILE}
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

const mapStateToProps = (state) => ({
    activeBadge: state.navbar.activeBadge,
    sidebarOpen: state.app.sidebarOpen,
    userid: state.user.userid,
    username: state.user.username,
    avatar: state.user.avatar,
})

export default withRouter(connect(
    mapStateToProps,
    { setActiveBadge, toggleSidebar, getUserMinimal }
)(NavBar))
