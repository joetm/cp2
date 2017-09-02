/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchVideos } from '../../actions'
import StreamTpl from './StreamTpl'


class Videos extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        const { videos } = this.props
        return (
            <StreamTpl
                action={this.props.fetchVideos}
                headline="Videos"
                content={videos}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    videos: state.videos
})

export default connect(
    mapStateToProps,
    { fetchVideos }
)(Videos)
