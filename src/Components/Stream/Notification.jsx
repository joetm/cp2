/** @flow */

import React from 'react'
import {ListItem} from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
// import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
//import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
)

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
)


class Notification extends React.PureComponent {
    render () {
        let ListItemMenu = this.props.showMenu ? rightIconMenu : (<span></span>)
        return (
            <ListItem
              leftAvatar={this.props.avatar}
              rightIconButton={ListItemMenu}
              primaryText={this.props.primaryText}
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>Brendan Lim</span> --
                  {this.props.secondaryText}
                </p>
              }
              secondaryTextLines={2}
            />
        )
    }
}

export default Notification
