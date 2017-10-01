/** @flow */

import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'


const Headline = (props) => {
  const { level, style } = props
  const elementStyle = {color: props.muiTheme.palette.textColor, ...style}
  switch (`${level}`) {
    case '5':
      return <h5 style={elementStyle}>{props.children}</h5>
    case '4':
      return <h4 style={elementStyle}>{props.children}</h4>
    case '3':
      return <h3 style={elementStyle}>{props.children}</h3>
    case '2':
      return <h2 style={elementStyle}>{props.children}</h2>
    case '1':
    default:
      return <h1 style={elementStyle}>{props.children}</h1>
  }
}

export default muiThemeable()(Headline)
