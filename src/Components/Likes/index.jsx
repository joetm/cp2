/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'

import { fetchLikesForVideo } from '../../actions'
import Avatar from '../Shared/Avatar'
import Spacer from '../Shared/Spacer'
import Loader from '../Shared/Loader'
import Headline from '../Shared/Headline'


/**
 * Likes component
 * @class
 */
class Likes extends React.Component {
    componentWillMount() {
        this.props.fetchLikesForVideo(this.props.itemid)
    }
    render() {
        const { likes = [] } = this.props
        if (!likes.length) {
          return null
        }
        return (
            <div>

              <Spacer />
              <Spacer />

              <Headline level="4" style={{textAlign: 'left', marginBottom: '1em', paddingBottom: 0}}>Likes</Headline>

              <Loader isLoading={this.props.isFetching} />

              <Divider />

              {
                likes.map(item => (
                  <IconButton tooltip={item.user.username}>
                    <Avatar src={item.user.avatar} micro={true} />
                  </IconButton>
                ))
              }

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
