/** @flow */

import React from 'react'
import {withRouter} from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'


const RouterMenuItem = withRouter(props => {
    const {primaryText, icon} = props
    return (
        <MenuItem
            primaryText={primaryText}
            leftIcon={icon}
            onClick={() => {
            	props.history.push(props.url)
            }}
        />
    )
})

// fix to close the open menu on click
// see https://github.com/callemall/material-ui/issues/6105
RouterMenuItem.muiName = 'MenuItem';

export default RouterMenuItem
