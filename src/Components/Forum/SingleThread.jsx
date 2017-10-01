/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchThread, fetchPostsForThread } from '../../actions'
import Spacer from '../Shared/Spacer'
import Loader from '../Shared/Loader'
import PostTpl from './PostTpl'
import ScrollToTop from '../Shared/ScrollToTop'
import BackButton from '../Shared/Buttons/BackButton'


class SingleThread extends React.Component {
  componentDidMount() {
    const { threadid } = this.props
    this.props.fetchThread(threadid)
    this.props.fetchPostsForThread(threadid)
  }
  /*
   * Render the component.
   */
  render() {
    const { thread = {}, isFetching } = this.props
    const { title, items = [] } = thread
    return (
      <div style={{position: 'relative'}}>
        <ScrollToTop />

        <BackButton />

        <Loader isLoading={isFetching} />

        {/* first post */}
        <PostTpl {...thread} macro={true} />

        <div>
          {
            items.map(item => (
              <PostTpl
                key={item.id}
                {...item}
                macro={true}
                isEmbedded={true}
              />
            ))
          }
        </div>

        <Spacer />

      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  isFetching: state.threads.isFetching,
  threadid: ownProps.match.params.threadid,
  thread: state.threads[ownProps.match.params.threadid],
})

export default withRouter(connect(
  mapStateToProps,
  { fetchThread, fetchPostsForThread }
)(SingleThread))
