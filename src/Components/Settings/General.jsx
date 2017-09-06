/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
import { List } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'

import styles from './styles'
import { fetchCountries, fetchStates, fetchCities } from '../../actions'
import SettingsSeparator from './SettingsSeparator'
import Alert from '../Shared/Alert'


class GeneralSettings extends React.Component {
    state = {
      alertIsOpen: false,
    }
    componentDidMount() {
      this.props.fetchCountries()
    }
    /*
     * Open the snack bar alert.
     */
    openAlert = () => {
        this.setState({alertIsOpen: true})
    }
    /*
     * Close the snack bar alert.
     */
    closeAlert = () => {
        this.setState({alertIsOpen: false})
    }
    /*
     * Handle the change of the country selector.
     */
    handleChangeCountry = (country) => {
      // TODO
      // this.setState({ country })
    }
    /*
     * Handle the change of the state selector.
     */
    handleChangeState = (event, key, state) => {
      // TODO
      // this.setState({ state })
    }
    /*
     * Handle the change of the city selector.
     */
    handleChangeCity = (event, key, city) => {
      // TODO
      // this.setState({ city })
    }
    /*
     * Handle the change of the user title field.
     */
    handleChangeUsertitle = (e) => {
        console.log('change user title', e.target.value)
        this.openAlert()
    }
    render() {
      return (
        <div style={{textAlign: 'left'}}>

            <SettingsSeparator text="General" />

            <List>
              <Toggle
                label="Simple"
                style={styles.toggle}
              />
              <Toggle
                label="Toggled by default"
                defaultToggled={true}
                style={styles.toggle}
              />
              <Toggle
                label="Simple"
                style={styles.toggle}
              />
              <Toggle
                label="Toggled by default"
                defaultToggled={true}
                style={styles.toggle}
              />
            </List>

            <SettingsSeparator text="Location" />

            <div>
                <AutoComplete
                  floatingLabelText="Country"
                  fullWidth={true}
                  filter={AutoComplete.caseInsensitiveFilter}
                  openOnFocus={false}
                  onUpdateInput={this.handleChangeCountry}
                  searchText={this.props.country}
                  dataSource={this.props.countries}
                  dataSourceConfig={{ text: 'country', value: 'country' }}
                />
            </div>

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

            <div>
              <TextField
                floatingLabelText="Custom User Title"
                fullWidth={true}
                onBlur={this.handleChangeUsertitle}
              />
            </div>

            <Alert
                open={this.state.alertIsOpen}
                close={this.closeAlert}
                msg="Saved."
            />

        </div>
      )
    }
}


const mapStateToProps = (state) => ({
    usertitle: state.currentUser.usertitle,
    country: state.currentUser.country,
    state: state.currentUser.state,
    city: state.currentUser.city,
    countries: state.appState.countries,
    states: state.appState.states,
    cities: state.appState.cities,
})

export default connect(
    mapStateToProps,
    { fetchCountries, fetchStates, fetchCities }
)(GeneralSettings)
