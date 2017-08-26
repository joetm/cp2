/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
// import Subheader from 'material-ui/Subheader'
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import { fetchUsers } from '../../actions'
import Spacer from '../Shared/Spacer'
import Loader from '../Shared/Loader'
import User from './User'


/**
 * Users class
 * @class
 */
class Users extends React.PureComponent {
    componentDidMount() {
      this.props.fetchUsers()
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
