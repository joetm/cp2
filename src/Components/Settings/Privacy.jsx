/** @flow */

import React from 'react'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import styles from './styles'


const PrivacySettings = () => (
    <div style={{textAlign: 'left'}}>

          <Subheader inset={false}>Privacy Settings</Subheader>
          <Divider />

          <List>
            <Toggle
              label="Show your location"
              defaultToggled={true}
              style={styles.toggle}
            />
            <Toggle
              label="Show your birthday"
              defaultToggled={false}
              style={styles.toggle}
            />
            <Toggle
              label="Show online status"
              defaultToggled={true}
              style={styles.toggle}
            />
          </List>

    </div>
)

export default PrivacySettings
