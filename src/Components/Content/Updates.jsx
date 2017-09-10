/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchUpdates } from '../../actions'
import StreamTpl from './StreamTpl'


const Updates = (props) => (
    <StreamTpl
        action={props.fetchUpdates}
        isEmbedded={props.isEmbedded}
        headline="Updates"
        isFetching={props.isFetching}
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
)(Updates)
