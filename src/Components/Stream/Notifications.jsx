/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import {List} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import { fetchNotifications } from '../../reducers'
import Notification from './Notification'
import Spacer from '../Shared/Spacer'


class Notifications extends React.PureComponent {
    componentDidMount() {
        this.props.fetchNotifications()
    }
    /**
     * Render the component.
     */
    render() {
        const { notifications } = this.props
        return (
          <div>
            <h2>Notifications</h2>
            <List>
              <Subheader>Today</Subheader>
              {
                this.props.notifications.map((n) => (
                  <Notification
                    key={n.id}
                    avatar={<Avatar src={n.avatar} />}
                    username={n.username}
                    userid={n.userid}
                    primaryText={n.title}
                    secondaryText={n.content}
                    secondaryTextLines={2}
                    showMenu={true}
                  />
                ))
              }
            </List>
            <Spacer />
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    notifications: state.notifications
})

export default connect(
    mapStateToProps,
    { fetchNotifications }
)(Notifications)
