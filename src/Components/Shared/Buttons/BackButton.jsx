/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import BackIcon from 'material-ui/svg-icons/content/undo'


const styles = {
    backButton: {
        position: 'relative',
        top: '20px',
        left: '20px',
    },
}


const BackButton = (props) => (
  <FloatingActionButton
      mini={true}
      secondary={true}
      style={styles.backButton}
      onTouchTap={props.history.goBack}
  >
      <BackIcon />
  </FloatingActionButton>
)

export default withRouter(BackButton)
