 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'

import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import HeartIcon from 'material-ui/svg-icons/action/favorite'
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'

import { closeStreamSidebar, getCurrentUserid } from '../../actions'
import routes from '../../routes'
import MenuEntry from './MenuEntry'


let tabindex = 0

const tabindexCounter = () => {
    tabindex += 1
    return tabindex
}


class StreamSidebar extends React.PureComponent {
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
