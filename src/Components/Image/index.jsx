/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPicture } from '../../actions'
// --
import Spacer from '../Shared/Spacer'
import FullscreenImage from './FullscreenImage'


class Image extends React.Component {
    componentDidMount() {
        this.props.fetchPicture(this.props.imageid)
    }
    /**
     * Render the component.
     */
    render() {
        const { title } = this.props.image
        return (
            <div>
                <h2>{title}</h2>
                <FullscreenImage
                    {...this.props.image}
                />
                <Spacer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentUserId: state.currentUser.id,
    image: state.image,
    imageid: ownProps.match.params.imageid,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchPicture }
)(Image))
