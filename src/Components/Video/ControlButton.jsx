/** @flow */

import React from 'react'
import IconButton from 'material-ui/IconButton'
import { colors } from '../../common/theme'


const iconColor = colors.black

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
              color={iconColor}
              hoverColor={colors.palette.primary1Color}
              onTouchTap={props.action}
              style={controlButtonStyle}
            />
        </IconButton>
    )
}

export default ControlButton
