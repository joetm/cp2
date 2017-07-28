/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import {darkBlack, lightBlack} from 'material-ui/styles/colors'

import Notification from './Notification'
import Spacer from '../Spacer'


class Notifications extends React.PureComponent {
    render () {
          return (
            <div>
              <h2>Notifications</h2>
              <List>
                <Subheader>Today</Subheader>
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Gamel, John J."
                  primaryText="Brunch this weekend?"
                  secondaryText="I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?"
                  secondaryTextLines={2}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="John G."
                  primaryText="Summer BBQ&nbsp;&nbsp;<span style={{color: lightBlack}}>4</span>"
                  secondaryText="Wish I could come, but I&apos;m out of town this weekend."
                  secondaryTextLines={2}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Joe More"
                  primaryText="Oui oui"
                  secondaryText="Do you have Paris recommendations? Have you ever been?"
                  secondaryTextLines={2}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Joe Doe"
                  primaryText="Birdthday gift"
                  secondaryText="Do you have any ideas what we can get Heidi for her birthday? How about a pony?"
                  secondaryTextLines={2}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="John J."
                  primaryText="Recipe to try"
                  secondaryText="We should eat this: grated squash. Corn and tomatillo tacos."
                  secondaryTextLines={2}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Brendan Lim"
                  primaryText="Me"
                  secondaryText="I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?"
                  secondaryTextLines={2}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="me, Scott, Jennifer"
                  primaryText="What?"
                  secondaryText="Wish I could come, but I&apos;m out of town this weekend."
                  secondaryTextLines={2}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Grace Ng"
                  primaryText="Post Title?"
                  secondaryText="Do you have any Paris recs? Have you ever been?"
                  secondaryTextLines={2}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Kerem Suer"
                  primaryText="What's up?"
                  secondaryText="Do you have any ideas what we can get Heidi for her birthday? How about a pony?"
                  secondaryTextLines={2}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Raquel Parrado"
                  primaryText="Okay, then..."
                  secondaryText="We should eat this: grated squash. Corn and tomatillo tacos."
                  secondaryTextLines={2}
                />
              </List>
              <Spacer />
            </div>
          )
    }
}

export default Notifications
