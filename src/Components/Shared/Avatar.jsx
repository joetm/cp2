/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'

const _SIZE_MICRO = 16
const _SIZE_MINI  = 30
const _SIZE_MAXI  = 200


const styles = {
  avatarStyleMicro: {
    height: `${_SIZE_MICRO}px`,
    width: `${_SIZE_MICRO}px`,
    marginTop:'0px',
    marginLeft:'0px',
    marginRight:`${_SIZE_MICRO/2}px`,
    verticalAlign: 'middle',
    border: '1px solid #fff',
    zIndex:21448364,
  },
  avatarStyleMini: {
    height: `${_SIZE_MINI}px`,
    width: `${_SIZE_MINI}px`,
    marginTop:'-5px',
    marginLeft:'-5px',
    border: '2px solid #fff',
    zIndex:21448364,
  },
  avatarStyleMaxi: {
    height: `${_SIZE_MAXI}px`,
    width: `${_SIZE_MAXI}px`,
    border: '5px solid #fff',
    zIndex:21448364,
  },
}


/**
 * Avatar class
 * @class
 */
class AvatarBubble extends React.PureComponent {
    toggleActive() {
        this.props.toggleState(this.props.id)
    }
    render() {
      const {micro, mini, active, src, visible} = this.props
      // avatar size
      let avatarStyle = {}
      if (micro === true) {
          avatarStyle = styles.avatarStyleMicro
      } else if (mini === true) {
          avatarStyle = styles.avatarStyleMini
      } else {
          avatarStyle = styles.avatarStyleMaxi
      }
      // visibility
      if (visible) {
          avatarStyle.visibility = visible ? 'visible' : 'hidden'
      } else {
          avatarStyle.visibility = 'visible'
      }
      // status
      if (active) {
        avatarStyle.borderColor = 'red'
      } else {
        avatarStyle.borderColor = '#fff'
      }
      return (
          <Avatar
              style={avatarStyle}
              src={src}
              onTouchTap={this.props.onTouchTap}
          />
      )
    }
}

export default AvatarBubble
