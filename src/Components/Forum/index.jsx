/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { closeSearchSidebar } from '../../actions'
// --
import Spacer from '../Shared/Spacer'
import SearchSidebar from '../SearchSidebar'
import ForumHome from './ForumHome'
import Category from './Category'
import SinglePost from './SinglePost'
import SingleThread from './SingleThread'


class Forum extends React.PureComponent {
    render() {
        const { url, sidebarSearchOpen, closeSearchSidebar } = this.props
        return (
            <div>
                <Switch>
                    <Route path={`${url}/post/:postid`} component={SinglePost} />
                    <Route path={`${url}/thread/:threadid`} component={SingleThread} />
                    <Route path={`${url}/category/:category`} component={Category} />
                    <Route component={ForumHome} />
                </Switch>
                <SearchSidebar
                    closeSidebar={closeSearchSidebar}
                    open={sidebarSearchOpen}
                />
                <Spacer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    // add selected fields from the state as props to the component
    sidebarSearchOpen: state.appState.sidebarSearchOpen,
    // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
    url: ownProps.match.url,
})

export default connect(
    mapStateToProps,
    { closeSearchSidebar }
)(Forum)
