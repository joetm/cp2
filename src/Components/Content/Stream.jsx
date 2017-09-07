/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchUpdates } from '../../actions'
import StreamTpl from './StreamTpl'


class Stream extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        const { updates } = this.props
        return (
            <StreamTpl
                action={this.props.fetchUpdates}
                headline="Updates"
                content={updates}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.updates.isFetching,
    updates: state.updates.items
})

export default connect(
    mapStateToProps,
    { fetchUpdates }
)(Stream)
