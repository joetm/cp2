/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ExpandFiltersIcon from 'material-ui/svg-icons/navigation/expand-more'
import ImplodeFiltersIcon from 'material-ui/svg-icons/navigation/expand-less'

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
    state = {
      filtersOpen: false,
    }
    componentDidMount() {
      this.props.fetchUsers()
    }
    refreshUsers = (filters) => {
      // TODO
      console.log('filters', filters)
      this.props.fetchUsers(filters)
    }
    toggleFilters = () => {
      this.setState({ filtersOpen: !this.state.filtersOpen })
    }
    /**
     * Render the component.
     */
    render () {
          const { users } = this.props
          const usersList = []
          for (let userid in users) {
            if (users.hasOwnProperty(userid)) {
              usersList.push(users[userid])
            }
          }
          return (
            <div>

              <Toolbar>
                  <ToolbarGroup firstChild={true}>
                  </ToolbarGroup>
                  <ToolbarGroup>
                      {
                        this.state.filtersOpen ?
                          <IconButton onTouchTap={this.toggleFilters}>
                            <ImplodeFiltersIcon />
                          </IconButton>
                        :
                          <IconButton onTouchTap={this.toggleFilters}>
                            <ExpandFiltersIcon />
                          </IconButton>
                      }
                  </ToolbarGroup>
              </Toolbar>


              <h2>Users</h2>
              <Divider />

              {
                this.state.filtersOpen &&
                <Filters
                  refreshUsers={this.refreshUsers}
                />
              }

              <Divider />

              <List>
                {
                  usersList.map((user) => (
                    <User
                      key={`usr_${user.id}`}
                      {...user}
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

const mapStateToProps = (state) => ({
    users: state.users,
    countries: state.appState.countries,
})

export default connect(
    mapStateToProps,
    { fetchUsers }
)(Users)
