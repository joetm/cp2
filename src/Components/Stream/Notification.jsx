/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { ListItem } from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
// import Subheader from 'material-ui/Subheader'
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import { grey400 } from 'material-ui/styles/colors'


const rightIconMenu = (
    <IconMenu iconButtonElement={(
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    )}>
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
              rightIconButton={this.state.showMenu ? rightIconMenu : null}
              primaryText={this.props.primaryText}
              secondaryText={this.props.username}
              onMouseEnter={() => this.setState({showMenu: true})}
              onMouseLeave={() => this.setState({showMenu: false})}
              secondaryTextLines={2}
              onTouchTap={() => history.push(`/messages/${this.props.userid}`)}
            />
        )
    }
}

export default withRouter(Notification)
