/** @flow */

import React from 'react'
import Snackbar from 'material-ui/Snackbar'


class SnackbarAlert extends React.Component {
    render() {
        const msg = this.props.msg || 'Thanks. Your vote has been recorded.'
        const duration = this.props.duration || 3000
        return (
            <Snackbar
              open={this.props.open}
              message={msg}
              autoHideDuration={duration}
              onRequestClose={this.props.closeAlert}
            />
        )
    }
}

export default SnackbarAlert
