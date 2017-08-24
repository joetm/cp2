/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchAll } from '../../actions'
import { humanRelativeDate, translateDayOffset, categorizeList } from '../../common/helpers'
import StreamTpl from './StreamTpl'


class Updates extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        return (
            <StreamTpl
                action={this.props.fetchAll}
                headline="Updates"
                content={this.props.updates}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    updates: state.all
})

export default connect(
    mapStateToProps,
    { fetchAll }
)(Updates)
