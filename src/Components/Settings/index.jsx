/** @flow */

import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
// import LocationIcon from 'material-ui/svg-icons/communication/location-on'
import ProfileIcon from 'material-ui/svg-icons/action/assignment-ind'
import ImageIcon from 'material-ui/svg-icons/editor/insert-photo'
import VerifyIcon from 'material-ui/svg-icons/action/verified-user'
import PrivacyIcon from 'material-ui/svg-icons/action/fingerprint'
import AccountIcon from 'material-ui/svg-icons/action/account-box'

import sharedStyles from './styles'
import { SETTINGS } from '../../routes'
import Spacer from '../Shared/Spacer'
// import SettingsMenuEntry from './SettingsMenuEntry'
// --
import AvatarImg from './AvatarImg'
import ProfileImg from './ProfileImg'
import VerificationImg from './VerificationImg'
import Site from './Site'
import Privacy from './Privacy'
import Account from './Account'


const _SETTINGS_ROUTES = [
  `${SETTINGS.INDEX}${SETTINGS.SITE}`,
  `${SETTINGS.INDEX}${SETTINGS.IMAGE}`,
  `${SETTINGS.INDEX}${SETTINGS.AVATAR}`,
  `${SETTINGS.INDEX}${SETTINGS.VERIFICATION}`,
  `${SETTINGS.INDEX}${SETTINGS.PRIVACY}`,
  `${SETTINGS.INDEX}${SETTINGS.ACCOUNT}`,
]

const styles = {
  bottomNavigationItem: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: '33.3333%',
      flexBasis: '200px',
  },
}


class Settings extends React.Component {
  state = {
    selectedIndex: 0,
  }
  select = (selectedIndex) => this.setState({selectedIndex})
  componentWillMount() {
    const url = this.props.location.pathname
    const selectedIndex = _SETTINGS_ROUTES.indexOf(url)
    this.setState({selectedIndex})
  }
  handleTabClick = (selectedTabIndex, url) => {
    this.select(selectedTabIndex)
    this.props.history.push(url)
  }
  render() {
    const { url } = this.props.match
    return (
      <div style={{textAlign: 'center'}}>

        <h1>Settings</h1>

        <div style={{clear: 'both'}}>
          <BottomNavigation
            selectedIndex={this.state.selectedIndex}
            style={{display: 'flex', flexWrap: 'wrap', height: 'auto'}}
          >
            <BottomNavigationItem
              label="Site Settings"
              icon={<ProfileIcon />}
              onClick={() => { this.handleTabClick(0, `${url}${SETTINGS.SITE}`) }}
              style={styles.bottomNavigationItem}
            />
            <BottomNavigationItem
              label="Profile Image"
              icon={<ImageIcon />}
              onClick={() => { this.handleTabClick(1, `${url}${SETTINGS.IMAGE}`) }}
              style={styles.bottomNavigationItem}
            />
            <BottomNavigationItem
              label="Avatar"
              icon={<ImageIcon />}
              onClick={() => { this.handleTabClick(2, `${url}${SETTINGS.AVATAR}`) }}
              style={styles.bottomNavigationItem}
            />
            <BottomNavigationItem
              label="Verify"
              icon={<VerifyIcon />}
              onClick={() => { this.handleTabClick(3, `${url}${SETTINGS.VERIFICATION}`) }}
              style={styles.bottomNavigationItem}
            />
            <BottomNavigationItem
              label="Privacy"
              icon={<PrivacyIcon />}
              onClick={() => { this.handleTabClick(4, `${url}${SETTINGS.PRIVACY}`) }}
              style={styles.bottomNavigationItem}
            />
            <BottomNavigationItem
              label="Account"
              icon={<AccountIcon />}
              onClick={() => { this.handleTabClick(5, `${url}${SETTINGS.ACCOUNT}`) }}
              style={styles.bottomNavigationItem}
            />
          </BottomNavigation>
        </div>

        <Spacer />

        <div style={sharedStyles.settingsBlock}>
          <Switch>
            <Route exact path={`${url}${SETTINGS.SITE}`}         component={Site} />
            <Route exact path={`${url}${SETTINGS.IMAGE}`}        component={ProfileImg} />
            <Route exact path={`${url}${SETTINGS.AVATAR}`}       component={AvatarImg} />
            <Route exact path={`${url}${SETTINGS.VERIFICATION}`} component={VerificationImg} />
            <Route exact path={`${url}${SETTINGS.PRIVACY}`}      component={Privacy} />
            <Route exact path={`${url}${SETTINGS.ACCOUNT}`}      component={Account} />
            <Route component={Site} />
          </Switch>
        </div>

        <Spacer />

      </div>
    )
  }
}

export default withRouter(Settings)
