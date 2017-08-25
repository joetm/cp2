/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchThreads } from '../../actions'
import Posts from './Posts'
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
        console.log('threads', threads)
        return (
            <div>
                <h2>Forum</h2>
                <div>
                    <Posts posts={threads} />
                    {
                        threads && threads.length > 0 &&
                        <Loader />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    threads: state.threads,
})

export default connect(
    mapStateToProps,
    { fetchThreads }
)(ForumHome)
