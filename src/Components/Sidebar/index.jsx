 /**  @flow */

import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import ReviewIcon from 'material-ui/svg-icons/social/whatshot'
import ForumIcon from 'material-ui/svg-icons/social/group'
import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import HomeIcon from 'material-ui/svg-icons/action/account-balance'
// import ProfileIcon from 'material-ui/svg-icons/action/account-circle'
import ProfileIcon from 'material-ui/svg-icons/social/person-outline'
import LogoutIcon   from 'material-ui/svg-icons/action/exit-to-app'
// import LogoutIcon from 'material-ui/svg-icons/maps/directions-run'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

import { toggleSidebar, closeSidebar, getCurrentUserid } from '../../reducers'
import routes from '../../routes'


const styles = {
  logoContainer: {
    margin: 0,
    padding: 0,
    textAlign: 'center',
    height: '56px',
    display: 'block',
    backgroundColor: '#F0F0F0',
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
    tabindex = tabindex + 1
    return tabindex
}

const MenuEntry = (props) => (
    <NavLink to={props.route} tabIndex={tabindexCounter}>
        <MenuItem
            onTouchTap={props.onTouchTap}
            primaryText={props.text}
            leftIcon={props.icon}
        />
    </NavLink>
)


class Sidebar extends React.Component {
    render() {
        const { closeSidebar, userid } = this.props
        return (
          <Drawer
            docked={true}
            width={200}
            open={this.props.sidebarOpen}
            tabIndex="0"
            onBlur={closeSidebar}
            // onRequestChange={(open) => this.setState({open})}
          >

            <div style={styles.logoContainer}>
                <NavLink to="/">
                    <h1
                        style={styles.logo}
                        onTouchTap={closeSidebar}
                    >SocNet v2</h1>
                </NavLink>
            </div>

            <MenuEntry
                route={`${routes.STREAM}/${userid}`}
                icon={<UpdatesIcon />}
                text="New Updates"
                onTouchTap={closeSidebar}
            />

            <MenuEntry
                route={routes.FORUM}
                icon={<ForumIcon />}
                text="Forum"
                onTouchTap={closeSidebar}
            />

            <MenuEntry
                route={`${routes.NOTIFICATIONS}/${userid}`}
                icon={<EmailIcon />}
                text="Messages"
                onTouchTap={closeSidebar}
            />

            <MenuEntry
                route={`${routes.LIKES}/${userid}`}
                icon={<LikeIcon />}
                text="Likes"
                onTouchTap={closeSidebar}
            />

            <Divider />

            <MenuEntry
                route="/review"
                icon={<ReviewIcon />}
                text="Review"
                onTouchTap={closeSidebar}
            />

            <Divider />

            <MenuEntry
                route={`${routes.PROFILE}/${userid}`}
                icon={<ProfileIcon />}
                text="Your Profile"
                onTouchTap={this.props.closeSidebar}
            />

            <MenuEntry
                route="/settings"
                icon={<SettingsIcon />}
                text="Settings"
                onTouchTap={this.props.closeSidebar}
            />

            <MenuEntry
                route={routes.LOGOUT}
                icon={<LogoutIcon />}
                text="Log Out"
                onTouchTap={this.props.closeSidebar}
            />

          </Drawer>
        )
    }
}

const mapStateToProps = (state) => ({
    sidebarOpen: state.appState.sidebarOpen,
    userid: state.currentUser.userid,
})

export default connect(
    mapStateToProps,
    { closeSidebar, toggleSidebar, getCurrentUserid }
)(Sidebar)
