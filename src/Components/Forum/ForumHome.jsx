/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchPosts } from '../../reducers'
import Posts from './Posts'


class ForumHome extends React.Component {
    componentDidMount() {
        this.props.fetchPosts()
    }
    // componentDidUpdate(prevProps) {
    //     this.props.fetchPosts()
    // }
    render() {
        const { posts } = this.props
        return (
            <div>
                <h2>Forum</h2>
                <div>
                    {posts && posts.length > 0 &&
                        <Posts {...{posts}} />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.streamitems,
})

export default connect(
    mapStateToProps,
    { fetchPosts }
)(ForumHome)
