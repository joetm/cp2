/** @flow */

import React from 'react'
import { connect } from 'react-redux'

import { fetchCurrentUser } from '../../actions'


class LoadCurrentUser extends React.Component {
    /**
     * Load the current user.
     */
    componentDidMount() {
        this.props.fetchCurrentUser()
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
    { fetchCurrentUser }
)(LoadCurrentUser)
