/** @flow */

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { LEGAL } from '../../routes'
// import Spacer from '../Shared/Spacer'
// import Footer from '../Footer'
import Guidelines from './Guidelines'
import Privacy from './Privacy'
import DMCA from './DMCA'


const LegalPage = () => (
  <Switch>
        <Route exact path={`${LEGAL.INDEX}${LEGAL.COMMUNITY}`} component={Guidelines} />
        <Route exact path={`${LEGAL.INDEX}${LEGAL.PRIVACY}`} component={Privacy} />
        <Route exact path={`${LEGAL.INDEX}${LEGAL.DMCA}`} component={DMCA} />
        <Route component={Guidelines} />
  </Switch>
)

export default LegalPage
