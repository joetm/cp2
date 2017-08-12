/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import { toggleSidebar } from '../../reducers'
// --
import Spacer from '../Shared/Spacer'
import Sidebar from './Sidebar'
import ForumHome from './ForumHome'
import Category from './Category'
import SinglePost from './SinglePost'
import SingleThread from './SingleThread'


const Forum = (props) => {
    return (
        <div>
            <Switch>
                <Route path={`${props.match.url}/post/:postid`} component={SinglePost} />
                <Route path={`${props.match.url}/thread/:threadid`} component={SingleThread} />
                <Route path={`${props.match.url}/category/:category`} component={Category} />
                <Route component={ForumHome} />
            </Switch>
            <Sidebar
                toggleSidebar={props.toggleSidebar}
                sidebarOpen={props.sidebarOpen}
            />
            <Spacer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    // add selected fields from the state as props to the component
    sidebarOpen: state.app.sidebarOpen,
    posts: state.app.posts,
})

export default withRouter(connect(
    mapStateToProps
)(Forum))
