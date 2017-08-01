/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'

const _SIZE_MINI = 30
const _SIZE_MAXI = 200


const styles = {
  avatarStyleMini: {
    height: `${_SIZE_MINI}px`,
    width: `${_SIZE_MINI}px`,
    marginTop:'-5px',
    marginLeft:'-5px',
    border: '2px solid #fff',
    zIndex:214748364,
  },
  avatarStyleMaxi: {
    height: `${_SIZE_MAXI}px`,
    width: `${_SIZE_MAXI}px`,
    border: '5px solid #fff',
    zIndex:214748364,
  },
}



class AvatarBubble extends React.PureComponent {
    toggleActive() {
        this.props.toggleState(this.props.id)
    }
    render() {
      const {mini, active, src} = this.props
      // avatar size
      let avatarStyle = {}
      // size
      if (mini === true) {
        avatarStyle = styles.avatarStyleMini
      } else {
        avatarStyle = styles.avatarStyleMaxi
      }
      // visibility
      avatarStyle.display = this.props.visible ? 'inline-block' : 'none'
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
        />
      )
    }
}

export default AvatarBubble
