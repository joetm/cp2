/** @flow */

import React from 'react'

import { colors } from '../../common/theme'
import Spacer from '../Shared/Spacer'


const styles = {
}

class Image extends React.PureComponent {
    /**
     * Render the component.
     */
    render() {
        return (
            <div>
                <h2>IMAGE TITLE</h2>

                <img src="http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg" alt="" />

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

export default Image
