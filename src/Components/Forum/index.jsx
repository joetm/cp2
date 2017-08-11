/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import store from '../../store'
import { toggleSidebar } from '../../reducers'
// --
import Posts from './Posts'
import Spacer from '../Shared/Spacer'
import Sidebar from './Sidebar'


class ForumHome extends React.Component {
    /**
     * Toggle the sidebar.
     */
    toggleSidebar() {
        // console.log('dispatch action:', toggleSidebar())
        // console.log('before', store.getState())

        // console.log('after', store.getState())
    }
    /**
     * Render the component.
     */
    render() {
        return (
            <div>
                <h2>Forum</h2>
                <button onClick={this.props.toggleSidebar}>Toggle Sidebar</button>
                <div>
                    {this.props.app.posts.length > 0 &&
                      <div>
                        <Posts posts={this.props.app.posts} />
                      </div>
                    }
                </div>
                <Sidebar
                    toggleSidebar={this.props.toggleSidebar}
                    sidebarOpen={this.props.app.sidebarOpen}
                />
                <Spacer />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    // TODO - do not use the whole state
    app: state.app
})

export default connect(
    mapStateToProps,
    { toggleSidebar }
)(ForumHome)
