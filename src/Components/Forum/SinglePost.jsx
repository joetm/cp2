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


class SinglePost extends React.Component {
  componentDidMount() {
    const { postid, fetchPost } = this.props
    fetchPost(postid)
  }
  render() {
    const { post, history, location } = this.props
    return (
      <div style={{position: 'relative'}}>
        <ScrollToTop />
        <Breadcrumbs
            level0={{label: "Forum", url: FORUM}}
            level1={{label: post.threadid, url: `${FORUM}${THREADS}/${post.threadid}`}}
            level2={{label: post.title, url: location.pathname}}
            history={history}
        />
        <PostTpl {...post} />
        <Spacer />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.post.isFetching,
  postid: ownProps.match.params.postid,
  post: state.posts[ownProps.match.params.postid],
})

export default withRouter(connect(
  mapStateToProps,
  { fetchPost }
)(SinglePost))
