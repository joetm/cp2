/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
import { List } from 'material-ui/List'

import { changeSetting } from '../../actions'
import { toggle as toggleStyle } from './styles'
import SettingsSeparator from './SettingsSeparator'
import Spacer from '../Shared/Spacer'


class PrivacySettings extends React.Component {
  toggleLocationVisibility = (event, isInputChecked) => {
    // console.log('change location visibility', isInputChecked)
    this.props.changeSetting('showLocation', isInputChecked)
  }
  toggleBirthdayVisibility = (event, isInputChecked) => {
    // console.log('change birthday visibility', isInputChecked)
    this.props.changeSetting('showBirthday', isInputChecked)
  }
  toggleOnlineVisibility = (event, isInputChecked) => {
    // console.log('change online status visibility', isInputChecked)
    this.props.changeSetting('showOnlineStatus', isInputChecked)
  }
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <SettingsSeparator first text="Privacy Settings" />
        <List>
          <Toggle
            label="Show your location"
            toggled={this.props.showLocation}
            style={toggleStyle}
            onToggle={this.toggleLocationVisibility}
          />
          <Toggle
            label="Show your birthday"
            toggled={this.props.showBirthday}
            style={toggleStyle}
            onToggle={this.toggleBirthdayVisibility}
          />
          <Toggle
            label="Show online status"
            toggled={this.props.showOnlineStatus}
            style={toggleStyle}
            onToggle={this.toggleOnlineVisibility}
          />
        </List>

        <Spacer />

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  showBirthday: state.currentUser.showBirthday,
  showLocation: state.currentUser.showLocation,
  showOnlineStatus: state.currentUser.showOnlineStatus,
})

export default connect(
  mapStateToProps,
  { changeSetting }
)(PrivacySettings)
