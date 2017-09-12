/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

const separatorContainerStyle = {
  margin: '1.5em 0',
}

const SettingsSeparator = (props) => (
  <div style={separatorContainerStyle}>
    <Subheader inset={false}>{props.text}</Subheader>
    <Divider />
  </div>
)

export default SettingsSeparator
