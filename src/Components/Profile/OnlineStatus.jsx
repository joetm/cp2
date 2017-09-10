/** @flow */

import React from 'react'
import Chip from 'material-ui/Chip'


const indicatorStyle = {
    position: 'absolute',
    top: 10,
    left: 0,
    margin: 0,
}


const OnlineStatus = (props) => {
    const { isOnline, applyOffset } = props
    if (!isOnline) {
        return null
    }
    return (
        <Chip style={applyOffset ? indicatorStyle : null}>
            ONLINE
        </Chip>
    )
}

export default OnlineStatus
