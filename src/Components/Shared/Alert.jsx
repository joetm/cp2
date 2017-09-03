/** @flow */

import React from 'react'
import Snackbar from 'material-ui/Snackbar'

const _DEFAULT_DURATION = 2000


class SnackbarAlert extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        const msg = this.props.msg || 'Thanks. Your vote has been recorded.'
        const duration = this.props.duration || _DEFAULT_DURATION
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
