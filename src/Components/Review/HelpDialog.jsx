/** @flow */

import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'


const HelpDialog = () => {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.props.toggleHelp}
      />,
    ]
    return (
        <Dialog
          style={{display: this.props.isOpen ? 'block' : 'none'}}
          title="How does this work?"
          actions={actions}
          modal={false}
          open={this.props.isOpen}
          onRequestClose={this.props.toggleHelp}
        >
          HELP TEXT
        </Dialog>
    )
}

export default HelpDialog
