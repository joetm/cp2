/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchThread, fetchPostsForThread, recordLike, recordDislike } from '../../actions'
import Spacer from '../Shared/Spacer'
import Loader from '../Shared/Loader'
import PostTpl from './PostTpl'
import ScrollToTop from '../Shared/ScrollToTop'
import BackButton from '../Shared/Buttons/BackButton'


class SingleThread extends React.Component {
    componentDidMount() {
        const threadid = this.props.threadid
        this.props.fetchThread(threadid)
        this.props.fetchPostsForThread(threadid)
    }
    render() {
        const { thread, title, isFetching, history } = this.props
        const { items = [] } = thread
        return (
            <div style={{position: 'relative'}}>

                <ScrollToTop />

                <BackButton />

                <Loader isLoading={isFetching} />

                {/* first post */}
                <PostTpl
                    {...thread}
                    macro={true}
                    like={recordLike}
                    dislike={recordDislike}
                />

                <div>
                    {
                        items.map(item =>
                            <PostTpl
                                key={item.id}
                                {...item}
                                macro={true}
                                isEmbedded={true}
                                like={recordLike}
                                dislike={recordDislike}
                            />
                        )
                    }
                </div>

                <Spacer />

            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    isFetching: state.thread.isFetching,
    thread: state.threads[ownProps.match.params.threadid],
    threadid: ownProps.match.params.threadid,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchThread, fetchPostsForThread, recordLike, recordDislike }
)(SingleThread))
