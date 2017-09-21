 /**  @flow */

import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import { NavLink } from 'react-router-dom'


const MenuEntry = (props) => (
    <NavLink to={props.route} tabIndex={props.tabindexCounter}>
        <MenuItem
            onTouchTap={props.onTouchTap}
            primaryText={props.text}
            leftIcon={props.icon}
        />
    </NavLink>
)

export default MenuEntry
