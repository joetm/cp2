/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { ListItem } from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
// import Subheader from 'material-ui/Subheader'
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import { grey400 } from 'material-ui/styles/colors'

import { colors } from '../../common/theme'


const rightIconMenu = (
    <IconMenu iconButtonElement={(
      <IconButton
        tooltip="more"
        tooltipPosition="bottom-left"
        onTouchTap={(e) => {e.stopPropagation()}}
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
      showMenu: true
    }
    /**
     * Render the component.
     */
    render () {
        // const ListItemMenu = this.props.showMenu ? rightIconMenu : (<span></span>)
        const history = this.props.history
        return (
            <ListItem
              leftAvatar={<Avatar src={this.props.avatar} />}
              rightIconButton={this.state.showMenu ? rightIconMenu : null}
              primaryText={this.props.title}
              secondaryText={<p>
                {`${this.props.username}`}
                {' '}-{' '}
                {`${this.props.content}`}
              </p>}
              // onMouseEnter={() => this.setState({showMenu: true})}
              // onMouseLeave={() => this.setState({showMenu: false})}
              secondaryTextLines={2}
              onTouchTap={() => history.push(`/messages/${this.props.userid}`)}
            />
        )
    }
}

export default withRouter(Notification)
