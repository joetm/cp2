/** @flow */

import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { darkBlack } from 'material-ui/styles/colors'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Popover from 'material-ui/Popover'
// --
import HomeIcon from 'material-ui/svg-icons/action/account-balance'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import SearchIcon from 'material-ui/svg-icons/action/search'
import UploadIcon from 'material-ui/svg-icons/file/file-upload'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import NotificationsNoneIcon from 'material-ui/svg-icons/social/notifications-none'
import NotificationsActiveIcon from 'material-ui/svg-icons/social/notifications-active'

import { loginUser, logoutUser, fetchUnreadCount, setActiveBadge, toggleSearchSidebar, closeSidebar, openSidebar, fetchCurrentUser } from '../../reducers'
import { colors } from '../../common/theme'
import { sum } from '../../common/helpers'
import './style.css'
// --
import Avatar from '../Shared/Avatar'
import CustomBadge from './CustomBadge'
import RouterMenuItem from './RouterMenuItem'
import LoginButton from '../Shared/Buttons/LoginButton'
import SignupButton from '../Shared/Buttons/SignupButton'
import NotificationsMenu from './NotificationsMenu'


const numAllNotifications = () => {
    return 0
}


const _NAVITEM_ID = {
    MENU: 1,
    HOME: 2,
    REVIEW: 55,
    ALLNOTIFICATIONS: 90,
      FORUM: 91,
      STREAM: 92,
      MESSAGES: 93,
      LIKES: 94,
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
        marginLeft: '10px',
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
        cursor: 'pointer',
    },
    badgeRootStyle: {
        cursor: 'pointer',
    },
}


// const NavbarSeparator = () => (
//     <div style={styles.separator}></div>
// )

class NavBar extends React.Component {
    anchorEl = null
    constructor(props) {
        super(props)
        this.state = {
            notificationsMenuOpen: false,
            searchExpanded: false,

        }
        // bindings
        this.searchAction = this.searchAction.bind(this)
        this.toggleSearchField = this.toggleSearchField.bind(this)
        this.toggleState = this.toggleState.bind(this)
        this.isForum = this.isForum.bind(this)
        this.toggleNotificationsMenu = this.toggleNotificationsMenu.bind(this)
        this.closeNotificationsMenu = this.closeNotificationsMenu.bind(this)
    }
    componentDidMount() {
        this.props.fetchCurrentUser()
        this.props.fetchUnreadCount()
        this.anchorEl = findDOMNode(this.refs.notifications)
    }
    isForum() {
        return this.props.location.pathname.startsWith('/forum')
    }
    toggleSearchField() {
        this.setState({searchExpanded: !this.state.searchExpanded})
    }
    searchAction() {
        // on the forum, open the sidebar
        if (this.isForum()) {
            this.props.toggleSearchSidebar()
        // on all other pages: expand the search
        } else {
            this.toggleSearchField()
        }
    }
    toggleNotificationsMenu() {
        this.setState({notificationsMenuOpen: !this.state.notificationsMenuOpen})
    }
    closeNotificationsMenu() {
        this.setState({notificationsMenuOpen: false})
    }
    toggleState(num) {
        let n = num
        if (n.id) { n = n.id }
        else if (! +n) { n = 0 }
        this.props.setActiveBadge(n)

        this.props.closeSidebar()
    }
    /**
     * Render the component.
     */
    render() {
        const { unread } = this.props
        const { dispatch, isAuthenticated, errorMessage } = this.props
        // TODO
        // const navbarIsAffixed = this.props.scrollPosition > 250
        //
        let AllNotificationsIcons
        // TODO
        // if (!this.props.unread) {
        //     AllNotificationsIcons = NotificationsNoneIcon
        // } else {
            AllNotificationsIcons = NotificationsActiveIcon
        // }
        return (
            <Toolbar
                style={styles.navbar}
            >

                <ToolbarGroup firstChild={true}>

                    <IconButton
                        id={_NAVITEM_ID.MENU}
                        tooltip="Menu"
                        style={styles.firstItem}
                        onTouchTap={this.props.openSidebar}
                    >
                        <MenuIcon />
                    </IconButton>

                    <NavLink
                        to="/"
                        activeStyle={{color: colors.palette.primary1Color}}
                    >
                        <IconButton
                            id={_NAVITEM_ID.HOME}
                            tooltip="Home"
                            iconStyle={{color: this.props.activeBadge === _NAVITEM_ID.HOME ? colors.palette.primary1Color : darkBlack}}
                        >
                            <HomeIcon />
                        </IconButton>
                    </NavLink>

                </ToolbarGroup>

                <ToolbarGroup>

                    {
                        !this.state.searchExpanded ? null : (
                            <TextField
                              hintText="Search"
                              rows={1}
                              rowsMax={1}
                              style={{marginBottom: '10px', maxWidth: '150px'}}
                              floatingLabelText="Search"
                            />
                        )
                    }
                    <IconButton
                        tooltip={this.isForum() ? "Toggle Sidebar" : "Search"}
                        onTouchTap={this.searchAction}
                        style={styles.searchIcon}
                    >
                        <SearchIcon />
                    </IconButton>


                    <Link to="/upload">
                        <IconButton
                            tooltip="Upload"
                        >
                            <UploadIcon />
                        </IconButton>
                    </Link>

                    <CustomBadge
                        to={null}
                        badgeContent={sum(unread)}
                        secondary={true}
                        tooltip="Notifications"
                        icon={<AllNotificationsIcons />}
                        ref="notifications"
                        onTouchTap={this.toggleNotificationsMenu}
                    />
                    <NotificationsMenu
                        open={this.state.notificationsMenuOpen}
                        anchorEl={this.anchorEl}
                        unread={unread}
                        userid={this.props.userid}
                        closeNotificationsMenu={this.closeNotificationsMenu}
                    />

                    <Link to={`/profile/${this.props.userid}`}>
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

                    {!isAuthenticated &&
                            <SignupButton />
                    }
                    {!isAuthenticated &&
                            <LoginButton
                                errorMessage={errorMessage}
                                onLoginClick={(creds) => loginUser(creds)}
                            />
                    }

                </ToolbarGroup>

            </Toolbar>
        )
    }
}

const mapStateToProps = (state) => ({
    activeBadge: state.appState.activeBadge,
    sidebarSearchOpen: state.appState.sidebarSearchOpen,
    userid: state.currentUser.userid,
    username: state.currentUser.username,
    avatar: state.currentUser.avatar,
    // --
    unread: state.appState.unread,
})

export default withRouter(connect(
    mapStateToProps,
    {
        loginUser,
        logoutUser,
        fetchCurrentUser,
        fetchUnreadCount,
        setActiveBadge,
        closeSidebar,
        openSidebar,
        toggleSearchSidebar
    }
)(NavBar))
