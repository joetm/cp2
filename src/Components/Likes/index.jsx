/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'

import { fetchLikesForVideo } from '../../actions'
import Avatar from '../Shared/Avatar'
import Spacer from '../Shared/Spacer'
import Loader from '../Shared/Loader'


/**
 * Likes component
 * @class
 */
class Likes extends React.Component {
    componentWillMount() {
        this.props.fetchLikesForVideo(this.props.itemid)
    }
    render() {
        return (
            <div>

              <Spacer />
              <Spacer />

              <Loader isLoading={this.props.isFetching} />

              <h4 style={{textAlign: 'left', marginBottom: '1em', paddingBottom: 0}}>Likes</h4>

              <Divider style={{marginBottom: '1em'}} />

                <Avatar src="/uploads/avatar/face-13.jpg" micro={true} />

                <Avatar src="/uploads/avatar/face-13.jpg" micro={true} />

                <Avatar src="/uploads/avatar/face-13.jpg" micro={true} />

                <Avatar src="/uploads/avatar/face-13.jpg" micro={true} />

                <Avatar src="/uploads/avatar/face-13.jpg" micro={true} />

                <Avatar src="/uploads/avatar/face-13.jpg" micro={true} />

              <Spacer />

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.likes.isFetching,
    likes: state.likes.items,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchLikesForVideo }
)(Likes))
