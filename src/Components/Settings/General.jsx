/** @flow */

import React from 'react'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import styles from './styles'


const GeneralSettings = (props) => (
    <div style={{textAlign: 'left'}}>
        <Divider />
        <List>
          <Subheader>General</Subheader>
          <Toggle
            label="Simple"
            style={styles.toggle}
          />
          <Toggle
            label="Toggled by default"
            defaultToggled={true}
            style={styles.toggle}
          />
          <Toggle
            label="Simple"
            style={styles.toggle}
          />
          <Toggle
            label="Toggled by default"
            defaultToggled={true}
            style={styles.toggle}
          />
        </List>
    </div>
)

export default GeneralSettings
