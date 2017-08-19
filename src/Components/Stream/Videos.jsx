/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchVideos } from '../../reducers'
import { humanRelativeDate, translateDayOffset, categorizeList } from '../../common/helpers'
import StreamTpl from './StreamTpl'


class Videos extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        const categorizedUpdates = categorizeList(this.props.videos)
        return (
            <StreamTpl
                action={this.props.fetchVideos}
                headline="Videos"
                content={this.props.videos}
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
