/** @flow */

import React from 'react'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import styles from './styles'


const PrivacySettings = (props) => (
    <div style={{textAlign: 'left'}}>
          <Divider />
          <List>
            <Subheader>Privacy Settings</Subheader>
            <Toggle
              label="Show your location"
              defaultToggled={true}
              style={styles.toggle}
            />
        </List>
    </div>
)

export default PrivacySettings
