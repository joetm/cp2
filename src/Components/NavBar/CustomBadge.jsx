/** @flow */

import React from 'react'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import { colors } from '../../common/theme'

const styles = {
    badgeRootStyle: {
        margin: 0,
        padding: '0px 10px',
    },
    badgeStyle: {
        top: -6,
        right: 0,
    },
}


class CustomBadge extends React.PureComponent {
  state = {
    deactivated: false,
  }
  toggleActive() {
    this.props.toggleState(this.props.id)
  }
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
    return (
      <Badge
        badgeContent={this.props.badgeContent}
        secondary={true}
        badgeStyle={styles.badgeStyle}
        style={styles.badgeRootStyle}
      >
        <IconButton
          tooltip={this.props.tooltip}
          iconStyle={IconColor}
          onClick={this.toggleActive.bind(this)}
          id={this.props.id}
        >
          {this.props.icon}
        </IconButton>
      </Badge>
    )
  }
}

export default CustomBadge
