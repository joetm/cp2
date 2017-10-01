/** @flow */

import React from 'react'
import Paper from 'material-ui/Paper'

import { getError } from './msgs'
import Headline from '../Shared/Headline'


const styles = {
  description: {
    padding: '2em',
    textAlign: 'center',
  },
  container: {
    maxWidth: '80%',
    padding: '1em',
    margin: '2em auto',
  },
}


/**
 * Error class
 * @class
 */
const Error = (props) => {
  const { code = 404 } = props
  const error = getError(code)
  return (
    <Paper style={styles.container}>
      <Headline>Error {code} - {error.msg}</Headline>
        <div style={styles.description}>
          {error.description}
        </div>
    </Paper>
  )
}

export default Error
