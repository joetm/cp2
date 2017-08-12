/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { getPosts } from '../../reducers'
import Posts from './Posts'


class ForumHome extends React.Component {
    componentDidMount() {
        this.props.getPosts()
    }
    // componentDidUpdate() {
    //     this.props.getPosts()
    // }
    render({ posts }) {
        return (
            <div>
                <h2>Forum</h2>
                <div>
                    {posts && posts.length > 0 &&
                        <Posts posts={posts} />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.app.posts,
})

export default connect(
    mapStateToProps,
    { getPosts }
)(ForumHome)
