 /**  @flow */

import React from 'react'
import Paper from 'material-ui/Paper'
import Notification from '../Content/Notification'
import { List } from 'material-ui/List'


export const boxStyle = {
    display: 'block',
}

const Box = (props) => (
    <Paper style={boxStyle} zDepth={1}>
        <List>
            {
              props.updates.map((item) => (
                <Notification
                    key={item.id}
                    {...item}
                    secondaryTextLines={2}
                />
              ))
            }
        </List>
    </Paper>
)

export default Box
