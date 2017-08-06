/** @flow */

import React from 'react'
import Toggle from 'material-ui/Toggle'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import {Route, Switch, withRouter} from 'react-router-dom'

import Avatar from '../Shared/Avatar'
import Spacer from '../Shared/Spacer'
import SettingsMenuEntry from './SettingsMenuEntry'
import DropzoneAvatar from './DropzoneAvatar'
import DropzoneProfileImg from './DropzoneProfileImg'


const blockMaxWidth = '80%' // 250

const styles = {
  settingsBlock: {
    // display: 'flex',
    // flexWrap: 'wrap',
    maxWidth: blockMaxWidth,
    margin: 'auto auto',
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
}



const PrivacySettings = (props) => (
    <div style={{textAlign: 'left'}}>
          <Divider />
          <List>
            <Subheader>Notifications</Subheader>
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
              label="Styling"
              thumbStyle={styles.thumbOff}
              trackStyle={styles.trackOff}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              labelStyle={styles.labelStyle}
            />
        </List>
          <Divider />
          <List>
            <Subheader>XXXX</Subheader>
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
              label="Styling"
              thumbStyle={styles.thumbOff}
              trackStyle={styles.trackOff}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              labelStyle={styles.labelStyle}
            />
        </List>
    </div>
)

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
              label="Styling"
              thumbStyle={styles.thumbOff}
              trackStyle={styles.trackOff}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              labelStyle={styles.labelStyle}
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
            <Toggle
              label="Styling"
              thumbStyle={styles.thumbOff}
              trackStyle={styles.trackOff}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              labelStyle={styles.labelStyle}
            />
        </List>
    </div>
)


class Settings extends React.PureComponent {
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
                <Route path={this.props.match.url + '/general'} component={GeneralSettings}/>
                <Route path={this.props.match.url + '/image'} component={DropzoneProfileImg}/>
                <Route path={this.props.match.url + '/avatar'} component={DropzoneAvatar}/>
                <Route path={this.props.match.url + '/privacy'} component={PrivacySettings}/>
              </Switch>
            </div>
            <Spacer />
          </div>
          )
    }
}

export default Settings
