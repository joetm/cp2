/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
import { List } from 'material-ui/List'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'

import { changeSetting } from '../../actions'
import SettingsSeparator from './SettingsSeparator'
import sharedStyles from './styles'
import Spacer from '../Shared/Spacer'
import CellWrapper from '../Shared/CellWrapper'
import GridWrap from '../Shared/GridWrap'


const _THEMES = {
  DEFAULT: 'default',
  BROWN:   'brown',
  BLACK:   'black',
  RED:     'red',
}

// DEV
const _COLORSFORTHEMES = {
  [_THEMES.DEFAULT]: ['#80F0F0', '#F080F0', '#F0F080', '#FF8080', '#F0F0F0'],
  [_THEMES.BROWN]: ['#F2D580', '#F1B461', '#BD7A56', '#8B523B', '#3E0901'],
  [_THEMES.RED]: ['#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000'],
  [_THEMES.BLACK]: ['#000000', '#000000', '#000000', '#000000', '#000000'],
}


const styles = {
  colorBox: {
    width: '100px',
    height: '100px',
    border: '2px solid white',
    display: 'inline-block',
  },
}


class SiteSettings extends React.Component {
    themeSelector = null
    state = {
      selectedTheme: 'default',
    }
    toggleFullscreenImages = (event, isInputChecked) => {
      this.props.changeSetting('fullscreenImages', isInputChecked)
    }
    /*
     * Handle the change of the color theme.
     */
    changeColorTheme = () => {
      this.props.changeSetting('theme', this.state.selectedTheme)
    }
    handleColorThemeChange = (e, themeName) => {
      this.setState({selectedTheme: themeName})
    }
    render() {
      const { theme } = this.props
      const { selectedTheme } = this.state
      return (
        <div style={{textAlign: 'left'}}>

            <SettingsSeparator first text="Color theme" />

            <GridWrap>

              <CellWrapper full={3} tablet={2} phone={4}>

                <div>
                  <RadioButtonGroup
                    onChange={this.handleColorThemeChange}
                    name="colorTheme"
                    valueSelected={selectedTheme}
                  >
                      <RadioButton
                        value={_THEMES.DEFAULT}
                        label="Default"
                        selected={theme === _THEMES.DEFAULT}
                      />
                      <RadioButton
                        value={_THEMES.RED}
                        label="Red"
                        selected={theme === _THEMES.RED}
                      />
                      <RadioButton
                        value={_THEMES.BROWN}
                        label="Browney"
                        selected={theme === _THEMES.BROWN}
                      />
                      <RadioButton
                        value={_THEMES.BLACK}
                        label="Dark"
                        selected={theme === _THEMES.BLACK}
                      />
                  </RadioButtonGroup>
                </div>

              </CellWrapper>

              <CellWrapper full={9} tablet={6} phone={4}>
                <div style={{textAlign: 'right'}}>
                    <div style={{...styles.colorBox, backgroundColor: _COLORSFORTHEMES[selectedTheme][0]}}></div>
                    <div style={{...styles.colorBox, backgroundColor: _COLORSFORTHEMES[selectedTheme][1]}}></div>
                    <div style={{...styles.colorBox, backgroundColor: _COLORSFORTHEMES[selectedTheme][2]}}></div>
                    <div style={{...styles.colorBox, backgroundColor: _COLORSFORTHEMES[selectedTheme][3]}}></div>
                    <div style={{...styles.colorBox, backgroundColor: _COLORSFORTHEMES[selectedTheme][4]}}></div>
                </div>
              </CellWrapper>

            </GridWrap>

            <p>
              <RaisedButton
                label="Save Theme"
                primary={true}
                onTouchTap={this.changeColorTheme}
              />
            </p>


            <SettingsSeparator text="Site settings" />

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
