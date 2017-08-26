/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import '@material/layout-grid/dist/mdc.layout-grid.css'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'

import { fetchCountries } from '../../actions'


const _CELLSPANS = {
  full: 3,
  tablet: 4,
  phone: 2,
}


/**
 * Filters class
 * @class
 */
class Filters extends React.PureComponent {
    state = {
      statii: [],
      country: "Germany",
      state: null,
      city: null,
    }
    filterVerified() {
      // TODO
    }
    handleStatusChange = (event, index, statii) => {
      console.log('statii', statii)
      this.setState({ statii })
    }
    handleCountryChange = (event, index, country) => {
      this.setState({ country })
      this.props.refreshUsers()
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
                    <div style={{position: 'relative'}} className={`mdc-layout-grid__cell
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
                            value={1}
                            insetChildren={true}
                            checked={this.state.statii.indexOf(1) > -1}
                            primaryText="Online"
                          />
                          <MenuItem
                            key="offline"
                            value={2}
                            insetChildren={true}
                            checked={this.state.statii.indexOf(2) > -1}
                            primaryText="Offline"
                          />
                          <MenuItem
                            key="unknown"
                            value={3}
                            insetChildren={true}
                            checked={this.state.statii.indexOf(3) > -1}
                            primaryText="Unknown"
                          />
                        </SelectField>
                    </div>
                    <div style={{position: 'relative'}} className={`mdc-layout-grid__cell
                        mdc-layout-grid__cell--span-${_CELLSPANS.full}
                        mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
                        mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
                    >
                      <TextField
                          hintText="Username"
                      />
                    </div>
                    <div style={{position: 'relative'}} className={`mdc-layout-grid__cell
                        mdc-layout-grid__cell--span-${_CELLSPANS.full}
                        mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
                        mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
                    >
                        <SelectField
                          floatingLabelText="Registration"
                        >
                          <MenuItem value={2} primaryText="One week ago" />
                          <MenuItem value={3} primaryText="One month ago" />
                          <MenuItem value={3} primaryText="Over one year ago" />
                        </SelectField>
                    </div>
                    <div style={{position: 'relative'}} className={`mdc-layout-grid__cell
                        mdc-layout-grid__cell--span-${_CELLSPANS.full}
                        mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
                        mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
                    >
                      <Checkbox
                        label="Only Verified Users"
                        onCheck={this.filterVerified}
                      />
                    </div>

                    <div style={{position: 'relative'}} className={`mdc-layout-grid__cell
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
                    <div style={{position: 'relative'}} className={`mdc-layout-grid__cell
                        mdc-layout-grid__cell--span-${_CELLSPANS.full}
                        mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
                        mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
                    >
                        <SelectField
                          floatingLabelText="State"
                          disabled={true}
                        >
                          <MenuItem value={1} primaryText="United States" />
                          <MenuItem value={2} primaryText="United Kingdom" />
                          <MenuItem value={3} primaryText="Germany" />
                        </SelectField>
                    </div>
                    <div style={{position: 'relative'}} className={`mdc-layout-grid__cell
                        mdc-layout-grid__cell--span-${_CELLSPANS.full}
                        mdc-layout-grid__cell--span-${_CELLSPANS.tablet}-tablet
                        mdc-layout-grid__cell--span-${_CELLSPANS.phone}-phone`}
                    >
                        <SelectField
                          floatingLabelText="City"
                          disabled={true}
                        >
                          <MenuItem value={1} primaryText="United States" />
                          <MenuItem value={2} primaryText="United Kingdom" />
                          <MenuItem value={3} primaryText="Germany" />
                        </SelectField>
                    </div>
                    <div style={{position: 'relative'}} className={`mdc-layout-grid__cell
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
})

export default connect(
    mapStateToProps,
    { fetchCountries }
)(Filters)
