/** @flow */

import React from 'react'
import Subheader from 'material-ui/Subheader'
import { List } from 'material-ui/List'
import { Route, Switch, withRouter } from 'react-router-dom'

import Avatar from '../Shared/Avatar'
import Spacer from '../Shared/Spacer'
import SettingsMenuEntry from './SettingsMenuEntry'
import AvatarImg from './DropzoneAvatar'
import ProfileImg from './DropzoneProfileImg'
// --
import General from './General'
import Privacy from './Privacy'
import styles from './styles'


class Settings extends React.Component {
    /**
     * Render the component.
     */
    render () {
          return (
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
                <Route path={`${this.props.match.url}/general`} component={General}/>
                <Route path={`${this.props.match.url}/image`}   component={ProfileImg}/>
                <Route path={`${this.props.match.url}/avatar`}  component={AvatarImg}/>
                <Route path={`${this.props.match.url}/privacy`} component={Privacy}/>
              </Switch>
            </div>
            <Spacer />
          </div>
          )
    }
}

export default Settings
