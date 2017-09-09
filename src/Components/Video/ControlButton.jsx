/** @flow */

import React from 'react'
import IconButton from 'material-ui/IconButton'
import { palette, black } from '../../common/colors'


const controlButtonStyle = {
    width: '32px',
    height: '32px',
    margin: '0 0 0 10px',
    cursor: 'pointer',
    clear: 'both',
}


const ControlButton = (props) => {
    const Icon = props.icon
    return (
        <IconButton
            tooltip={props.tooltip}
            style={props.style}
        >
            <Icon
              color={black}
              hoverColor={palette.primary1Color}
              onTouchTap={props.action}
              style={controlButtonStyle}
            />
        </IconButton>
    )
}

export default ControlButton
