/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
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


class Like extends React.PureComponent {
    state = {
      showMenu: false // no menu for now
    }
    /**
     * Render the component.
     */
    // onMouseEnter={() => this.setState({showMenu: true})}
    // onMouseLeave={() => this.setState({showMenu: false})}
    // TODO: redirect to the item on click
    // onTouchTap={() => history.push(`/likes/${this.props.userid}`)}
    render () {
        // const ListItemMenu = this.props.showMenu ? rightIconMenu : (<span></span>)
        const history = this.props.history
        const { avatar, title, content, src, username, userid } = this.props
        let type = "TODO"
        return (
            <ListItem
              leftAvatar={<Avatar src={avatar} />}
              rightIconButton={this.state.showMenu ? rightIconMenu : null}
              primaryText={`${username} liked your ${type}`}
              secondaryText={title}
              secondaryTextLines={2}
            />
        )
    }
}

export default withRouter(Like)
