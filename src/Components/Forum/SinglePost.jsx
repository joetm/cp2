/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPost } from '../../actions'
import PostTpl from './PostTpl'
import Spacer from '../Shared/Spacer'


class SinglePost extends React.Component {
    componentDidMount() {
        console.log('fetch postid', this.props.postid)
        this.props.fetchPost(this.props.postid)
    }
    render() {
        const { post } = this.props
        return (
            <div>
                <PostTpl {...post} />
                <Spacer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.post.isFetching,
    post: state.post.item,
    postid: ownProps.match.params.postid,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchPost }
)(SinglePost))
