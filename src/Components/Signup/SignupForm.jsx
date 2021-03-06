/** @flow */

import React from 'react'
// import { Link } from 'react-router'
import { Card } from 'material-ui/Card'
// import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'

import './signupform.css'
import Spacer from '../Shared/Spacer'


const SignUpForm = () => {
  // const {
  // onSubmit,
  // onChange,
  // errors,
  // user,
  // } = props
  return (
    <Card className="container">
      <h2 className="card-heading">Sign Up</h2>
      <p>
        We are in public beta. Signup is closed.
        <br />
        Check back at a later time.
        <br />
        <br />
        Note: If you have an old account, it will still work.
      </p>
      <Spacer />
    </Card>
)
}

/*
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Account" primary />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
)
*/

export default SignUpForm
