/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'


const styles = {
  avatarStyleMini: {
    height: '30px',
    width: '30px',
    border: '2px solid #fff',
  },
  avatarStyleMaxi: {
    height: '200px',
    width: '200px',
    border: '5px solid #fff',
  },
  avatarOffset: {
    marginTop: '-150px',
    marginLeft: '50px',
  },
}



const AvatarBubble = (props) => {
    // avatar style
    let avatarStyle = {}
    if (props.mini === true) {
      avatarStyle = styles.avatarStyleMini
    } else {
      avatarStyle = styles.avatarStyleMaxi
    }
    // offset for profile
    // TODO - move this into profile
  	if (props.offset === true) {
  		avatarStyle.marginTop = styles.avatarOffset.marginTop
  		avatarStyle.marginLeft = styles.avatarOffset.marginLeft
  	} else {
  		avatarStyle.marginTop = 0
  		avatarStyle.marginLeft = 0
  	}

    console.log(props.avatar);

    return (
        <Avatar
            style={avatarStyle}
            src={props.src}
        />
    )
}

export default AvatarBubble
