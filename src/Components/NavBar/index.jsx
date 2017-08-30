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
import Popover from 'material-ui/Popover'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// --
import HomeIcon from 'material-ui/svg-icons/action/account-balance'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import SearchIcon from 'material-ui/svg-icons/action/search'
import UploadIcon from 'material-ui/svg-icons/file/file-upload'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import NotificationsNoneIcon from 'material-ui/svg-icons/social/notifications-none'
import NotificationsActiveIcon from 'material-ui/svg-icons/social/notifications-active'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import { fetchUnreadCount, setActiveBadge, toggleSearchSidebar, closeSidebar, openSidebar, fetchCurrentUser } from '../../actions'
import { colors } from '../../common/theme'
import { sum } from '../../common/helpers'
import './style'
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

const _DURATION = 600 // ms

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
    state = {
        notificationsMenuOpen: false,
        searchExpanded: false,
    }
    attachMenuToDomNode = () => {
        this.anchorEl = findDOMNode(this.refs.notifications)
    }
    componentDidMount() {
        this.props.fetchCurrentUser()
        this.props.fetchUnreadCount()
        this.attachMenuToDomNode()
    }
    isForum = () => {
        return this.props.location.pathname.startsWith('/forum')
    }
    toggleSearchField = () => {
        this.setState({searchExpanded: !this.state.searchExpanded})
    }
    searchAction = () => {
        // on the forum, open the sidebar
        if (this.isForum()) {
            this.props.toggleSearchSidebar()
        // on all other pages: switch the navbar menu with the search input
        } else {
            this.toggleSearchField()
            this.attachMenuToDomNode()
        }
    }
    toggleNotificationsMenu = () => {
        this.setState({notificationsMenuOpen: !this.state.notificationsMenuOpen})
    }
    closeNotificationsMenu = () => {
        this.setState({notificationsMenuOpen: false})
    }
    toggleState = () => {
        this.props.closeSidebar()
    }
    /**
     * Render the component.
     */
    render() {
        const { unread, dispatch, isAuthenticated, errorMessage }= this.props
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

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={_DURATION}
                    transitionEnterTimeout={_DURATION}
                    transitionLeaveTimeout={_DURATION}
                >
                {
                    !this.state.searchExpanded ?
                        <ToolbarGroup
                            firstChild={true}
                        >
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
                                >
                                    <HomeIcon />
                                </IconButton>
                            </NavLink>
                        </ToolbarGroup>
                : null
                }
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={_DURATION}
                    transitionEnterTimeout={_DURATION}
                    transitionLeaveTimeout={_DURATION}
                >
                {
                    !this.state.searchExpanded ?
                        <ToolbarGroup>
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
                                userId={this.props.userId}
                                closeNotificationsMenu={this.closeNotificationsMenu}
                            />

                            <Link to={`/profile/${this.props.userId}`}>
                                <Avatar
                                    id={_NAVITEM_ID.PROFILE}
                                    visible={true}
                                    src={this.props.avatar}
                                    mini={true}
                                    tooltip="Your Profile"
                                    onTouchTap={this.toggleState}
                                />
                            </Link>
                            {!isAuthenticated &&
                                    <SignupButton />
                            }
                            {!isAuthenticated &&
                                    <LoginButton
                                        errorMessage={errorMessage}
                                        onTouchTap={() => history.push('/login')}
                                    />
                            }
                        </ToolbarGroup>
                    : null
                    }
                </ReactCSSTransitionGroup>

                {
                !this.state.searchExpanded ? null :
                    <ToolbarGroup
                        firstChild={true}
                        lastChild={true}
                    >
                        <IconButton
                            tooltip={this.isForum() ? "Toggle Sidebar" : "Search"}
                            onTouchTap={this.searchAction}
                            style={styles.searchIcon}
                        >
                            <SearchIcon />
                        </IconButton>
                        <TextField
                          hintText="Search"
                          rows={1}
                          rowsMax={1}
                          fullWidth={true}
                          style={{marginBottom: '10px'}}
                          floatingLabelText="Search"
                        />
                        <IconButton
                            tooltip={this.isForum() ? "Toggle Sidebar" : "Search"}
                            onTouchTap={this.toggleSearchField}
                            style={styles.searchIcon}
                        >
                            <CloseIcon />
                        </IconButton>
                    </ToolbarGroup>
                }

            </Toolbar>

        )
    }
}

const mapStateToProps = (state) => ({
    sidebarSearchOpen: state.appState.sidebarSearchOpen,
    userId: state.currentUser.id,
    username: state.currentUser.username,
    avatar: state.currentUser.avatar,
    // --
    unread: {
        posts: state.currentUser.unreadPosts,
        images: state.currentUser.unreadImages,
        videos: state.currentUser.unreadVideos,
        messages: state.currentUser.unreadMessages,
        likes: state.currentUser.unreadLikes,
    }
})

export default withRouter(connect(
    mapStateToProps,
    {
        fetchCurrentUser,
        fetchUnreadCount,
        setActiveBadge,
        closeSidebar,
        openSidebar,
        toggleSearchSidebar
    }
)(NavBar))
