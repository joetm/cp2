/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import AutoComplete from 'material-ui/AutoComplete'
import Toggle from 'material-ui/Toggle'
import { List } from 'material-ui/List'

import { changeSetting, fetchCountries, fetchStates, fetchCities } from '../../actions'
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

const ColorThemeSelector = (props) => (
  <div style={{clear: 'both'}}>
    <div style={{...styles.colorBox, backgroundColor: '#FF0000'}}></div>
    <div style={{...styles.colorBox, backgroundColor: '#FFFF00'}}></div>
    <div style={{...styles.colorBox, backgroundColor: '#FF00FF'}}></div>
    <div style={{...styles.colorBox, backgroundColor: '#0000FF'}}></div>
  </div>
)


class GeneralSettings extends React.Component {
    componentDidMount() {
      this.props.fetchCountries()
    }
    /*
     * Handle the change of the country selector.
     */
    handleChangeCountry = () => { // country
      // TODO
      // this.setState({ country })
      console.log('TODO')
    }
    /*
     * Handle the change of the state selector.
     */
    handleChangeState = () => { // event, key, state
      // TODO
      // this.setState({ state })
      console.log('TODO')
    }
    /*
     * Handle the change of the city selector.
     */
    handleChangeCity = () => { // event, key, city
      // TODO
      // this.setState({ city })
      console.log('TODO')
    }
    toggleFullscreenImages = (event, isInputChecked) => {
      this.props.changeSetting('fullscreenImages', isInputChecked)
    }
    /*
     * Handle the change of the birthdate.
     */
    handleChangeBirthdate = (e, date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      this.props.changeSetting('birthday', `${year}-${month}-${day}`)
    }
    render() {
      return (
        <div style={{textAlign: 'left'}} ref={el => { this.pageContent = el }}>

            <SettingsSeparator first text="Personal data" />

            <DatePicker
              floatingLabelText="Birth date"
              hintText="Your birth date"
              openToYearSelection={true}
              autoOk={true}
              onChange={this.handleChangeBirthdate}
            />

            <SettingsSeparator text="Location" />

            <AutoComplete
              floatingLabelText="Country"
              fullWidth={true}
              filter={AutoComplete.caseInsensitiveFilter}
              openOnFocus={false}
              onUpdateInput={this.handleChangeCountry}
              searchText={this.props.country}
              dataSource={this.props.countries}
              dataSourceConfig={{text: 'country', value: 'country'}}
            />

            <div>
                <SelectField
                  floatingLabelText="State"
                  fullWidth={true}
                  value={this.props.state}
                  onChange={this.handleChangeState}
                >
                  <MenuItem value="TODO1" primaryText="TODO1" />
                  <MenuItem value="TODO2" primaryText="TODO2" />
                  <MenuItem value="TODO3" primaryText="TODO3" />
                  <MenuItem value="TODO4" primaryText="TODO4" />
                  <MenuItem value="TODO5" primaryText="TODO5" />
                  <MenuItem value="Berlin" primaryText="Berlin" />
                </SelectField>
            </div>

            <div>
                <SelectField
                  floatingLabelText="City"
                  fullWidth={true}
                  value={this.props.city}
                  onChange={this.handleChangeCity}
                >
                  <MenuItem value="Aachen" primaryText="Aachen" />
                  <MenuItem value="Berlin" primaryText="Berlin" />
                  <MenuItem value="Frankfurt" primaryText="Frankfurt" />
                  <MenuItem value="Hamburg" primaryText="Hamburg" />
                  <MenuItem value="Munich" primaryText="Munich" />
                </SelectField>
            </div>

            <SettingsSeparator text="Site settings" />

            <List>
              <Toggle
                label="Fullscreen images"
                toggled={this.props.fullscreenImages}
                style={sharedStyles.toggle}
                onToggle={this.toggleFullscreenImages}
              />
            </List>

            <SettingsSeparator text="Color theme" />

            <div style={{clear: 'both'}}>
              <ColorThemeSelector />
              <ColorThemeSelector />
              <ColorThemeSelector />
            </div>

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
    // currentUser
    usertitle: state.currentUser.usertitle,
    birthday: state.currentUser.birthday,
    fullscreenImages: state.currentUser.fullscreenImages,
    country: state.currentUser.country,
    state: state.currentUser.state,
    city: state.currentUser.city,
    // general
    countries: state.appState.countries,
    states: state.appState.states,
    cities: state.appState.cities,
})

export default connect(
    mapStateToProps,
    { changeSetting, fetchCountries, fetchStates, fetchCities }
)(GeneralSettings)
