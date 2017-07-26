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



const AvatarBubble = (props) => {
    // avatar size
    let avatarStyle = {}
    if (props.mini === true) {
      avatarStyle = styles.avatarStyleMini
    } else {
      avatarStyle = styles.avatarStyleMaxi
    }
    return (
        <Avatar
            style={avatarStyle}
            src={props.src}
        />
    )
}

export default AvatarBubble
