/** @flow */

import React from 'react'
import msgs from './msgs'

const getMsg = (code) => {
  return `${code} - ${msgs[code]}.`
}


/**
 * Error class
 * @class
 */
const Error = (props) => (
  <div>
    <h2>{getMsg(props.code || 404)}</h2>

  </div>
)

export default Error
