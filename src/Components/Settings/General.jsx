/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import AutoComplete from 'material-ui/AutoComplete'

import { changeSetting, fetchCountries, fetchStates, fetchCities } from '../../actions'
import SettingsSeparator from './SettingsSeparator'
import Alert from '../Shared/Alert'


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
    /*
     * Handle the change of the user title field.
     */
    handleChangeUsertitle = (e) => {
        console.log('change user title', e.target.value)
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
        <div style={{textAlign: 'left'}} ref="pageContent">

            <SettingsSeparator text="Personal data" />

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

            <SettingsSeparator text="Other" />

            <TextField
              floatingLabelText="Custom User Title"
              fullWidth={true}
              onBlur={this.handleChangeUsertitle}
            />

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
