/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchVideos, markRead } from '../../actions'
import { humanRelativeDate, translateDayOffset, categorizeList } from '../../common/helpers'
import StreamTpl from './StreamTpl'
import Loader from '../Shared/Loader'


class Videos extends React.PureComponent {
    componentDidMount() {
        // TODO
        // markRead('videos')
    }
    /**
     * Render the component.
     */
    render() {
        const { videos } = this.props
        const categorizedUpdates = categorizeList(videos)
        return (
            <div>
                <StreamTpl
                    action={this.props.fetchVideos}
                    headline="Videos"
                    content={videos}
                />
                {
                    !videos.length && <Loader />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    videos: state.videos
})

export default connect(
    mapStateToProps,
    { fetchVideos, markRead }
)(Videos)
