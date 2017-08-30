/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Subheader from 'material-ui/Subheader'

import { fetchThread } from '../../actions'
import Posts from './Posts'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import BackIcon from 'material-ui/svg-icons/content/undo';


const styles = {
    backButton: {
        position: 'relative',
        top: '20px',
        left: '20px',
    },
}

class SingleThread extends React.Component {
    componentDidMount() {
        this.props.fetchThread("cj6dn68b7000i335mgh0lj8rb")
    }
    render() {
        const { posts, timestamp, username, userid, title } = this.props.thread
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
                    {posts &&
                        <Posts posts={posts} />
                    }
                </div>
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
