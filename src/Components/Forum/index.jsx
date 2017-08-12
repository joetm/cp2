/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import store from '../../store'
import { toggleSidebar } from '../../reducers'
// --
import Spacer from '../Shared/Spacer'
import Sidebar from './Sidebar'
import ForumHome from './ForumHome'
import SinglePost from './SinglePost'


const Forum = (props) => {
    return (
        <div>
            <button onClick={props.toggleSidebar}>Toggle Sidebar</button>
            <Switch>
                <Route path={`/forum/post/:postid`} component={SinglePost} />
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

export default connect(
    mapStateToProps,
    { toggleSidebar }
)(Forum)
