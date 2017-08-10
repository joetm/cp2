/** @flow */

import React from 'react'
import { Provider, connect } from 'react-redux'

import store from '../../store'
import { toggleSidebar } from '../../reducers'
// --
import Posts from './Posts'
import Spacer from '../Shared/Spacer'
import Sidebar from './Sidebar'


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


class ForumHome extends React.Component {
    constructor(props) {
        super(props)
        // bindings
        this.toggleSidebar = this.toggleSidebar.bind(this)
    }
    /**
     * Toggle the sidebar.
     */
    toggleSidebar() {
        console.log('dispatch action:', toggleSidebar())
        // console.log('before', store.getState())
        store.dispatch(toggleSidebar())
        // console.log('after', store.getState())
    }
    /**
     * Render the component.
     */
    render() {
        return (
            <Provider store={store}>
                <div>
                    <h2>Forum</h2>
                    <button onClick={this.toggleSidebar}>Toggle Sidebar</button>
                    <div>
                        {posts.length > 0 &&
                          <div>
                            <Posts posts={posts} />
                          </div>
                        }
                    </div>
                    <Sidebar
                        toggleSidebar={this.toggleSidebar}
                        sidebarOpen={store.getState().app.sidebarOpen}
                    />
                    <Spacer />
                </div>
            </Provider>
        )
    }
}

function mapStateToProps(state) {
    return { app: state.app }
}

export default connect(mapStateToProps)(ForumHome)
