/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import BackIcon from 'material-ui/svg-icons/content/undo'

import { fetchThread } from '../../actions'
import Spacer from '../Shared/Spacer'
import Posts from './Posts'
import Loader from '../Shared/Loader'


const styles = {
    backButton: {
        position: 'relative',
        top: '20px',
        left: '20px',
    },
}

class SingleThread extends React.Component {
    componentDidMount() {
        const threadid = this.props.match.params.threadid
        this.props.fetchThread(threadid)
    }
    render() {
        const { isFetching, history } = this.props
        const { title, posts } = this.props.thread
        console.log('history:', history)
        return (
            <div>

                <Loader isLoading={isFetching} />

                {
                    history.length > 0 &&
                        <FloatingActionButton
                            mini={true}
                            secondary={true}
                            style={styles.backButton}
                            onTouchTap={history.goBack}
                        >
                            <BackIcon />
                        </FloatingActionButton>
                }

                <h2>TITLE: {title}</h2>

                <div>
                    {
                        posts &&
                        <Posts posts={posts} />
                    }
                </div>

                <Spacer />

            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    isFetching: state.thread.isFetching,
    thread: state.thread.item,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchThread }
)(SingleThread))
