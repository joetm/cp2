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


class CustomBadge extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      deactivated: false,
    }
    // bindings
    this.wrapNavLink = this.wrapNavLink.bind(this)
  }
  wrapNavLink(Component) {
      if (this.props.to) {
          return (
              <NavLink
                  to={this.props.to}
                  activeStyle={{color: colors.palette.primary1Color}}
              >
                {Component}
              </NavLink>
          )
      } else {
          return Component
      }
  }
  /**
   * Render the component.
   */
  render() {
    let IconColor
    if (this.state.deactivated) {
      IconColor = {color: colors.grey}
    }
    else if (this.props.active) {
      IconColor = {color: colors.palette.primary1Color}
    } else {
      IconColor = {color: colors.darkBlack}
    }
    return this.wrapNavLink(
        <Badge
          badgeContent={this.props.badgeContent}
          secondary={true}
          badgeStyle={styles.badgeStyle}
          style={styles.badgeRootStyle}
          onTouchTap={this.props.onTouchTap}
        >
          <IconButton
            tooltip={this.props.tooltip}
            iconStyle={IconColor}
            id={this.props.id}
          >
            {this.props.icon}
          </IconButton>
        </Badge>
    )
  }
}

export default CustomBadge
