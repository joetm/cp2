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
import LogoutIcon from 'material-ui/svg-icons/maps/directions-run'

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
        return (
          <Drawer
            docked={true}
            width={200}
            open={this.props.sidebarOpen}
            tabIndex="0"
            onBlur={this.props.closeSidebar}
            // onRequestChange={(open) => this.setState({open})}
          >
            <div style={styles.logoContainer}>
                <h1 style={styles.logo}>CP v2</h1>
            </div>

            <MenuEntry
                route={routes.HOME}
                icon={<HomeIcon />}
                text="Home"
                onTouchTap={this.props.closeSidebar}
            />

            <MenuEntry
                route={`${routes.STREAM}/${this.props.userid}`}
                icon={<UpdatesIcon />}
                text="New Updates"
                onTouchTap={this.props.closeSidebar}
            />

            <MenuEntry
                route={`${routes.NOTIFICATIONS}/${this.props.userid}`}
                icon={<EmailIcon />}
                text="Messages"
                onTouchTap={this.props.closeSidebar}
            />

            <Divider />

            <MenuEntry
                route="/review"
                icon={<ReviewIcon />}
                text="Review"
                onTouchTap={this.props.closeSidebar}
            />

            <Divider />

            <MenuEntry
                route={`${routes.PROFILE}/${this.props.userid}`}
                icon={<ProfileIcon />}
                text="Your Profile"
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
