 /**  @flow */

import React from 'react'
import Drawer from 'material-ui/Drawer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
// --
import ReviewIcon from 'material-ui/svg-icons/social/whatshot'
import ForumIcon from 'material-ui/svg-icons/communication/forum'
import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import HeartIcon from 'material-ui/svg-icons/action/favorite'
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'
import ProfileIcon from 'material-ui/svg-icons/social/person-outline'
import LogoutIcon   from 'material-ui/svg-icons/action/exit-to-app'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

import { closeSidebar } from '../../../actions'
import * as routes from '../../../routes'
import MenuEntry from '../../Shared/MenuEntry'
import Headline from '../../Shared/Headline'


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
  const { sidebarOpen, handleCloseSidebar, userid } = props
  return (
    <Drawer
      docked={false}
      width={200}
      open={sidebarOpen}
      tabIndex="0"
      onBlur={handleCloseSidebar}
      onRequestChange={handleCloseSidebar}
    >

      <div style={styles.logoContainer}>
        <Link to="/">
          <Headline
            style={styles.logo}
            onTouchTap={handleCloseSidebar}
          >SocNet v2</Headline>
        </Link>
      </div>

      <MenuEntry
        route={routes.UPDATES}
        icon={<UpdatesIcon />}
        text="All Updates"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />

      {/*
      <MenuEntry
        route={routes.FORUM}
        icon={<ForumIcon />}
        text="Forum"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />
      */}

      {/*
      <MenuEntry
        route={routes.USERS}
        icon={<UsersIcon />}
        text="Users"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />
      */}

      <Divider />

      <MenuEntry
        route={routes.STREAM}
        icon={<UpdatesIcon />}
        text="Stream"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />

      <Divider />

      <MenuEntry
        route={routes.REVIEW}
        icon={<ReviewIcon />}
        text="Review"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />

      <Divider />

      <MenuEntry
        route={routes.MESSAGES}
        icon={<EmailIcon />}
        text="Messages"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />

      {/*
      <MenuEntry
        route={routes.PLAYLIST}
        icon={<WatchLaterIcon />}
        text="Watch Later"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />
      */}

      <MenuEntry
        route={`${routes.STREAM}/${userid}${routes.FAVORITES}`}
        icon={<HeartIcon />}
        text="Favorites"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />

      <MenuEntry
        route={`${routes.STREAM}/${userid}${routes.LIKES}`}
        icon={<LikeIcon />}
        text="Likes"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />

      <Divider />

      {/*
      <MenuEntry
        route={`${routes.PROFILE}/${userid}`}
        icon={<ProfileIcon />}
        text="Your Profile"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />
      */}

      <MenuEntry
        route={routes.SETTINGS.INDEX}
        icon={<SettingsIcon />}
        text="Settings"
        onTouchTap={handleCloseSidebar}
        tabindexCounter={tabindexCounter}
      />

      <MenuEntry
        route={routes.LOGOUT}
        icon={<LogoutIcon />}
        text="Log Out"
        onTouchTap={handleCloseSidebar}
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
  { handleCloseSidebar: closeSidebar }
)(Sidebar)
