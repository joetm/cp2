 /**  @flow */

import React from 'react'
import Paper from 'material-ui/Paper'
import Notification from '../Content/Notification'
import { List } from 'material-ui/List'

import Loader from '../Shared/Loader'
import BoxHeader from '../Shared/BoxHeader'


export const boxStyle = {
    display: 'block',
    marginBottom: '2em',
}


const Box = (props) => {
    const { updates, headline } = props
    return (
        <Paper style={boxStyle} zDepth={1}>
            <Loader isLoading={!updates.length} />
            <BoxHeader
                headline={headline}
                icon={null}
            />
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
