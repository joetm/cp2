/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import '@material/layout-grid/dist/mdc.layout-grid.css'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'

import { fetchCountries, fetchStates, fetchCities } from '../../actions'


const _CELLSPANS = {
  full: 3,
  tablet: 4,
  phone: 2,
}


/**
 * Filters class
 * @class
 */
class Filters extends React.Component {
  state = {
    verified: false,
    statii: [],
    country: null,
    state: null,
    city: null,
  }
  handleVerifiedChange = (event, verified) => {
    this.setState({ verified })
    this.props.refreshUsers({
      verified
    })
  }
  handleStatusChange = (event, index, status) => {
    console.log('status', status)
    this.setState({ status })
    this.props.refreshUsers({
      status
    })
  }
  handleCountryChange = (event, index, country) => {
    this.setState({ country })
    this.props.refreshUsers({
      country
    })
    // TODO
    this.props.fetchStates()
    this.props.fetchCities()
  }
  handleStateChange = (event, index, state) => {
    this.setState({ state })
    this.props.refreshUsers({
      state
    })
  }
  handleCityChange = (event, index, city) => {
    this.setState({ city })
    this.props.refreshUsers({
      city
    })
  }
  componentDidMount() {
    this.props.fetchCountries()
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
          <div
            style={{position: 'relative'}}
            className={`mdc-layout-grid__cell
            mdc-layout-grid__cell--span-${_CELLSPANS.full}
            mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
            mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
          >
            <SelectField
              floatingLabelText="Online Status"
              multiple={true}
              hintText="Select a name"
              onChange={this.handleStatusChange}
            >
              <MenuItem
                key="online"
                value="online"
                insetChildren={true}
                checked={this.state.statii.indexOf("online") > -1}
                primaryText="Online"
              />
              <MenuItem
                key="offline"
                value="offline"
                insetChildren={true}
                checked={this.state.statii.indexOf("offline") > -1}
                primaryText="Offline"
              />
              <MenuItem
                key="unknown"
                value={"unknown"}
                insetChildren={true}
                checked={this.state.statii.indexOf("unknown") > -1}
                primaryText="Unknown"
              />
            </SelectField>
          </div>
          <div
            style={{position: 'relative'}}
            className={`mdc-layout-grid__cell
            mdc-layout-grid__cell--span-${_CELLSPANS.full}
            mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
            mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
          >
            <TextField
              hintText="Username"
            />
          </div>
          <div
            style={{position: 'relative'}}
            className={`mdc-layout-grid__cell
            mdc-layout-grid__cell--span-${_CELLSPANS.full}
            mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
            mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
          >
            <SelectField floatingLabelText="Registration">
              <MenuItem value={2} primaryText="One week ago" />
              <MenuItem value={3} primaryText="One month ago" />
              <MenuItem value={3} primaryText="Over one year ago" />
            </SelectField>
          </div>
          <div
            style={{position: 'relative'}}
            className={`mdc-layout-grid__cell
            mdc-layout-grid__cell--span-${_CELLSPANS.full}
            mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
            mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
          >
            <Checkbox
              label="Only Verified Users"
              value={true}
              checked={this.state.verified}
              onCheck={this.handleVerifiedChange}
            />
          </div>

          <div
              style={{position: 'relative'}}
              className={`mdc-layout-grid__cell
              mdc-layout-grid__cell--span-${_CELLSPANS.full}
              mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
              mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
          >
            <SelectField
              floatingLabelText="Country"
              value={this.state.country}
              onChange={this.handleCountryChange}
            >
              {
                this.props.countries.map(country => (
                  <MenuItem
                    value={country.iso}
                    primaryText={country.country}
                  />
                ))
              }
            </SelectField>
          </div>
          <div
            style={{position: 'relative'}}
            className={`mdc-layout-grid__cell
            mdc-layout-grid__cell--span-${_CELLSPANS.full}
            mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
            mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
          >
            <SelectField
              floatingLabelText="State"
              disabled={!this.state.country}
              onChange={this.handleStatusChange}
            >
              {
                this.props.states.map(state => (
                  <MenuItem
                    value={state}
                    primaryText={state}
                  />
                ))
              }
            </SelectField>
          </div>
          <div
              style={{position: 'relative'}}
              className={`mdc-layout-grid__cell
              mdc-layout-grid__cell--span-${_CELLSPANS.full}
              mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
              mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
          >
            <SelectField
              floatingLabelText="City"
              disabled={!this.state.country}
              onChange={this.handleCityChange}
            >
              {
                this.props.cities.map(city => (
                  <MenuItem
                    value={city}
                    primaryText={city}
                  />
                ))
              }
            </SelectField>
          </div>
          <div
            style={{position: 'relative'}}
            className={`mdc-layout-grid__cell
            mdc-layout-grid__cell--span-${_CELLSPANS.full}
            mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
            mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
          >
            <Checkbox
              label="Public Birthday"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  countries: state.appState.countries,
  states: state.appState.states,
  cities: state.appState.cities,
})

export default connect(
  mapStateToProps,
  { fetchCountries, fetchStates, fetchCities }
)(Filters)
