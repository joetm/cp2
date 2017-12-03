 /**  @flow */

import React from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'

import EmailIcon from 'material-ui/svg-icons/communication/mail-outline'
import HeartIcon from 'material-ui/svg-icons/action/favorite'
import LikeIcon from 'material-ui/svg-icons/action/thumb-up'
import UpdatesIcon from 'material-ui/svg-icons/image/burst-mode'

import { closeStreamSidebar } from '../../../actions'
import { IMAGES, VIDEOS, MESSAGES, STREAM, FAVORITES, LIKES } from '../../../routes'
import MenuEntry from '../../Shared/MenuEntry'


let tabindex = 0

const tabindexCounter = () => {
    tabindex += 1
    return tabindex
}


class StreamSidebar extends React.PureComponent {
    render() {
        const { handleCloseSidebar, userid } = this.props
        return (
          <Drawer
            docked={false}
            width={200}
            open={this.props.streamSidebarOpen}
            tabIndex="0"
            onBlur={handleCloseSidebar}
            openSecondary={true}
            // onRequestChange={(open) => this.setState({open})}
          >

            <Subheader>Subscriptions</Subheader>

            <MenuEntry
                route={IMAGES}
                icon={<UpdatesIcon />}
                text="Images"
                onTouchTap={handleCloseSidebar}
                tabindexCounter={tabindexCounter}
            />

            <MenuEntry
                route={VIDEOS}
                icon={<UpdatesIcon />}
                text="Videos"
                onTouchTap={handleCloseSidebar}
                tabindexCounter={tabindexCounter}
            />

            <MenuEntry
                route={MESSAGES}
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
                route={`${STREAM}/${userid}${FAVORITES}`}
                icon={<HeartIcon />}
                text="Favorites"
                onTouchTap={handleCloseSidebar}
                tabindexCounter={tabindexCounter}
            />

            <MenuEntry
                route={`${STREAM}/${userid}${LIKES}`}
                icon={<LikeIcon />}
                text="Likes"
                onTouchTap={handleCloseSidebar}
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
    { handleCloseSidebar: closeStreamSidebar }
)(StreamSidebar)
