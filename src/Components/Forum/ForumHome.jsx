/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchThreads } from '../../actions'
import Posts from './Posts'


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
                    {threads && threads.length > 0 ?
                        <Posts posts={threads} />
                        :
                        <div>No posts found.</div>
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
