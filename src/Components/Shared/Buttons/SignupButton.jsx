/** @flow */

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import SignupIcon from 'material-ui/svg-icons/action/perm-identity'
import { Route } from 'react-router-dom'


const styles = {
    button: {
        margin: 12,
    },
}


class SignupButton extends React.PureComponent {
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
                  label="Sign Up"
                  primary={true}
                  style={styles.button}
                  icon={<SignupIcon />}
                  onClick={() => { history.push('/signup') }}
                />
            )} />
        )
    }
}

export default SignupButton
