/** @flow */

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import {colors} from '../../../shared/theme'


const followButtonStyle = {
    position: 'relative',
    right: '20px',
    margin: '44px 0',
    backgroundColor: colors.palette.primary1Color,
    zIndex:999,
}


const FollowButton = (props) => (
    <RaisedButton
        label={props.label}
        primary={true}
        style={followButtonStyle}
    />
)

export default FollowButton
