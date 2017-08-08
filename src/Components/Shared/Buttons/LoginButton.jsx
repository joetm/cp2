/** @flow */

import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import LoginIcon  from 'material-ui/svg-icons/action/perm-identity'

import fakeAuth  from '../../../common/fakeAuth'


const styles = {
    button: {
        margin: 12,
    },
}


class LoginButton extends React.PureComponent {
  state = {
    visible: true,
  }
  render() {
    const { history } = this.props
    return (
        <RaisedButton
          label="Login"
          secondary={true}
          style={styles.button}
          icon={<LoginIcon />}
        />
    )
  }
}

export default withRouter(LoginButton)
