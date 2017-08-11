/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import store from '../../store'
import { toggleSidebar } from '../../reducers'
// --
import Posts from './Posts'
import Spacer from '../Shared/Spacer'
import Sidebar from './Sidebar'


const ForumHome = (props) => (
    <div>
        <h2>Forum</h2>
        <button onClick={props.toggleSidebar}>Toggle Sidebar</button>
        <div>
            {props.posts.length > 0 &&
              <div>
                <Posts posts={props.posts} />
              </div>
            }
        </div>
        <Sidebar
            toggleSidebar={props.toggleSidebar}
            sidebarOpen={props.sidebarOpen}
        />
        <Spacer />
    </div>
)


const mapStateToProps = (state) => ({
    // add selected fields from the state as props to the component
    sidebarOpen: state.app.sidebarOpen,
    posts: state.app.posts,
})

export default connect(
    mapStateToProps,
    { toggleSidebar }
)(ForumHome)
