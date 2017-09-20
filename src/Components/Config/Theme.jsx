/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { getTheme } from '../../common/theme'


class Theme extends React.Component {
    /**
     * Render the component.
     */
    render() {
        const { theme } = this.props
        console.log('Theme', theme, getTheme(theme))
        return (
          <MuiThemeProvider muiTheme={getTheme(theme)}>
              {this.props.children}
          </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.currentUser.theme,
})

export default connect(
    mapStateToProps
)(Theme)
