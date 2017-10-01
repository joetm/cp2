/** @flow */

import React from 'react'
import Snackbar from 'material-ui/Snackbar'

const _DEFAULT_DURATION = 2000


const SnackbarAlert = (props) => {
  const msg = props.msg || 'Thanks. Your vote has been recorded.'
  const duration = props.duration || _DEFAULT_DURATION
  return (
    <Snackbar
      open={props.open}
      message={msg}
      autoHideDuration={duration}
      onRequestClose={props.closeAlert}
    />
  )
}

export default SnackbarAlert
