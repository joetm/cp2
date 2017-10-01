/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { closeSearchSidebar } from '../../actions'
// --
import Spacer from '../Shared/Spacer'
import SearchSidebar from '../Sidebar/SearchSidebar'
import ForumHome from './ForumHome'
import Category from './Category'
import Posts from './Posts'
import Threads from './Threads'
import SinglePost from './SinglePost'
import SingleThread from './SingleThread'
import * as routes from '../../routes'


const Forum = (props) => {
  const { url, sidebarSearchOpen } = props
  return (
    <div>
      <Switch>
        <Route exact path={`${url}${routes.POSTS}`} component={Posts} />
        <Route exact path={`${url}${routes.THREADS}`} component={Threads} />
        <Route exact path={`${url}${routes.POSTS}/:postid`} component={SinglePost} />
        <Route exact path={`${url}${routes.THREADS}/:threadid`} component={SingleThread} />
        <Route exact path={`${url}${routes.CATEGORIES}`} component={Category} />
        <Route exact path={`${url}${routes.CATEGORIES}/:categoryid`} component={Category} />
        <Route component={ForumHome} />
      </Switch>
      <SearchSidebar
        closeSidebar={props.closeSearchSidebar}
        open={sidebarSearchOpen}
      />
      <Spacer />
    </div>
  )
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
