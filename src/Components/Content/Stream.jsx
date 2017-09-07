/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchUpdates } from '../../actions'
import StreamTpl from './StreamTpl'


const Stream = (props) => (
    <StreamTpl
        action={props.fetchUpdates}
        headline="Updates"
        content={props.updates}
    />
)


const mapStateToProps = (state) => ({
    isFetching: state.updates.isFetching,
    updates: state.updates.items,
})

export default connect(
    mapStateToProps,
    { fetchUpdates }
)(Stream)
