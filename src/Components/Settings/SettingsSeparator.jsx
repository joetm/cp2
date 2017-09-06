/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

const separatorContainerStyle = {
  marginTop: '1.5em',
}

const SettingsSeparator = (props) => (
  <div style={separatorContainerStyle}>
    <Subheader inset={false}>{props.text}</Subheader>
    <Divider />
  </div>
)

export default SettingsSeparator
