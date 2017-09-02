/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchNotifications } from '../../actions'
import StreamTpl from './StreamTpl'


class Notifications extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        return (
            <StreamTpl
                action={this.props.fetchNotifications}
                headline="Notifications"
                content={this.props.notifications}
            />
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
