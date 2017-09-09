/** @flow */

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import LoginIcon  from 'material-ui/svg-icons/action/perm-identity'
import { Route } from 'react-router-dom'


const styles = {
    button: {
        margin: '12px 0 12px 0',
    },
}


class LoginButton extends React.Component {
  state = {
    visible: true,
  }
  /**
   * Render the component.
   */
  render() {
    return (
        <Route render={({ history }) => (
            <RaisedButton
              label="Login"
              secondary={true}
              style={styles.button}
              icon={<LoginIcon />}
              onClick={() => { history.push('/login') }}
            />
        )} />
    )
  }
}

export default LoginButton
