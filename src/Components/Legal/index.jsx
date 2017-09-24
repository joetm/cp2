/** @flow */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Paper from 'material-ui/Paper'

import { LEGAL } from '../../routes'
// import Spacer from '../Shared/Spacer'
// import Footer from '../Footer'
import Guidelines from './Guidelines'
import Privacy from './Privacy'
import DMCA from './DMCA'
import Spacer from '../Shared/Spacer'
import { pageContainer } from './styles'
import Footer from '../Footer'


const LegalPage = () => (
  <div>
    <Paper style={pageContainer}>
      <Switch>
        <Route exact path={`${LEGAL.INDEX}${LEGAL.COMMUNITY}`} component={Guidelines} />
        <Route exact path={`${LEGAL.INDEX}${LEGAL.PRIVACY}`} component={Privacy} />
        <Route exact path={`${LEGAL.INDEX}${LEGAL.DMCA}`} component={DMCA} />
        <Route component={Guidelines} />
      </Switch>
    </Paper>
    <Spacer />
    <Footer />
  </div>
)

export default LegalPage
