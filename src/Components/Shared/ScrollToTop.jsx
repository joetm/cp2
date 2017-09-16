/** @flow */

import React from 'react'
import { withRouter } from 'react-router-dom'


class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }
  render() {
    // allow this component to be used with children or without:
    return this.props.children || null
  }
}

export default withRouter(ScrollToTop)
