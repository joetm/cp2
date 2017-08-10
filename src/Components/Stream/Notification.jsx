/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { ListItem } from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
// import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
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
    state = {
      showMenu: false
    }
    /**
     * Render the component.
     */
    render () {
        // const ListItemMenu = this.props.showMenu ? rightIconMenu : (<span></span>)
        const history = this.props.history
        return (
            <ListItem
              leftAvatar={this.props.avatar}
              rightIconButton={this.state.showMenu ? rightIconMenu : (<span></span>)}
              primaryText={this.props.primaryText}
              secondaryText={this.props.username}
              onMouseEnter={() => this.setState({showMenu: true})}
              onMouseLeave={() => this.setState({showMenu: false})}
              secondaryTextLines={2}
              onClick={() => history.push(`/messages/${this.props.userid}`)}
              onTouchTap={this.props.onTouchTap}
            />
        )
    }
}

export default withRouter(Notification)
