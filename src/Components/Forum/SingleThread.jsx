/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchThread, fetchPostsForThread, recordLike, recordDislike } from '../../actions'
import Spacer from '../Shared/Spacer'
import Posts from './Posts'
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
        const { title, isFetching, history, items = [] } = this.props
        return (
            <div>
                <ScrollToTop />

                <BackButton />

                <Loader isLoading={isFetching} />

                <PostTpl
                    {...this.props.thread}
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
    thread: state.thread,
    threadid: ownProps.match.params.threadid,
    items: state.thread.items,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchThread, fetchPostsForThread, recordLike, recordDislike }
)(SingleThread))
