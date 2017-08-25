/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchAll } from '../../actions'
import { humanRelativeDate, translateDayOffset, categorizeList } from '../../common/helpers'
import StreamTpl from './StreamTpl'
import Loader from '../Shared/Loader'


class Updates extends React.PureComponent {
    state = {
        loaded: false,
    }
    /**
     * Render the component.
     */
    render() {
        const { updates } = this.props
        return (
            <div>
                <StreamTpl
                    action={this.props.fetchAll}
                    headline="Updates"
                    content={updates}
                />
                {
                    !updates.length && <Loader />
                }
            </div>
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
