/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'


const styles = {
  avatarStyleMini: {
    height: '30px',
    width: '30px',
    marginTop:'-5px',
    marginLeft:'-5px',
    border: '2px solid #fff',
  },
  avatarStyleMaxi: {
    height: '200px',
    width: '200px',
    border: '5px solid #fff',
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
      if (mini === true) {
        avatarStyle = styles.avatarStyleMini
      } else {
        avatarStyle = styles.avatarStyleMaxi
      }
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
