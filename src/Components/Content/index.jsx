/** @flow */

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import * as routes from '../../routes'
// --
import Updates from './Updates'
import Videos from './Videos'
import Pictures from './Pictures'
import Likes from './Likes'
import Favorites from './Favorites'
// --
import Spacer from '../Shared/Spacer'


const Feed = (props) => {
  // console.log(this.props.match.url)
  const url = props.match.url // /stream
  return (
    <div>
      <Switch>
        <Route path={`${url}/:userid${routes.UPDATES}`} component={Updates} />
        <Route path={`${url}/:userid${routes.PICTURES}`} component={Pictures} />
        <Route path={`${url}/:userid${routes.VIDEOS}`} component={Videos} />
        <Route path={`${url}/:userid${routes.FAVORITES}`} component={Favorites} />
        <Route path={`${url}/:userid${routes.LIKES}`} component={Likes} />
        <Route component={Favorites} />
      </Switch>
      <Spacer />
    </div>
  )
}

export default Feed
