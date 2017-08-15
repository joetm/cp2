/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { toggleSidebar, fetchPosts } from '../../reducers'
// --
import Spacer from '../Shared/Spacer'
import Sidebar from './Sidebar'
import ForumHome from './ForumHome'
import Category from './Category'
import SinglePost from './SinglePost'
import SingleThread from './SingleThread'


class Forum extends React.Component {
    render() {
        const { url } = this.props
        return (
            <div>
                <Switch>
                    <Route path={`${url}/post/:postid`} component={SinglePost} />
                    <Route path={`${url}/thread/:threadid`} component={SingleThread} />
                    <Route path={`${url}/category/:category`} component={Category} />
                    <Route component={ForumHome} />
                </Switch>
                <Sidebar
                    toggleSidebar={this.props.toggleSidebar}
                    sidebarOpen={this.props.sidebarOpen}
                />
                <Spacer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    // add selected fields from the state as props to the component
    sidebarOpen: state.appState.sidebarOpen,
    posts: state.posts,
    // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
    url: ownProps.match.url,
})

export default connect(
    mapStateToProps,
    { fetchPosts, toggleSidebar }
)(Forum)
