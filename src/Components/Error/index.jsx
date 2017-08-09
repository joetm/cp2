/** @flow */

import React from 'react'
import Msgs from './msgs'

const getMsg = (code) => {
  return `${code} - ${Msgs[code]}.`
}


/**
 * Error class
 * @class
 */
const Error = () => (
  <div>
    <h2>{getMsg(404)}</h2>
  </div>
)

export default Error
