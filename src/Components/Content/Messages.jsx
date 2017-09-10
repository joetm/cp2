/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchMessages } from '../../actions'
import StreamTpl from './StreamTpl'
import { LISTED } from '../../viewModes'


const Messages = (props) => (
    <StreamTpl
        action={props.fetchMessages}
        isEmbedded={props.isEmbedded}
        viewMode={LISTED}
        headline="Private Messages"
        isFetching={props.isFetching}
        content={props.messages}
    />
)

const mapStateToProps = (state) => ({
    isFetching: state.messages.isFetching,
    messages: state.messages.items,
})

export default connect(
    mapStateToProps,
    { fetchMessages }
)(Messages)
