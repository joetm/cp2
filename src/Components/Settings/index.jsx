/** @flow */

import React from 'react'
import { List } from 'material-ui/List'
import { Route, Switch } from 'react-router-dom'

import Spacer from '../Shared/Spacer'
import SettingsMenuEntry from './SettingsMenuEntry'
import AvatarImg from './DropzoneAvatar'
import ProfileImg from './DropzoneProfileImg'
// --
import General from './General'
import Privacy from './Privacy'
import styles from './styles'


const Settings = (props) => (
          <div style={{textAlign: 'center'}}>
            <h1>Settings</h1>
            <div style={styles.settingsBlock}>
              <List>
                  <SettingsMenuEntry
                    primaryText="General"
                    secondaryText="General settings"
                    url="/general"
                  />
                  <SettingsMenuEntry
                    primaryText="Profile photo"
                    secondaryText="Change your profile photo"
                    url="/image"
                  />
                  <SettingsMenuEntry
                    primaryText="Avatar"
                    secondaryText="Change your avatar photo"
                    url="/avatar"
                  />
                  <SettingsMenuEntry
                    primaryText="Privacy"
                    secondaryText="Change your privacy settings"
                    url="/privacy"
                  />
              </List>
              <Spacer />
              <Switch>
                  <Route path={`${props.match.url}/general`} component={General} />
                  <Route path={`${props.match.url}/image`}   component={ProfileImg} />
                  <Route path={`${props.match.url}/avatar`}  component={AvatarImg} />
                  <Route path={`${props.match.url}/privacy`} component={Privacy} />
              </Switch>
            </div>
            <Spacer />
          </div>
)

export default Settings
