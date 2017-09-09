/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPicture } from '../../actions'
// --
import Spacer from '../Shared/Spacer'
import Update from '../Content/Update'


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
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    image: state.image,
    currentUserId: state.currentUser.id,
    imageid: ownProps.match.params.imageid,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchPicture }
)(Image))
