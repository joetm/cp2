/** @flow */

import React from 'react'
import { Route, Switch } from 'react-router-dom'

// the default
// import Activities from './Activities'
// other 'filters'
import Stream from './Stream'
import Likes from './Likes'
import Videos from './Videos'
import Pictures from './Pictures'
import Favorites from './Favorites'
import SubToolbar from './SubToolbar'
import routes from '../../routes'


class Feed extends React.PureComponent {
    ROUTES = {
        all: this.props.match.url,
        updates: `${this.props.match.url}${routes.UPDATES}`,
        pictures: `${this.props.match.url}${routes.IMAGES}`,
        videos: `${this.props.match.url}${routes.VIDEOS}`,
        favorites: `${this.props.match.url}${routes.FAVORITES}`,
        likes: `${this.props.match.url}${routes.LIKES}`,
    }
    /**
     * Render the component.
     */
    render () {
        return (
            <div>
                <SubToolbar routes={this.ROUTES} />
                    <Switch>
                        <Route path={this.ROUTES.pictures} component={Pictures} />
                        <Route path={this.ROUTES.videos} component={Videos} />
                        <Route path={this.ROUTES.favorites} component={Favorites} />
                        <Route path={this.ROUTES.likes} component={Likes} />
                        <Route component={Stream} />
                    </Switch>
            </div>
        )
    }
}

export default Feed
