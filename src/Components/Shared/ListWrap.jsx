/** @flow */

import React from 'react'
import { List } from 'material-ui/List'


const ListWrap = (props) => (
  <List style={props.style}>
    {props.children}
  </List>
)

export default ListWrap
