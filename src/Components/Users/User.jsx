/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import { PROFILE } from '../../routes'
import OnlineIcon from '../Shared/Icons/OnlineStatus/OnlineIcon'
import OfflineIcon from '../Shared/Icons/OnlineStatus/OfflineIcon'
import UnknownIcon from '../Shared/Icons/OnlineStatus/UnknownIcon'
import VerifiedIcon from '../Shared/Icons/VerifiedIcon'


const styles = {
  subText: {
    fontSize: '14px',
    lineHeight: '16px',
    height: '16px',
    margin: '4px 0px 0px',
    color: 'rgba(0, 0, 0, 0.54)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}

const SubText = (props) => {
  const { usertitle, verified, location } = props
  let Icon
  switch (props.status) {
    case 'online':
      Icon = OnlineIcon
      break
    case 'offline':
      Icon = OfflineIcon
      break
    default:
      Icon = UnknownIcon
      break
  }
  return (
    <span style={styles.subText}>
      <Icon />
      {usertitle}
      {verified ? <VerifiedIcon /> : null}
      {location}
    </span>
  )
}

/**
 * User class
 * @class
 */
class User extends React.Component {
  /**
   * Handle the click on the Listitem.
   */
  handleClick = () => {
    const { id, history } = this.props
    history.push(`${PROFILE}/${id}`)
  }
  /**
   * Render the component.
   */
  render() {
    const { username, usertitle, avatar, verified, city, state, country } = this.props
    // const verifiedStatus = verified ? '- verified' : ''
    const location = city || state || country ? `- ${city}, ${state}, ${country}` : ''
    const secondaryText = <SubText {...{username}} {...{usertitle}} {...{verified}} {...{location}} />
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
