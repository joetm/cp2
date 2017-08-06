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


class CustomDialog extends React.PureComponent {
    render() {
        const defaultActions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.toggleHelp}
            />,
        ]
        return (
            <Dialog
              style={{display: this.props.isOpen ? 'block': 'none'}}
              title={this.props.title}
              actions={this.props.actions || defaultActions}
              modal={false}
              open={this.props.isOpen}
              onRequestClose={this.props.toggleHelp}
            >
                {this.props.msg}
            </Dialog>
        )
    }
}

export default CustomDialog
