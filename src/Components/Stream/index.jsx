/** @flow */

import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Updates from './Updates'
import Likes from './Likes'
import Notifications from './Notifications'


class Feed extends React.PureComponent {
    render () {
          return (
              <Switch>
                <Route path={this.props.match.url + '/notifications'} component={Notifications} />
                <Route path={this.props.match.url + '/updates'} component={Updates} />
                <Route path={this.props.match.url + '/likes'} component={Likes} />
                <Route component={Updates} />
              </Switch>
          )
    }
}

export default Feed
