/** @flow */

import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import LoginIcon  from 'material-ui/svg-icons/action/perm-identity'

import fakeAuth  from '../../common/fakeAuth'


const styles = {
    button: {
        margin: 12,
    },
}

        // {
        //   fakeAuth.isAuthenticated ? (
        //     <p>
        //       Welcome! <button onClick={() => {
        //         fakeAuth.signout(() => history.push('/'))
        //       }}>Sign out</button>
        //     </p>
        //   ) : (
        //     <p>You are not logged in.</p>
        //   )
        // }

class LoginButton extends React.PureComponent {
  state = {
    visible: true,
  }
  // toggleVisible() {
  //   this.props.toggleState(this.props.id)
  // }
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
