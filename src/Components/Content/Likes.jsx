/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchLikes } from '../../actions'
import StreamTpl from './StreamTpl'
import { LISTED } from '../../viewModes'


class Likes extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        return (
            <StreamTpl
                action={this.props.fetchLikes}
                viewMode={LISTED}
                headline="Likes"
                content={this.props.likes}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.likes.isFetching,
    likes: state.likes.items,
})

export default connect(
    mapStateToProps,
    { fetchLikes }
)(Likes)
