/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import MobileDetect from 'mobile-detect'

import { setDeviceDetails } from '../../actions'


class DeviceDetails extends React.Component {
  /**
   * Record the viewing device details.
   */
  componentDidMount() {
    const { saveDetails } = this.props
    // store the mobile device info
    const device = new MobileDetect(window.navigator.userAgent)
    saveDetails({
      isMobile: device.phone(),
      isTablet: device.tablet(),
      useragent: window.navigator.userAgent,
      OS: device.os(),
      isIPhone: device.is('iPhone'),
      isBot: device.is('bot'),
      isPlaystation: device.match('playstation'),
      isXbox: device.match('xbox'),
    })
  }
  /**
   * Render the component.
   */
  render() {
    return null
  }
}

export default connect(
  null,
  { saveDetails: setDeviceDetails }
)(DeviceDetails)
