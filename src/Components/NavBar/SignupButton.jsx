/** @flow */

import React from 'react'
import IconButton from 'material-ui/IconButton'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import SignupIcon from 'material-ui/svg-icons/action/perm-identity'


const styles = {
  button: {
    margin: 12,
  },
}


class SignupButton extends React.PureComponent {
  state = {
    visible: true,
  }
  // toggleVisible() {
  //   this.props.toggleState(this.props.id)
  // }
  render() {
    return (
        <RaisedButton
          label="Sign Up"
          primary={true}
          style={styles.button}
          icon={<SignupIcon />}
        />
    )
  }
}

export default SignupButton
