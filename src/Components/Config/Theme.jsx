/** @flow */

import React from 'react'
// import { connect } from 'react-redux'

// import { getTheme } from '../../actions'


class Theme extends React.Component {
    componentDidMount() {
    }
    /**
     * Render the component.
     */
    render() {
        return this.props.children
    }
}

// export default connect(
//     null,
//     { getTheme }
// )(Theme)

export default Theme
