/** @flow */

import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// --
import HomeIcon from 'material-ui/svg-icons/action/account-balance'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import SearchIcon from 'material-ui/svg-icons/action/search'
import UploadIcon from 'material-ui/svg-icons/file/file-upload'
import ReviewIcon from 'material-ui/svg-icons/social/whatshot'
// import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import NotificationsNoneIcon from 'material-ui/svg-icons/social/notifications-none'
import NotificationsActiveIcon from 'material-ui/svg-icons/social/notifications-active'

import {
    setActiveBadge,
    toggleSearchSidebar,
    openSidebar,
    closeSidebar,
    // openStreamSidebar,
    // closeStreamSidebar,
    fetchCurrentUser,
} from '../../actions'
import { palette } from '../../common/colors'
import { sum } from '../../common/helpers'
import routes from '../../routes'
import './style.scss'
// --
import Avatar from '../Shared/Avatar'
import CustomBadge from './CustomBadge'
import LoginButton from '../Shared/Buttons/LoginButton'
import SignupButton from '../Shared/Buttons/SignupButton'
import NotificationsMenu from './NotificationsMenu'
import SearchBar from './SearchBar'


const _DURATION = 600 // ms


const styles = {
    navbar: {
        zIndex: 9999999,
        backgroundColor: '#fff',
    },
    firstItem: {marginLeft: '10px'},
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


class NavBar extends React.Component {
    anchorEl = null
    state = {
        notificationsMenuOpen: false,
        searchExpanded: false,
    }
    attachMenuToDomNode = () => {
        const targetDOMNode = findDOMNode(this.refs.notificationsBadge)
        if (targetDOMNode) {
            console.log('attach menu to', targetDOMNode)
            this.anchorEl = targetDOMNode
        }
    }
    componentDidMount() {
        this.props.fetchCurrentUser()
        // attach the notifications menu to the dom node
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
        const { unread, isAuthenticated, errorMessage } = this.props

        const numUnread = sum(unread)

        const AllNotificationsIcons = !numUnread ? NotificationsNoneIcon : NotificationsActiveIcon

        return (
          <div>
            <Toolbar style={styles.navbar}>

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
                                tooltip="Menu"
                                style={styles.firstItem}
                                onTouchTap={this.props.openSidebar}
                            >
                                <MenuIcon />
                            </IconButton>
                            <NavLink
                                to="/"
                                activeStyle={{color: palette.primary1Color}}
                            >
                                <IconButton
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

                            <Link to={routes.UPLOAD}>
                                <IconButton tooltip="Upload">
                                    <UploadIcon />
                                </IconButton>
                            </Link>

                            <Link to={routes.REVIEW}>
                                <IconButton tooltip="Crowd Review">
                                    <ReviewIcon />
                                </IconButton>
                            </Link>

                            <CustomBadge
                                to={null}
                                badgeContent={numUnread}
                                secondary={true}
                                tooltip="Notifications"
                                icon={<AllNotificationsIcons />}
                                ref="notificationsBadge"
                                onTouchTap={this.toggleNotificationsMenu}
                            />

                            <Link to={`${routes.PROFILE}/${this.props.userid}`}>
                                <Avatar
                                    visible={true}
                                    src={this.props.avatar}
                                    mini={true}
                                    username={this.props.username}
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
                    this.state.searchExpanded ?
                            <SearchBar
                                isForum={this.isForum}
                                searchAction={this.searchAction}
                                toggleSearchField={this.toggleSearchField}
                                attachMenuToDomNode={this.attachMenuToDomNode}
                            />
                    : null
                }

            </Toolbar>

            <NotificationsMenu
                open={this.state.notificationsMenuOpen}
                anchorEl={this.anchorEl}
                unread={unread}
                userid={this.props.userid}
                closeNotificationsMenu={this.closeNotificationsMenu}
            />

          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    sidebarSearchOpen: state.appState.sidebarSearchOpen,
    userid: state.currentUser.id,
    username: state.currentUser.username,
    avatar: state.currentUser.avatar,
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
        setActiveBadge,
        toggleSearchSidebar,
        openSidebar,
        closeSidebar,
        // openStreamSidebar,
        // closeStreamSidebar,
    }
)(NavBar))
