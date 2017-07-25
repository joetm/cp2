/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'


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


export default class Followers extends React.PureComponent {
    render () {
          return (
              <List>
                <ListItem
                  primaryText="Brendan Lim"
                  leftAvatar={<Avatar src="images/ok-128.jpg" />}
                  rightIconButton={rightIconMenu}
                />
                <ListItem
                  primaryText="Eric Hoffman"
                  leftAvatar={<Avatar src="images/kolage-128.jpg" />}
                  rightIconButton={rightIconMenu}
                />
                <ListItem
                  primaryText="Grace Ng"
                  leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
                  rightIconButton={rightIconMenu}
                />
                <ListItem
                  primaryText="Kerem Suer"
                  leftAvatar={<Avatar src="images/kerem-128.jpg" />}
                  rightIconButton={rightIconMenu}
                />
                <ListItem
                  primaryText="Raquel Parrado"
                  leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
                  rightIconButton={rightIconMenu}
                />
                <ListItem
                  primaryText="Chelsea Otakan"
                  leftAvatar={<Avatar src="images/chexee-128.jpg" />}
                  rightIconButton={rightIconMenu}
                />
                <ListItem
                  primaryText="James Anderson"
                  leftAvatar={<Avatar src="images/jsa-128.jpg" />}
                  rightIconButton={rightIconMenu}
                />
              </List>
          )
    }
}
