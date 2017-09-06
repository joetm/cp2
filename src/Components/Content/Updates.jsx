/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchUpdates } from '../../actions'
import StreamTpl from './StreamTpl'


class Updates extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        return (
            <StreamTpl
                action={this.props.fetchUpdates}
                headline="Updates"
                content={this.props.updates}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    updates: state.updates.items
})

export default connect(
    mapStateToProps,
    { fetchUpdates }
)(Updates)
