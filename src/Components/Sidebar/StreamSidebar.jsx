 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import ReviewIcon from 'material-ui/svg-icons/social/whatshot'
import UsersIcon from 'material-ui/svg-icons/social/group'
import ForumIcon from 'material-ui/svg-icons/communication/forum'
import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import HeartIcon from 'material-ui/svg-icons/action/favorite'
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import HomeIcon from 'material-ui/svg-icons/action/account-balance'
import WatchLaterIcon from 'material-ui/svg-icons/action/alarm'
// import ProfileIcon from 'material-ui/svg-icons/action/account-circle'
import ProfileIcon from 'material-ui/svg-icons/social/person-outline'
import LogoutIcon   from 'material-ui/svg-icons/action/exit-to-app'
// import LogoutIcon from 'material-ui/svg-icons/maps/directions-run'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

import { closeStreamSidebar, getCurrentUserid } from '../../actions'
import routes from '../../routes'
import MenuEntry from './MenuEntry'


let tabindex = 0

const tabindexCounter = () => {
    tabindex += 1
    return tabindex
}


class StreamSidebar extends React.Component {
    render() {
        const { closeStreamSidebar, userid } = this.props
        return (
          <Drawer
            docked={false}
            width={200}
            open={this.props.streamSidebarOpen}
            tabIndex="0"
            onBlur={closeStreamSidebar}
            openSecondary={true}
            // onRequestChange={(open) => this.setState({open})}
          >

            <Subheader>Subscriptions</Subheader>

            <MenuEntry
                route={routes.IMAGES}
                icon={<UpdatesIcon />}
                text="Images"
                onTouchTap={closeStreamSidebar}
                tabindexCounter={tabindexCounter}
            />

            <MenuEntry
                route={routes.VIDEOS}
                icon={<UpdatesIcon />}
                text="Videos"
                onTouchTap={closeStreamSidebar}
                tabindexCounter={tabindexCounter}
            />

            <MenuEntry
                route={routes.NOTIFICATIONS}
                icon={<EmailIcon />}
                text="Messages"
                onTouchTap={closeStreamSidebar}
                tabindexCounter={tabindexCounter}
            />

            {/*
            <MenuEntry
                route={routes.PLAYLIST}
                icon={<WatchLaterIcon />}
                text="Watch Later"
                onTouchTap={closeStreamSidebar}
                tabindexCounter={tabindexCounter}
            />
            */}

            <MenuEntry
                route={`${routes.STREAM}/${userid}${routes.FAVORITES}`}
                icon={<HeartIcon />}
                text="Favorites"
                onTouchTap={closeStreamSidebar}
                tabindexCounter={tabindexCounter}
            />

            <MenuEntry
                route={`${routes.STREAM}/${userid}${routes.LIKES}`}
                icon={<LikeIcon />}
                text="Likes"
                onTouchTap={closeStreamSidebar}
                tabindexCounter={tabindexCounter}
            />

          </Drawer>
        )
    }
}

const mapStateToProps = (state) => ({
    streamSidebarOpen: state.appState.streamSidebarOpen,
    userid: state.currentUser.id,
})

export default connect(
    mapStateToProps,
    { closeStreamSidebar, getCurrentUserid }
)(StreamSidebar)
