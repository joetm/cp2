/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import { fetchNotifications } from '../../reducers'
import { categorizeList, humanRelativeDate, translateDayOffset } from '../../common/helpers'
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
        const categorizedNotifications = categorizeList(notifications)
        return (
          <div>
            <h2>Notifications</h2>
                {
                    categorizedNotifications.map((group, daysAgo) => {
                        return (
                            <div key={`grp_${daysAgo}`}>
                                <Subheader>{translateDayOffset(daysAgo)}</Subheader>
                                <Divider />
                                    <List>
                                    {
                                        group.map((item, i) => (
                                            <Notification
                                              key={item.id}
                                              avatar={<Avatar src={item.avatar} />}
                                              username={item.username}
                                              userid={item.userid}
                                              primaryText={item.title}
                                              secondaryText={item.content}
                                              secondaryTextLines={2}
                                              showMenu={true}
                                            />
                                        ))
                                    }
                                    </List>
                            </div>
                        )
                    })
                }
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
