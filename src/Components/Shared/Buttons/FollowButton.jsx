/** @flow */

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import { palette } from '../../../common/colors'


const followButtonStyle = {
    zIndex: 999,
}


const FollowButton = props => {
    const buttonStyle = {...followButtonStyle, ...props.style}
    return (
        <RaisedButton
            label={props.label}
            primary={true}
            style={buttonStyle}
        />
    )
}

export default FollowButton
