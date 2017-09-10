/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchThreads } from '../../actions'
import PostsWrapper from './PostsWrapper'
import Loader from '../Shared/Loader'


class ForumHome extends React.Component {
    componentDidMount() {
        this.props.fetchThreads()
    }
    // componentDidUpdate(prevProps) {
    //     this.props.fetchThreads()
    // }
    render() {
        const { threads } = this.props
        return (
            <div>
                <h2>Forum</h2>
                <div>
                    <PostsWrapper posts={threads} />
                    {
                        !threads.length > 0 &&
                        <Loader />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.threads.isFetching,
    threads: state.threads.items,
})

export default connect(
    mapStateToProps,
    { fetchThreads }
)(ForumHome)
