/** @flow */

import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

// the default
import Activities from './Activities'
// other 'filters'
import Updates from './Updates'
import Likes from './Likes'
import Notifications from './Notifications'



class Feed extends React.PureComponent {
    ROUTES = {
        all: this.props.match.url,
        notifications: this.props.match.url + '/notifications',
        updates: this.props.match.url + '/updates',
        likes: this.props.match.url + '/likes',
    }
    render () {
          return (
            <div>
              <div style={{textAlign:'center'}}>
                <Link to={this.ROUTES.all}>All</Link>&nbsp;-&nbsp;
                <Link to={this.ROUTES.notifications}>Notifications</Link>&nbsp;-&nbsp;
                <Link to={this.ROUTES.updates}>Updates</Link>&nbsp;-&nbsp;
                <Link to={this.ROUTES.likes}>Likes</Link>
              </div>
              <Switch>
                <Route path={this.ROUTES.notifications} component={Notifications} />
                <Route path={this.ROUTES.updates} component={Updates} />
                <Route path={this.ROUTES.likes} component={Likes} />
                <Route component={Activities} />
              </Switch>
            </div>
          )
    }
}

export default Feed
