/** @flow */

import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

import { scrollToTop } from '../../common/helpers'


const styles = {
  scrollButtonDefault: {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    opacity: 0.5,
    zIndex: 999,
  }
}


class Scrollbutton extends React.Component {
  state = {
    isScrolled: false,
  }
  getScrollPosition() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
  }
  windowIsScrolled = () => this.getScrollPosition() > 0
  componentWillMount() {
    // show scroll button (overlay)
    window.onscroll = () => {
      this.setState({isScrolled: this.windowIsScrolled()})
    }
  }
  componentWillUnmount() {
    window.onscroll = null
  }
  /**
   * The default action for the button -> scroll to the top.
   */
  defaultAction = () => {
    if (this.props.clickable === false) { return }
    scrollToTop(400)
  }
  /**
   * Render the component.
   */
  render() {
    if (!this.state.isScrolled) {
      return null
    }
    return (
      <FloatingActionButton
        secondary={this.props.secondary || false}
        style={this.props.style || styles.scrollButtonDefault}
        onTouchTap={this.props.onTouchTap || this.defaultAction}
      >
        {this.props.icon || <UpIcon />}
      </FloatingActionButton>
    )
  }
}

export default Scrollbutton
