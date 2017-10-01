/** @flow */

import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'


const CustomDialog = (props) => {
  const defaultActions = [
    <FlatButton
      label="Close"
      primary={true}
      onTouchTap={props.toggleHelp}
    />,
  ]
  return (
    <Dialog
      style={{display: props.isOpen ? 'block' : 'none'}}
      title={props.title}
      actions={props.actions || defaultActions}
      modal={false}
      open={props.isOpen}
      onRequestClose={props.toggleHelp}
    >
      <div dangerouslySetInnerHTML={{__html: props.msg}}></div>
    </Dialog>
  )
}

export default CustomDialog
