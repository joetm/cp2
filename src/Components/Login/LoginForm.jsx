/** @flow */

import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import './loginform.scss'


const LoginForm = (props) => {
    const { onSubmit, onChange, errors, user } = props
    return (
      <Card className="loginContainer">
          <form method="post" action="/" onSubmit={onSubmit}>
              <h2 className="card-heading">Login</h2>

              {errors.summary && <p className="error-message">{errors.summary}</p>}

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
                  <RaisedButton
                    type="submit"
                    label="Log in"
                    primary
                  />
              </div>

              <CardText>
                  Don't have an account?
                  {' '}
                  <Link to={'/signup'}>Create one</Link>.
              </CardText>

          </form>
      </Card>
    )
}

export default LoginForm
