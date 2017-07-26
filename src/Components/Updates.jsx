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



// TODO
const Update = (props) => (
          <ListItem
          leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
          primaryText={props.primaryText}
          secondaryText={<p>
              <span style={{color: darkBlack}}>{props.fromUsername}</span> --
              {props.secondaryText}
            </p>}
          secondaryTextLines={2}
        />
)

const updatesList = {
  today: [
    {
        primaryText: "Brunch this weekend?",
        secondaryText: "I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?",
        fromUsername: "Brandan Lim",
    },
    {
        primaryText: "Oui oui",
        secondaryText: "Do you have Paris recommendations? Have you ever been?",
        fromUsername: "Grace Ng",
    },
    {
        primaryText: "Birdthday gift",
        secondaryText: "Do you have any ideas what we can get Heidi for her birthday? How about a pony?",
        fromUsername: "Kerem Suer",
    },
    {
        primaryText: "Recipe to try",
        secondaryText: "We should eat this: grated squash. Corn and tomatillo tacos.",
        fromUsername: "Raquel Parrado",
    },
  ],
  yesterday: [],
}

class Updates extends React.PureComponent {
    render () {
          return (
            <div>
<List>
        <Subheader>Today</Subheader>
        {updatesList.today.map((item) => (
          <div>
            <Update
              primaryText={item.primaryText}
              secondaryText={item.secondaryText}
              fromUsername={item.fromUsername}
            />
          </div>
        ))}

      </List>
      <Divider />
<List>
        <Subheader>Yesterday</Subheader>
        <ListItem
          leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Brendan Lim"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="me, Scott, Jennifer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Summer BBQ</span><br />
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Grace Ng"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Oui oui</span><br />
              Do you have any Paris recs? Have you ever been?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Kerem Suer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Birthday gift</span><br />
              Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="/img/avatar/face.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText="Raquel Parrado"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Recipe to try</span><br />
              We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
          }
          secondaryTextLines={2}
        />
      </List>
            </div>
          )
    }
}

export default Updates