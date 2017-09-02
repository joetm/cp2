/** @flow */

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import routes from '../../routes'
// --
import Updates from './Updates'
import Videos from './Videos'
import Pictures from './Pictures'
import Likes from './Likes'
import Favorites from './Favorites'
// --
import SubToolbar from './SubToolbar'
import Spacer from '../Shared/Spacer'


class Feed extends React.PureComponent {
    /**
     * Render the component.
     */
    render () {
        return (
            <div>
                <Switch>
                    <Route path={this.ROUTES.pictures} component={Pictures} />
                    <Route path={this.ROUTES.videos} component={Videos} />
                    <Route path={this.ROUTES.favorites} component={Favorites} />
                    <Route path={this.ROUTES.likes} component={Likes} />
                    <Route component={Updates} />
                </Switch>
                <Spacer />
            </div>
        )
    }
}

export default Feed
