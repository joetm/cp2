/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'

import styles from './styles'
import { fetchCountries, fetchStates, fetchCities } from '../../actions'


class GeneralSettings extends React.Component {
    componentDidMount() {
      this.props.fetchCountries()
    }
    handleChangeCountry = (country) => {
      // TODO
      // this.setState({ country })
    }
    handleChangeState = (event, key, state) => {
      // TODO
      // this.setState({ state })
    }
    handleChangeCity = (event, key, city) => {
      // TODO
      // this.setState({ city })
    }
    render() {
      return (
        <div style={{textAlign: 'left'}}>

            <Subheader inset={false}>General</Subheader>
            <Divider />

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

            <Subheader inset={false}>Location</Subheader>
            <Divider />

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

        </div>
      )
    }
}


const mapStateToProps = (state) => ({
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
