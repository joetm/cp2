/** @flow */

import React from 'react'
import ReactPlayer from 'react-player'

import { colors } from '../../common/theme'
import Spacer from '../Shared/Spacer'
import VideoPlayer from './VideoPlayer'


const styles = {
}

class Video extends React.Component {
    constructor(props) {
        super(props)
        // state
        this.state = {
        }
        // bindings
    }
    componentDidMount() {
    }
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
