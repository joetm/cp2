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

import { colors } from '../../common/theme'
import routes from '../../routes'


const rightIconMenu = (props) => (
    <IconMenu iconButtonElement={(
        <IconButton
          tooltip="more"
          tooltipPosition="bottom-left"
          onTouchTap={(e) => {e.stopPropagation()}}
        >
          <MoreVertIcon color={colors.grey} />
        </IconButton>
    )}>
          { props.menuItems }
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
        const { username, avatar, title, content, userid, type } = this.props

        let text
        let menuItems
        switch (type) {
          case 'like':
            text = <p>
                  {username} liked your TODO
                </p>
            menuItems = [
              <MenuItem>Delete</MenuItem>,
            ]
            break
          default:
            text = <p>
                    {username}
                    {' '}-{' '}
                    {content}
                  </p>
            menuItems = [
              <MenuItem>Reply</MenuItem>,
              <MenuItem>Forward</MenuItem>,
              <MenuItem>Delete</MenuItem>,
            ]
        }

        return (
            <ListItem
              leftAvatar={<Avatar src={avatar} />}
              rightIconButton={ this.state.showMenu ? <rightIconMenu { ...menuItems } /> : null }
              primaryText={title}
              secondaryText={text}
              // onMouseEnter={() => this.setState({showMenu: true})}
              // onMouseLeave={() => this.setState({showMenu: false})}
              secondaryTextLines={2}
              onTouchTap={() => this.props.history.push(`${routes.MESSAGES}/${userid}`)}
            />
        )
    }
}

export default withRouter(Notification)
