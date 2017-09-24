/** @flow */

import React from 'react'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'


const closeButtonStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
}


const DrawerCloseButton = (props) => (
  <IconButton
    style={closeButtonStyle}
    onTouchTap={props.action}
  >
    <CloseIcon />
  </IconButton>
)

export default DrawerCloseButton
