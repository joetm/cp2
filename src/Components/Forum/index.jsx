/** @flow */

import React from 'react'
import { Provider, connect } from 'react-redux'

import Posts from './Posts'
import Spacer from '../Shared/Spacer'


// TODO
// import configureStore from './configureStore'
// const store = configureStore()
// import {
//   selectSubreddit,
//   fetchPostsIfNeeded,
//   invalidateSubreddit
// } from './actions'


// DEV
const posts = [
    {
        id: 1,
        title: "Cars & Dinos",
        content: "Dinosaurs are like cars.",
        username: "Joe",
        tags: ["cars", "thread-123"],
        timestamp: 1501135362,
    },
    {
        id: 2,
        title: "Dinos & Cars",
        content: "Cars are like dinosaurs.",
        username: "Moe",
        tags: ["dinosaurs", "thread-123"],
        timestamp: 1501185342,
    },
    {
        id: 3,
        title: "Testing the Forums",
        content: "Forums are like dinosaurs.",
        username: "Toe",
        tags: ["forums", "dinosaurs", "thread-124"],
        timestamp: 1501188342,
    },
    {
        id: 4,
        title: "Testing the Dinos",
        content: "Dinos are like forums.",
        username: "Hogo",
        tags: ["forums", "dinosaurs", "thread-124"],
        timestamp: 1501198342,
    },
]


// function mapStateToProps(state) {
//   const { selectedSubreddit, postsBySubreddit } = state
//   const {
//     isFetching,
//     lastUpdated,
//     items: posts
//   } = postsBySubreddit[selectedSubreddit] || {
//     isFetching: true,
//     items: []
//   }
//   return {
//     selectedSubreddit,
//     posts,
//     isFetching,
//     lastUpdated
//   }
// }


class ForumHome extends React.Component {
    // constructor(props) {
       //  super(props)
       //  this.handleChange = this.handleChange.bind(this)
       //  this.handleRefreshClick = this.handleRefreshClick.bind(this)
    // }
    // componentDidMount() {
       //  const { dispatch, selectedSubreddit } = this.props
    //  dispatch(fetchPostsIfNeeded(selectedSubreddit))
    // }
    // componentDidUpdate(prevProps) {
       //  if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
       //    const { dispatch, selectedSubreddit } = this.props
       //    dispatch(fetchPostsIfNeeded(selectedSubreddit))
       //  }
    // }
    // handleChange(nextSubreddit) {
       //  this.props.dispatch(selectSubreddit(nextSubreddit))
    //  this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
    // }
    // handleRefreshClick(e) {
       //  e.preventDefault()
       //  const { dispatch, selectedSubreddit } = this.props
       //  dispatch(invalidateSubreddit(selectedSubreddit))
       //  dispatch(fetchPostsIfNeeded(selectedSubreddit))
    // }

//          <Provider store={store}>
//          </Provider>

    render() {
        // const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
        // const { isFetching } = this.props
        //                  {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        //                  {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        // style={{ opacity: isFetching ? 0.5 : 1 }}>
        return (
            <div>
                <h2>Forum</h2>
                <div>
                    {posts.length > 0 &&
                      <div>
                        <Posts posts={posts} />
                      </div>
                    }
                </div>
                <Spacer />
            </div>
        )
    }
}

// export default connect(mapStateToProps)(ForumHome)
export default ForumHome
