 /**  @flow */

import React from 'react'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import ReviewIcon from 'material-ui/svg-icons/social/whatshot'
import ForumIcon from 'material-ui/svg-icons/communication/forum'
import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import HeartIcon from 'material-ui/svg-icons/action/favorite'
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'
import ProfileIcon from 'material-ui/svg-icons/social/person-outline'
import LogoutIcon   from 'material-ui/svg-icons/action/exit-to-app'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

import { toggleSidebar, closeSidebar, getCurrentUserid } from '../../actions'
import routes from '../../routes'
import MenuEntry from './MenuEntry'


const styles = {
  logoContainer: {
    margin: 0,
    padding: 0,
    textAlign: 'center',
    height: '56px',
    display: 'block',
  },
  logo: {
    verticalAlign: 'middle',
    margin: 0,
    padding: 0,
    paddingTop: '10px',
  },
}


let tabindex = 0

const tabindexCounter = () => {
    tabindex += 1
    return tabindex
}


const Sidebar = (props) => {
    const { sidebarOpen, closeSidebar, userid } = props
    return (
      <Drawer
        docked={false}
        width={200}
        open={sidebarOpen}
        tabIndex="0"
        onBlur={closeSidebar}
        onRequestChange={closeSidebar}
      >

        <div style={styles.logoContainer}>
            <NavLink to="/">
                <h1
                    style={styles.logo}
                    onTouchTap={closeSidebar}
                >SocNet v2</h1>
            </NavLink>
        </div>

        <Subheader>New</Subheader>

        <MenuEntry
            route={routes.UPDATES}
            icon={<UpdatesIcon />}
            text="Updates"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

        <MenuEntry
            route={routes.FORUM}
            icon={<ForumIcon />}
            text="Forum"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

        {/*
        <MenuEntry
            route={routes.USERS}
            icon={<UsersIcon />}
            text="Users"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />
        */}

        <Divider />

        <Subheader>Subscriptions</Subheader>

        <MenuEntry
            route={routes.IMAGES}
            icon={<UpdatesIcon />}
            text="Images"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

        <MenuEntry
            route={routes.VIDEOS}
            icon={<UpdatesIcon />}
            text="Videos"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

        <Divider />

        <MenuEntry
            route={routes.MESSAGES}
            icon={<EmailIcon />}
            text="Messages"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

        {/*
        <MenuEntry
            route={routes.PLAYLIST}
            icon={<WatchLaterIcon />}
            text="Watch Later"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />
        */}

        <MenuEntry
            route={`${routes.STREAM}/${userid}${routes.FAVORITES}`}
            icon={<HeartIcon />}
            text="Favorites"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

        <MenuEntry
            route={`${routes.STREAM}/${userid}${routes.LIKES}`}
            icon={<LikeIcon />}
            text="Likes"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

        <Divider />

        <MenuEntry
            route={routes.REVIEW}
            icon={<ReviewIcon />}
            text="Review"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

        <Divider />

        <MenuEntry
            route={`${routes.PROFILE}/${userid}`}
            icon={<ProfileIcon />}
            text="Your Profile"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

        <MenuEntry
            route={routes.SETTINGS.INDEX}
            icon={<SettingsIcon />}
            text="Settings"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

        <MenuEntry
            route={routes.LOGOUT}
            icon={<LogoutIcon />}
            text="Log Out"
            onTouchTap={closeSidebar}
            tabindexCounter={tabindexCounter}
        />

      </Drawer>
    )
}

const mapStateToProps = (state) => ({
    sidebarOpen: state.appState.sidebarOpen,
    userid: state.currentUser.id,
})

export default connect(
    mapStateToProps,
    { closeSidebar, toggleSidebar, getCurrentUserid }
)(Sidebar)
