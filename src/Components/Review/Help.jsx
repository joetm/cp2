/** @flow */

import React from 'react'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  button: {
    margin: 12,
  },
}


class Help extends React.PureComponent {
  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.props.toggleHelp}
      />,
    ]
    return (
        <Dialog
          style={{display: this.props.isOpen ? 'block': 'none'}}
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
}

export default Help
