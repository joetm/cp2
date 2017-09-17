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
import Account from './Account'


const _SETTINGS_ROUTES = [
  `${routes.SETTINGS.INDEX}${routes.SETTINGS.GENERAL}`,
  `${routes.SETTINGS.INDEX}${routes.SETTINGS.IMAGE}`,
  `${routes.SETTINGS.INDEX}${routes.SETTINGS.AVATAR}`,
  `${routes.SETTINGS.INDEX}${routes.SETTINGS.VERIFICATION}`,
  `${routes.SETTINGS.INDEX}${routes.SETTINGS.PRIVACY}`,
  `${routes.SETTINGS.INDEX}${routes.SETTINGS.ACCOUNT}`,
]


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

        <BottomNavigation
          selectedIndex={this.state.selectedIndex}
        >
          <BottomNavigationItem
            label="General"
            icon={<ProfileIcon />}
            onClick={() => { this.handleTabClick(0, `${url}${routes.SETTINGS.GENERAL}`) }}
          />
          <BottomNavigationItem
            label="Profile Image"
            icon={<ImageIcon />}
            onClick={() => { this.handleTabClick(1, `${url}${routes.SETTINGS.IMAGE}`) }}
          />
          <BottomNavigationItem
            label="Avatar"
            icon={<ImageIcon />}
            onClick={() => { this.handleTabClick(2, `${url}${routes.SETTINGS.AVATAR}`) }}
          />
          <BottomNavigationItem
            label="Verify"
            icon={<VerifyIcon />}
            onClick={() => { this.handleTabClick(3, `${url}${routes.SETTINGS.VERIFICATION}`) }}
          />
          <BottomNavigationItem
            label="Privacy"
            icon={<PrivacyIcon />}
            onClick={() => { this.handleTabClick(4, `${url}${routes.SETTINGS.PRIVACY}`) }}
          />
          <BottomNavigationItem
            label="Account"
            icon={<AccountIcon />}
            onClick={() => { this.handleTabClick(5, `${url}${routes.SETTINGS.ACCOUNT}`) }}
          />
        </BottomNavigation>

        <Spacer />

        <div style={styles.settingsBlock}>
          <Switch>
            <Route exact path={`${url}${routes.SETTINGS.GENERAL}`} component={General} />
            <Route exact path={`${url}${routes.SETTINGS.IMAGE}`}   component={ProfileImg} />
            <Route exact path={`${url}${routes.SETTINGS.AVATAR}`}  component={AvatarImg} />
            <Route exact path={`${url}${routes.SETTINGS.VERIFICATION}`} component={VerificationImg} />
            <Route exact path={`${url}${routes.SETTINGS.PRIVACY}`} component={Privacy} />
            <Route exact path={`${url}${routes.SETTINGS.ACCOUNT}`} component={Account} />
            <Route component={General} />
          </Switch>
        </div>

        <Spacer />

      </div>
    )
  }
}

export default withRouter(Settings)
