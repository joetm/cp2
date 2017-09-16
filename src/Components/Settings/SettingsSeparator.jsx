/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

const separatorContainerStyle = {
  margin: '3.5em 0 0 0',
}

const SettingsSeparator = (props) => {
    const firstItemStyle = props.first ? {marginTop: 0} : {}
    return (
      <div style={{...separatorContainerStyle, ...firstItemStyle, ...props.style}}>
        <Subheader inset={false}>{props.text}</Subheader>
        <Divider />
      </div>
    )
}

export default SettingsSeparator
