/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPicture } from '../../actions'
// --
import Spacer from '../Shared/Spacer'
import FullscreenImage from './FullscreenImage'
import Update from '../Content/Update'
import Headline from '../Shared/Headline'


class Image extends React.Component {
    componentDidMount() {
        this.props.fetchPicture(this.props.imageid)
    }
    /**
     * Render the component.
     */
    render() {
        const { title } = this.props.image
        const { fullscreenImages } = this.props
        return (
            <div>
                {
                    !fullscreenImages ?
                    <div>
                        <Headline>{title}</Headline>
                        <Update
                            {...this.props.image}
                            showTitle={false}
                            clickable={false}
                            gridColumnsFull={1}
                            gridColumnsTablet={1}
                            gridColumnsPhone={1}
                        />
                        <Spacer />
                    </div>
                    :
                    <FullscreenImage
                        {...this.props.image}
                    />
                }
                <Spacer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentUserId: state.currentUser.id,
    fullscreenImages: state.currentUser.fullscreenImages,
    image: state.image,
    imageid: ownProps.match.params.imageid,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchPicture }
)(Image))
