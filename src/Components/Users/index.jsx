/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'

import { fetchUsers } from '../../actions'
import Spacer from '../Shared/Spacer'
import Loader from '../Shared/Loader'
import Pagination from '../Shared/Pagination'
import User from './User'
import Filters from './Filters'


/**
 * Users class
 * @class
 */
class Users extends React.PureComponent {
    componentDidMount() {
      this.props.fetchUsers()
    }
    refreshUsers = (filters) => {
      // TODO
      console.log('filters', filters)
      this.props.fetchUsers(filters)
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

              <Filters
                refreshUsers={this.refreshUsers}
              />

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
    countries: state.appState.countries,
})

export default connect(
    mapStateToProps,
    { fetchUsers }
)(Users)
