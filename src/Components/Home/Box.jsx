 /**  @flow */

import React from 'react'
import Paper from 'material-ui/Paper'
import Notification from '../Content/Notification'
import { List } from 'material-ui/List'

import Loader from '../Shared/Loader'


export const boxStyle = {
    display: 'block',
}


const Box = (props) => {
    const { updates } = props
    return (
        <Paper style={boxStyle} zDepth={1}>
            <Loader isLoading={!updates.length} />
            <List>
                {
                  updates.map((item) => (
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
}

export default Box
