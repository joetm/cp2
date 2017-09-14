/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPost, recordLike, recordDislike } from '../../actions'
import PostTpl from './PostTpl'
import Spacer from '../Shared/Spacer'
import Breadcrumbs from '../Shared/Breadcrumbs'
import routes from '../../routes'


class SinglePost extends React.Component {
    componentDidMount() {
        this.props.fetchPost(this.props.postid)
    }
    render() {
        const { post } = this.props
        console.log(this.props)
        return (
            <div>
                <Breadcrumbs
                    level0={{label: "Forum", url: routes.FORUM}}
                    level1={{label: "Thread Title", url: `${routes.FORUM}${routes.THREADS}/${post.threadid}`}}
                    level2={{label: post.title, url: this.props.location.pathname}}
                    history={this.props.history}
                />
                <PostTpl
                    {...post}
                    like={recordLike}
                    dislike={recordDislike}
                />
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
    { fetchPost, recordLike, recordDislike }
)(SinglePost))
