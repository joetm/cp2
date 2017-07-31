/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List} from 'material-ui/List'
// import Subheader from 'material-ui/Subheader'
// import Divider from 'material-ui/Divider'
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import {grey400, darkBlack} from 'material-ui/styles/colors'

import Follower from './Follower'


function randomNum() {
    const min = 1
    const max = 13
    return Math.floor(Math.random() * (max - min + 1)) + min
}


class Followers extends React.PureComponent {
    constructor(props) {
      super(props)



    }
    render () {
          return (
              <List>
                <Follower
                  username="Brendan Lim"
                  userid={randomNum()}
                  avatar={`/img/avatar/face-${randomNum()}.jpg`}
                />
                <Follower
                  username="Eric Hoffman"
                  userid={randomNum()}
                  avatar={`/img/avatar/face-${randomNum()}.jpg`}
                />
                <Follower
                  username="Grace Ng"
                  userid={randomNum()}
                  avatar={`/img/avatar/face-${randomNum()}.jpg`}
                />
                <Follower
                  username="Kerem Suer"
                  userid={randomNum()}
                  avatar={`/img/avatar/face-${randomNum()}.jpg`}
                />
                <Follower
                  username="Raquel Parrado"
                  userid={randomNum()}
                  avatar={`/img/avatar/face-${randomNum()}.jpg`}
                />
                <Follower
                  username="Chelsea Otakan"
                  userid={randomNum()}
                  avatar={`/img/avatar/face-${randomNum()}.jpg`}
                />
                <Follower
                  username="James Anderson"
                  userid={randomNum()}
                  avatar={`/img/avatar/face-${randomNum()}.jpg`}
                />
              </List>
          )
    }
}

export default Followers