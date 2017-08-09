/** @flow */

import React from 'react'
import {Route, Switch} from 'react-router-dom'

// the default
import Activities from './Activities'
// other 'filters'
import Updates from './Updates'
import Likes from './Likes'
import Notifications from './Notifications'
import Tabs from './Tabs'


class Feed extends React.PureComponent {
    ROUTES = {
        all: this.props.match.url,
        notifications: `${this.props.match.url}/notifications`,
        updates: `${this.props.match.url}/updates`,
        likes: `${this.props.match.url}/likes`,
    }
    /**
     * Render the component.
     */
    render () {
          return (
            <div>

              <div>
                  <Tabs routes={this.ROUTES} />
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
