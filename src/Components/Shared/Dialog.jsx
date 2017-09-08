/** @flow */

import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'


class CustomDialog extends React.Component {
    /**
     * Render the component.
     */
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
              style={{display: this.props.isOpen ? 'block' : 'none'}}
              title={this.props.title}
              actions={this.props.actions || defaultActions}
              modal={false}
              open={this.props.isOpen}
              onRequestClose={this.props.toggleHelp}
            >
              <div dangerouslySetInnerHTML={{__html: this.props.msg}}></div>
            </Dialog>
        )
    }
}

export default CustomDialog
