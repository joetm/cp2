/** @flow */

import React from 'react'

import msgs from './msgs'
import Headline from '../Shared/Headline'


const getMsg = (code) => {
  return `${code} - ${msgs[code]}.`
}


/**
 * Error class
 * @class
 */
const Error = (props) => (
  <div>
    <Headline>{getMsg(props.code || 404)}</Headline>
  </div>
)

export default Error
