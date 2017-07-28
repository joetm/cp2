/** @flow */

import React from 'react'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'

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
      IconColor = {color: grey400}
    }
    else if (this.props.active) {
      IconColor = {color: 'red'}
    } else {
      IconColor = {color: darkBlack}
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
