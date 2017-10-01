/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPost } from '../../actions'
import { FORUM, THREADS } from '../../routes'
import PostTpl from './PostTpl'
import Spacer from '../Shared/Spacer'
import Breadcrumbs from '../Shared/Breadcrumbs'
import ScrollToTop from '../Shared/ScrollToTop'
import Loader from '../Shared/Loader'


class SinglePost extends React.Component {
  componentDidMount() {
    const { postid, fetchPost } = this.props
    fetchPost(postid)
  }
  render() {
    const { post = {}, isFetching, history, location } = this.props
    return (
      <div style={{position: 'relative'}}>
        <ScrollToTop />
        <Breadcrumbs
            levels={[
              {label: "Forum", url: FORUM},
              {label: post.threadid, url: `${FORUM}${THREADS}/${post.threadid}`},
              {label: post.title, url: location.pathname},
            ]}
            history={history}
        />
        <Loader isLoading={isFetching} />
        <PostTpl {...post} />
        <Spacer />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.posts.isFetching,
  postid: ownProps.match.params.postid,
  post: state.posts[ownProps.match.params.postid],
})

export default withRouter(connect(
  mapStateToProps,
  { fetchPost }
)(SinglePost))
