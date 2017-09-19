/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login } from '../../actions'
import LoginForm from './LoginForm'
import { validEmail } from '../../common/helpers'
import Spacer from '../Shared/Spacer'


class LoginPage extends React.Component {
  state = {
      errors: {},
      user: {
        email: null,
        password: null,
      }
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = (event) => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault()

    const { email, password } = this.state.user

    // console.log('email', email)
    // console.log('password', password)

    if (!email || !validEmail(email) || !password) {
      const errors = {
        summary: null,
        email: !email ? "Missing email" : null,
        password: !password ? "Missing password" : null,
      }
      if (!validEmail(email)) {
        errors.email = "Invalid email"
      }
      this.setState({ errors })
      console.log(errors)
      return
    }

    console.log('logging in...')

    this.props.login(email, password)
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser = (event) => {
    const field = event.target.name
    const user = this.state.user
    user[field] = event.target.value

    this.setState({
      user
    })
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <Spacer />
        <LoginForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={this.state.errors}
            user={this.state.user}
        />
        <Spacer />
      </div>
    )
  }
}


// const mapStateToProps = (state) => ({
//     // --
// })

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
    // logout: bindActionCreators(logout, dispatch),
  }
}

export default connect(
    null,
    mapDispatchToProps,
)(LoginPage)
