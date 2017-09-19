/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
import { List } from 'material-ui/List'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import { changeSetting } from '../../actions'
import SettingsSeparator from './SettingsSeparator'
import sharedStyles from './styles'
import Spacer from '../Shared/Spacer'


const styles = {
  colorBox: {
    width: '100px',
    height: '100px',
    border: '2px solid white',
    float: 'left',
  },
}


class SiteSettings extends React.Component {
    state = {
      selectedTheme: 'default',
    }
    toggleFullscreenImages = (event, isInputChecked) => {
      this.props.changeSetting('fullscreenImages', isInputChecked)
    }
    /*
     * Handle the change of the color theme.
     */
    changeColorTheme = (e, themeName) => {
      this.props.changeSetting('theme', themeName)
    }
    render() {
      return (
        <div style={{textAlign: 'left'}}>

            <SettingsSeparator first text="Color theme" />

            <div style={{margin: '1em 0'}}>
              <RadioButtonGroup
                onChange={this.changeColorTheme}
                name="colorTheme"
                defaultSelected={this.props.theme}
              >
                  <RadioButton
                    value="default"
                    label="Default"
                    selected={this.props.theme === 'default'}
                  />
                  <RadioButton
                    value="red"
                    label="Red"
                    selected={this.props.theme === 'red'}
                  />
                  <RadioButton
                    value="brown"
                    label="Browney"
                    selected={this.props.theme === 'brown'}
                  />
                  <RadioButton
                    value="dark"
                    label="Dark"
                    selected={this.props.theme === 'dark'}
                  />
              </RadioButtonGroup>
            </div>

            <div style={{clear: 'both'}}>
                <div style={{clear: 'both'}}>
                    <div style={{...styles.colorBox, backgroundColor: '#F2D580'}}></div>
                    <div style={{...styles.colorBox, backgroundColor: '#F1B461'}}></div>
                    <div style={{...styles.colorBox, backgroundColor: '#BD7A56'}}></div>
                    <div style={{...styles.colorBox, backgroundColor: '#8B523B'}}></div>
                    <div style={{...styles.colorBox, backgroundColor: '#3E0901'}}></div>
                </div>
            </div>

            <SettingsSeparator style={{clear: 'both'}} text="Site settings" />

            <List>
              <Toggle
                label="Fullscreen images"
                toggled={this.props.fullscreenImages}
                style={sharedStyles.toggle}
                onToggle={this.toggleFullscreenImages}
              />
            </List>

            <Spacer />
            <Spacer />
            <Spacer />

{/*
            <Alert
                open={this.state.alertIsOpen}
                close={this.closeAlert}
                msg="Saved."
            />
*/}

        </div>
      )
    }
}


const mapStateToProps = (state) => ({
    fullscreenImages: state.currentUser.fullscreenImages,
    theme: state.currentUser.theme,
})

export default connect(
    mapStateToProps,
    { changeSetting }
)(SiteSettings)
