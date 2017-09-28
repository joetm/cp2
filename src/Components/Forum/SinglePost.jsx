/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPost, recordLike, recordDislike } from '../../actions'
import routes from '../../routes'
import PostTpl from './PostTpl'
import Spacer from '../Shared/Spacer'
import Breadcrumbs from '../Shared/Breadcrumbs'
import ScrollToTop from '../Shared/ScrollToTop'


class SinglePost extends React.Component {
    componentDidMount() {
        this.props.fetchPost(this.props.postid)
    }
    render() {
        const { post } = this.props
        return (
            <div style={{position: 'relative'}}>

                <ScrollToTop />

                <Breadcrumbs
                    level0={{label: "Forum", url: routes.FORUM}}
                    level1={{label: post.threadid, url: `${routes.FORUM}${routes.THREADS}/${post.threadid}`}}
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
    postid: ownProps.match.params.postid,
    post: state.post[ownProps.match.params.postid],
})

export default withRouter(connect(
    mapStateToProps,
    { fetchPost, recordLike, recordDislike }
)(SinglePost))
