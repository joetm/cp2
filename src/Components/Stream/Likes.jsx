/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchLikes } from '../../actions'
import StreamTpl from './StreamTpl'


class Likes extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        const { likes } = this.props
        return (
            <StreamTpl
                action={this.props.fetchLikes}
                headline="Likes"
                content={likes}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    likes: state.likes
})

export default connect(
    mapStateToProps,
    { fetchLikes }
)(Likes)
