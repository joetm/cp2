/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchThread } from '../../actions'
import Spacer from '../Shared/Spacer'
import Posts from './Posts'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import BackIcon from 'material-ui/svg-icons/content/undo'


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
        const { title, posts, user } = this.props.thread
        return (
            <div>

                <FloatingActionButton
                    mini={true}
                    secondary={true}
                    style={styles.backButton}
                    onTouchTap={() => this.props.history.goBack}
                >
                    <BackIcon />
                </FloatingActionButton>

                <h2>{title}</h2>

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
    thread: state.thread,
})

export default withRouter(connect(
    mapStateToProps,
    { fetchThread }
)(SingleThread))
