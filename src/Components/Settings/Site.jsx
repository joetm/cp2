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

import { THEME_NAMES, getBaseTheme } from '../../common/theme'


const getThemeColors = (themeName) => {
  const theTheme = getBaseTheme(themeName)
  return [
    { name: 'primary1Color', color: theTheme.palette.primary1Color },
    { name: 'primary2Color', color: theTheme.palette.primary2Color },
    { name: 'primary3Color', color: theTheme.palette.primary3Color },
    { name: 'accent1Color',  color: theTheme.palette.accent1Color },
    { name: 'accent2Color',  color: theTheme.palette.accent2Color },
    { name: 'canvasColor',   color: theTheme.palette.canvasColor },
  ]
}

const styles = {
  colorBoxContainer: {
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '0.6em',
    fontWeight: 400,
  },
  colorBox: {
    width: '70px',
    height: '70px',
    border: '2px solid white',
    border: '1px solid #505050',
  },
}


const buildThemeButtons = (theme, selectedTheme) => {
  const buttons = []
  for (let key in THEME_NAMES) {
    if (Object.prototype.hasOwnProperty.call(THEME_NAMES, key)) {
      buttons.push(
        <RadioButton
          value={THEME_NAMES[key].name}
          label={THEME_NAMES[key].label}
          selected={selectedTheme === THEME_NAMES[key].name}
        />
      )
    }
  }
  return buttons
}


class SiteSettings extends React.Component {
    themeSelector = null
    state = {
      selectedTheme: THEME_NAMES.DEFAULT.name,
    }
    /*
     * Handle the change of the fullscreen setting.
     */
    toggleFullscreenImages = (event, isInputChecked) => {
      this.props.changeSetting('fullscreenImages', isInputChecked)
    }
    /*
     * Change the color theme.
     */
    changeColorTheme = () => {
      this.props.changeSetting('theme', this.state.selectedTheme)
    }
    /*
     * Handle the change of the color theme.
     */
    handleColorThemeChange = (e, themeName) => {
      this.setState({selectedTheme: themeName})
    }
    /*
     * Render the component.
     */
    render() {
      const { theme } = this.props
      const { selectedTheme } = this.state
      return (
        <div style={{textAlign: 'left'}}>

            <SettingsSeparator first text="Color theme" />

            <GridWrap>

              <CellWrapper full={4} tablet={3} phone={4}>

                <div>
                  <RadioButtonGroup
                    onChange={this.handleColorThemeChange}
                    name="colorTheme"
                    valueSelected={selectedTheme}
                  >
                      {
                        buildThemeButtons(theme, selectedTheme)
                      }
                  </RadioButtonGroup>
                </div>

              </CellWrapper>

              <CellWrapper full={8} tablet={5} phone={4}>
                <div style={{textAlign: 'right'}}>
                    {
                        getThemeColors(selectedTheme).map((colorObj, index) => (
                          <div style={styles.colorBoxContainer}>
                            <div
                              key={`color_${index}`}
                              style={{
                                ...styles.colorBox,
                                backgroundColor: colorObj.color
                              }}
                            ></div>
                              {colorObj.name}
                          </div>
                        ))
                    }
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
