/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'


const _SIZE_MICRO = 16
const _SIZE_MINI  = 30
const _SIZE_MACRO = 40
const _SIZE_MAXI  = 200


const styles = {
  avatarStyleMicro: {
    height: `${_SIZE_MICRO}px`,
    width: `${_SIZE_MICRO}px`,
    marginTop: '0px',
    marginLeft: '0px',
    marginRight: `${_SIZE_MICRO / 2}px`,
    verticalAlign: 'middle',
    border: '1px solid #fff',
    fontSize: `${_SIZE_MICRO * 0.5}px`,
    zIndex: 9999,
  },
  avatarStyleMini: {
    height: `${_SIZE_MINI}px`,
    width: `${_SIZE_MINI}px`,
    marginTop: '-5px',
    marginLeft: '-5px',
    marginRight: '10px',
    border: '2px solid #fff',
    fontSize: `${_SIZE_MINI * 0.5}px`,
    zIndex: 9999,
  },
  avatarStyleMacro: {
    height: `${_SIZE_MACRO}px`,
    width: `${_SIZE_MACRO}px`,
    position: 'absolute',
    top: '16px',
    left: '16px',
    border: '2px solid #fff',
    fontSize: `${_SIZE_MACRO * 0.5}px`,
    zIndex: 9999,
  },
  avatarStyleMaxi: {
    height: `${_SIZE_MAXI}px`,
    width: `${_SIZE_MAXI}px`,
    border: '5px solid #fff',
    fontSize: `${_SIZE_MAXI * 0.6}px`,
    zIndex: 9999,
  },
}


/**
 * Avatar class
 * @class
 */
class AvatarBubble extends React.Component {
    /**
     * Render the component.
     */
    render() {
      const {micro, mini, macro, username, active, src, visible, style} = this.props
      console.log()
      // avatar size
      let avatarStyle = {}
      if (micro === true) {
          avatarStyle = styles.avatarStyleMicro
      } else if (mini === true) {
          avatarStyle = styles.avatarStyleMini
      } else if (macro === true) {
          avatarStyle = styles.avatarStyleMacro
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
      // default Avatar for people without avatar image
      if (!src) {
        return (
            <Avatar
                style={{...avatarStyle, style}}
                onTouchTap={this.props.onTouchTap}
            >
              {username ? username.substr(0, 1) : 'X'}
            </Avatar>
        )
      }
      return (
          <Avatar
              style={avatarStyle}
              src={src}
              alt={username}
              onTouchTap={this.props.onTouchTap}
          />
      )
    }
}

export default AvatarBubble
