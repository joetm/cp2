/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import Spacer from '../Shared/Spacer'
import VideoPlayer from './VideoPlayer'


class Video extends React.Component {
    /**
     * Render the component.
     */
    render() {
        return (
            <div>
                <h2>Video TITLE</h2>

                <VideoPlayer
                    src={"https://www.youtube.com/watch?v=oUFJJNQGwhk"}
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

export default connect(
    mapStateToProps,
    // { fetchVideo }
)(Video)
