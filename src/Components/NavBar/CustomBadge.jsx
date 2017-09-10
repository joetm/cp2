/** @flow */

import React from 'react'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import { NavLink } from 'react-router-dom'

import { palette, grey, darkBlack } from '../../common/colors'


const styles = {
    badgeRootStyle: {
        margin: '0 20px 0 0',
        padding: '0px 10px',
        cursor: 'pointer',
    },
    badgeStyle: {
        top: -6,
        right: 0,
    },
}


const BadgeWrapper = (props) => (
  <Badge
    badgeContent={props.badgeContent}
    secondary={true}
    badgeStyle={styles.badgeStyle}
    style={styles.badgeRootStyle}
    onTouchTap={props.onTouchTap}
  >
    {props.children}
  </Badge>
)


class CustomBadge extends React.Component {
  state = {
    deactivated: false,
  }
  wrapNavLink = (Component) => {
    const { to } = this.props
    if (to) {
        return (
            <NavLink
                to={to}
                activeStyle={{color: palette.primary1Color}}
            >
              {Component}
            </NavLink>
        )
    }
    return Component
  }
  /**
   * Render the component.
   */
  render() {
    const { id, icon, tooltip, active, badgeContent, onTouchTap } = this.props
    let IconColor
    if (this.state.deactivated) {
      IconColor = {color: grey}
    } else if (active) {
      IconColor = {color: palette.primary1Color}
    } else {
      IconColor = {color: darkBlack}
    }

    const badgeButton = (
      <IconButton
        tooltip={tooltip}
        style={{marginRight: badgeContent > 0 ? 0 : '16px'}}
        iconStyle={IconColor}
        id={id}
      >
        {icon}
      </IconButton>
    )

    const ComponentContent = badgeContent > 0 ?
      (
        <BadgeWrapper
          badgeContent={badgeContent}
          onTouchTap={onTouchTap}
        >{badgeButton}</BadgeWrapper>
      )
      :
      badgeButton

    return this.wrapNavLink(ComponentContent)
  }
}

export default CustomBadge
