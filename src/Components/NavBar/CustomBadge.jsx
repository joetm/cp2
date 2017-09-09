/** @flow */

import React from 'react'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import { NavLink } from 'react-router-dom'

import { colors } from '../../common/theme'


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


class CustomBadge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deactivated: false,
    }
  }
  wrapNavLink = (Component) => {
    const { to } = this.props
    if (to) {
        return (
            <NavLink
                to={to}
                activeStyle={{color: colors.palette.primary1Color}}
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
      IconColor = {color: colors.grey}
    } else if (active) {
      IconColor = {color: colors.palette.primary1Color}
    } else {
      IconColor = {color: colors.darkBlack}
    }
    return this.wrapNavLink(
        <Badge
          badgeContent={badgeContent}
          secondary={true}
          badgeStyle={styles.badgeStyle}
          style={styles.badgeRootStyle}
          onTouchTap={onTouchTap}
        >
          <IconButton
            tooltip={tooltip}
            iconStyle={IconColor}
            id={id}
          >
            {icon}
          </IconButton>
        </Badge>
    )
  }
}

export default CustomBadge
