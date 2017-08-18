/** @flow */

import React from 'react'
import { Route, Switch } from 'react-router-dom'

// the default
// import Activities from './Activities'
// other 'filters'
import Stream from './Stream'
import Likes from './Likes'
import Notifications from './Notifications'
import SubToolbar from './SubToolbar'


class Feed extends React.PureComponent {
    ROUTES = {
        all: this.props.match.url,
        updates: `${this.props.match.url}/updates`,
        pictures: `${this.props.match.url}/pictures`,
        videos: `${this.props.match.url}/videos`,
        notifications: `${this.props.match.url}/notifications`,
        likes: `${this.props.match.url}/likes`,
    }
    /**
     * Render the component.
     */
    render () {
        return (
            <div>
                <SubToolbar routes={this.ROUTES} />
                <Switch>
                    <Route path={this.ROUTES.pictures} component={Stream} />
                    <Route path={this.ROUTES.videos} component={Stream} />
                    <Route path={this.ROUTES.notifications} component={Notifications} />
                    <Route path={this.ROUTES.likes} component={Likes} />
                    <Route component={Stream} />
                </Switch>
            </div>
        )
    }
}

export default Feed
