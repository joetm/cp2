/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { List } from 'material-ui/List'
import { Route, Switch } from 'react-router-dom'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
// import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import ProfileIcon from 'material-ui/svg-icons/action/assignment-ind'
import ImageIcon from 'material-ui/svg-icons/editor/insert-photo'
import VerifyIcon from 'material-ui/svg-icons/action/verified-user'
import PrivacyIcon from 'material-ui/svg-icons/action/fingerprint'

import styles from './styles'
import routes from '../../routes'
import Spacer from '../Shared/Spacer'
// import SettingsMenuEntry from './SettingsMenuEntry'
// --
import AvatarImg from './AvatarImg'
import ProfileImg from './ProfileImg'
import VerificationImg from './VerificationImg'
import General from './General'
import Privacy from './Privacy'


class Settings extends React.Component {
  state = {
    selectedIndex: 0,
  }
  select = (index) => this.setState({selectedIndex: index})
  render() {
    return (
      <div style={{textAlign: 'center'}}>

        <h1>Settings</h1>

        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="General"
            icon={<ProfileIcon />}
            onClick={() => {this.select(0); this.props.history.push(`${this.props.match.url}${routes.SETTINGS.GENERAL}`)}}
          />
          <BottomNavigationItem
            label="Profile Image"
            icon={<ImageIcon />}
            onClick={() => {this.select(1); this.props.history.push(`${this.props.match.url}${routes.SETTINGS.IMAGE}`)}}
          />
          <BottomNavigationItem
            label="Avatar"
            icon={<ImageIcon />}
            onClick={() => {this.select(2); this.props.history.push(`${this.props.match.url}${routes.SETTINGS.AVATAR}`)}}
          />
          <BottomNavigationItem
            label="Verify"
            icon={<VerifyIcon />}
            onClick={() => {this.select(3); this.props.history.push(`${this.props.match.url}${routes.SETTINGS.VERIFICATION}`)}}
          />
          <BottomNavigationItem
            label="Privacy"
            icon={<PrivacyIcon />}
            onClick={() => {this.select(4); this.props.history.push(`${this.props.match.url}${routes.SETTINGS.PRIVACY}`)}}
          />
        </BottomNavigation>

        <div style={styles.settingsBlock}>

          {/*
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
          */}

          <Spacer />

          <Switch>
            <Route exact path={`${this.props.match.url}${routes.SETTINGS.GENERAL}`} component={General} />
            <Route exact path={`${this.props.match.url}${routes.SETTINGS.IMAGE}`}   component={ProfileImg} />
            <Route exact path={`${this.props.match.url}${routes.SETTINGS.AVATAR}`}  component={AvatarImg} />
            <Route exact path={`${this.props.match.url}${routes.SETTINGS.VERIFICATION}`}  component={VerificationImg} />
            <Route exact path={`${this.props.match.url}${routes.SETTINGS.PRIVACY}`} component={Privacy} />
            <Route component={General} />
          </Switch>

        </div>

        <Spacer />

      </div>
    )
  }
}

export default withRouter(Settings)
