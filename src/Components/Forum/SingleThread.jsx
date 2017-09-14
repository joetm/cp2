/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import BackIcon from 'material-ui/svg-icons/content/undo'

import { fetchThread, fetchPostsForThread, recordLike, recordDislike } from '../../actions'
import Spacer from '../Shared/Spacer'
import Posts from './Posts'
import Loader from '../Shared/Loader'
import PostTpl from './PostTpl'


const styles = {
    backButton: {
        position: 'relative',
        top: '20px',
        left: '20px',
    },
}


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

                <FloatingActionButton
                    mini={true}
                    secondary={true}
                    style={styles.backButton}
                    onTouchTap={history.goBack}
                >
                    <BackIcon />
                </FloatingActionButton>

                <Loader isLoading={isFetching} />

                <PostTpl
                    {...this.props.thread}
                    like={recordLike}
                    dislike={recordDislike}
                />

                <div>
                    {
                        items.map(item =>
                            <PostTpl
                                key={item.id}
                                {...item}
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
