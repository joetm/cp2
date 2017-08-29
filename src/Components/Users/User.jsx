/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import VerifiedIcon from 'material-ui/svg-icons/action/verified-user'

import routes from '../../routes'


/**
 * User class
 * @class
 */
class User extends React.PureComponent {
    handleClick = () => {
        this.props.history.push(`${routes.PROFILE}/${this.props.userid}`)
    }
    /**
     * Render the component.
     */
    render() {
        const { username, usertitle, avatar, status, verified, city, state, country } = this.props
        const verifiedStatus = verified ? '- verified' : ''
        const location = city || state || country ? `- ${city}, ${state}, ${country}` : ''
        const secondaryText = `
          ${status}
          ${usertitle ? ' - ' + usertitle : ''}
          ${verifiedStatus}
          ${location}
        `
        return (
            <ListItem
              primaryText={username}
              secondaryText={secondaryText}
              leftAvatar={<Avatar src={avatar} />}
              onClick={this.handleClick}
            />
        )
    }
}

export default withRouter(User)
