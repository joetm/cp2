/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchVideo } from '../../actions'
import Spacer from '../Shared/Spacer'
import VideoPlayer from './VideoPlayer'


class Video extends React.Component {
    componentDidMount() {
        const videoid = this.props.match.params.videoid
        this.props.fetchVideo(videoid)
    }
    /**
     * Render the component.
     */
    render() {
        const { title, src, thumb } = this.props.video
        return (
            <div>
                <h2>{title}</h2>

                <VideoPlayer
                    src={src}
                    thumb={thumb}
                />

                <Spacer />

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    video: state.video,
    isFetching: state.appState.isFetching,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchVideo }
)(Video))
