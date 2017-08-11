/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import Notification from './Notification'
import Spacer from '../Shared/Spacer'


class Notifications extends React.PureComponent {
    /**
     * Render the component.
     */
    render () {
          return (
            <div>
              <h2>Notifications</h2>
              <List>
                <Subheader>Today</Subheader>
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Gamel, John J."
                  userid={1}
                  primaryText="Brunch this weekend?"
                  secondaryText="I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?"
                  secondaryTextLines={2}
                  showMenu={true}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="John G."
                  userid={2}
                  primaryText="Summer BBQ"
                  secondaryText="Wish I could come, but I&apos;m out of town this weekend."
                  secondaryTextLines={2}
                  showMenu={true}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Joe More"
                  userid={3}
                  primaryText="Oui oui"
                  secondaryText="Do you have Paris recommendations? Have you ever been?"
                  secondaryTextLines={2}
                  showMenu={true}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Joe Doe"
                  userid={4}
                  primaryText="Birdthday gift"
                  secondaryText="Do you have any ideas what we can get Heidi for her birthday? How about a pony?"
                  secondaryTextLines={2}
                  showMenu={true}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="John J."
                  userid={5}
                  primaryText="Recipe to try"
                  secondaryText="We should eat this: grated squash. Corn and tomatillo tacos."
                  secondaryTextLines={2}
                  showMenu={true}
                />
                <Subheader>Yesterday</Subheader>
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Brendan Lim"
                  userid={6}
                  primaryText="Me"
                  secondaryText="I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?"
                  secondaryTextLines={2}
                  showMenu={true}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="me, Scott, Jennifer"
                  userid={7}
                  primaryText="What?"
                  secondaryText="Wish I could come, but I&apos;m out of town this weekend."
                  secondaryTextLines={2}
                  showMenu={true}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Grace Ng"
                  userid={8}
                  primaryText="Post Title?"
                  secondaryText="Do you have any Paris recs? Have you ever been?"
                  secondaryTextLines={2}
                  showMenu={true}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Kerem Suer"
                  userid={9}
                  primaryText="What's up?"
                  secondaryText="Do you have any ideas what we can get Heidi for her birthday? How about a pony?"
                  secondaryTextLines={2}
                  showMenu={true}
                />
                <Notification
                  avatar={<Avatar src="/img/avatar/face.jpg" />}
                  username="Raquel Parrado"
                  userid={10}
                  primaryText="Okay, then..."
                  secondaryText="We should eat this: grated squash. Corn and tomatillo tacos."
                  secondaryTextLines={2}
                  showMenu={true}
                />
              </List>
              <Spacer />
            </div>
          )
    }
}

export default Notifications
