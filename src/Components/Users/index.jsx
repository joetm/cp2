/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import '@material/layout-grid/dist/mdc.layout-grid.css'

import { fetchUsers } from '../../actions'
import Spacer from '../Shared/Spacer'
import Loader from '../Shared/Loader'
import Pagination from '../Shared/Pagination'
import User from './User'


const _CELLSPANS = {
  full: 3,
  tablet: 4,
  phone: 2,
}

/**
 * Users class
 * @class
 */
class Users extends React.PureComponent {
    state = {
      statii: [],
    }
    componentDidMount() {
      this.props.fetchUsers()
    }
    filterVerified() {
      // TODO
    }
    handleStatusChange = (event, index, statii) => {
      console.log('statii', statii)
      this.setState({statii})
    }
    /**
     * Render the component.
     */
    render () {
          const { users } = this.props
          let usersList = []
          for (let userid in users) {
            if (users.hasOwnProperty(userid)) {
              usersList.push(users[userid])
            }
          }
          return (
            <div>
              <h2>Users</h2>
              <Divider />
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
                        <SelectField
                          floatingLabelText="Location"
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
                </div>
              </div>
              <Divider />
              <List>
                {
                  usersList.map((user) => (
                    <User
                      key={`usr_${user.userid}`}
                      username={user.username}
                      userid={user.userid}
                      avatar={user.avatar}
                      status={user.status}
                      verified={user.verified}
                      country={user.country}
                      country={user.country}
                      state={user.state}
                      city={user.city}
                    />
                  ))
                }
              </List>
              {
                !usersList.length &&
                <Loader />
              }
              {
                usersList.length > 0 &&
                <Pagination />
              }
              <Spacer />
            </div>
          )
    }
}

const mapStateToProps = (state, ownProps) => ({
    users: state.users,
})

export default connect(
    mapStateToProps,
    { fetchUsers }
)(Users)
