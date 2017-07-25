/** @flow */

import React from 'react'
import Avatar from 'material-ui/Avatar'

const avatarStyleMini = {
  height: '30px',
  width: '30px',
  border: '2px solid #fff',
}
const avatarStyleMaxi = {
  height: '200px',
  width: '200px',
  border: '5px solid #fff',
}

const avatarOffset = {
  marginTop: '-150px',
  marginLeft: '50px',
}

const AvatarBubble = (props) => {
  // avatar style
  let avatarStyle = {}
  if (props.mini === true) {
    avatarStyle = avatarStyleMini
  } else {
    avatarStyle = avatarStyleMaxi
  }
  // offset for profile
  // TODO - move this into profile
	if (props.offset === true) {
		avatarStyle.marginTop = avatarOffset.marginTop
		avatarStyle.marginLeft = avatarOffset.marginLeft
	} else {
		avatarStyle.marginTop = 0
		avatarStyle.marginLeft = 0
	}

  return (
    	<Avatar style={avatarStyle} src="avatar/face.jpg" />
  )
}


export default AvatarBubble