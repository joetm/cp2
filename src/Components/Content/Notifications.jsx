/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchNotifications } from '../../actions'
import StreamTpl from './StreamTpl'
import { LISTED } from '../../viewModes'


const Notifications = (props) => (
    <StreamTpl
        action={props.fetchNotifications}
        viewMode={LISTED}
        headline="Notifications"
        isFetching={props.isFetching}
        content={props.notifications}
    />
)

const mapStateToProps = (state) => ({
    isFetching: state.notifications.isFetching,
    notifications: state.notifications.items,
})

export default connect(
    mapStateToProps,
    { fetchNotifications }
)(Notifications)
