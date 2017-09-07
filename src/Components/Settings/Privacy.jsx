/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import { changeSetting } from '../../actions'
import styles from './styles'

/*
  toggleOnlineVisibility = (event, isInputChecked) => {
    console.log('change online status visibility')
  }
*/

class PrivacySettings extends React.Component {
  toggleLocationVisibility = (event, isInputChecked) => {
    // console.log('change location visibility', isInputChecked)
    this.props.changeSetting('showLocation', isInputChecked)
  }
  toggleBirthdayVisibility = (event, isInputChecked) => {
    // console.log('change birthday visibility', isInputChecked)
    this.props.changeSetting('showBirthday', isInputChecked)
  }
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <Subheader inset={false}>Privacy Settings</Subheader>
        <Divider />
        <List>
          <Toggle
            label="Show your location"
            defaultToggled={true}
            style={styles.toggle}
            onToggle={this.toggleLocationVisibility}
          />
          <Toggle
            label="Show your birthday"
            defaultToggled={false}
            style={styles.toggle}
            onToggle={this.toggleBirthdayVisibility}
          />
          {/*
          <Toggle
            label="Show online status"
            defaultToggled={true}
            style={styles.toggle}
            onToggle={this.toggleOnlineVisibility}
          />
          */}
        </List>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//     threads: state.threads,
// })

export default connect(
    null, // mapStateToProps,
    { changeSetting }
)(PrivacySettings)
