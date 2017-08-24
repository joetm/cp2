/** @flow */

import React from 'react'

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

                <VideoPlayer />

                <Spacer />

            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
//     image: state.image,
//     isFetching: state.appState.isFetching,
// })

// export default connect(
//     mapStateToProps,
//     { fetchReviewItem, reviewApprove, reviewDisapprove, approve, reject, like, dislike, setFetchingStatus }
// )(Review)

export default Video
